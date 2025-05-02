import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/apiClients";
import BackButton from "../components/BackButton";
import CommentsComponent from "../components/Comment";
import CommentReplyForm from "../components/CommentReplyForm";
import Loader from "../components/Loader";
import ThreadPreviewer from "../components/ThreadPreviewer";
import UpVoteDownVoteReplies from "../components/UpVoteDownVoteReplies";
import { useAuth } from "../context/AuthContext";

export default function ThreadDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [thread, setThread] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);

    useEffect(() => {
        fetchThreadAndComments();
    }, [id]);

    const fetchThreadAndComments = async () => {
        try {
            const [postRes, commentsRes] = await Promise.all([
                api.get(`/threads/${id}/`),
                api.get(`/threads/${id}/comments/`)
            ]);

            setThread(postRes.data);
            setComments(commentsRes.data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch thread or comments");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/threads/${id}/`);
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to delete thread", error);
        }
    };

    const handleNewTopLevelComment = (newComment) => {
        setComments((prev) => [...prev, newComment]);
    };

    const handleVote = async ({ type, id, isThread = false }) => {
        try {
            const url = isThread
                ? `/threads/${id}/${type}/`
                : `/threads/comments/${id}/${type}/`;

            const response = await api.post(url);
            console.log("Vote success", response.data);
        } catch (error) {
            console.error("Vote failed", error);
        }
        finally {
            fetchThreadAndComments();
        }
    };

    const handleGetAIOverview = async () => {
        if (!thread) return;

        setAiLoading(true);
        setAiResponse(null);

        try {
            const text = document.querySelector(".tiptap.ProseMirror")?.innerText;
            const response = await axios.post('https://ea22-34-124-233-178.ngrok-free.app/ask', {
                question: `Write a summary of the text in point format ${text}`,
                "role": "",
            });

            setAiResponse(response.data.answer);
        } catch (error) {
            console.error("Error fetching AI overview", error);
            setAiResponse("Failed to get AI overview.");
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!thread) return <p className="text-center text-gray-400">No thread found.</p>;

    return (
        <div className="flex justify-center p-4 min-h-screen bg-zinc-900 text-white">
            <div className="w-full max-w-4xl rounded-xl p-6 bg-zinc-800 shadow-lg space-y-6 mr-2">
                <div className="flex items-center justify-between">
                    <BackButton />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold">{thread.title}</h1>

                {/* Views */}
                <p className="text-gray-400 text-sm">Views: {thread.view_count}</p>
                {/* Content */}
                <div className="text-gray-300">
                    <ThreadPreviewer content={thread.content} />
                </div>

                {/* AI Overview Button */}
                <div className="my-4">
                    <button
                        onClick={handleGetAIOverview}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
                        disabled={aiLoading}
                    >
                        {aiLoading ? "Generating Overview..." : "Get AI Overview"}
                    </button>
                </div>

                {/* AI Overview Response */}
                {aiLoading && (
                    <div className="p-4 bg-purple-700/20 rounded-lg animate-pulse">
                        AI is thinking... 🧠
                    </div>
                )}

                {aiResponse && (
                    <div className="p-4 bg-purple-700/20 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">AI Overview:</h2>
                        <p className="text-gray-100">{aiResponse}</p>
                    </div>
                )}

                {/* Votes */}
                <UpVoteDownVoteReplies
                    upvotes={thread.up_vote}
                    downvotes={thread.down_vote}
                    repliesCount={thread.reply_count}
                    onUpvote={() => handleVote({ type: "upvote", id, isThread: true })}
                    onDownvote={() => handleVote({ type: "downvote", id, isThread: true })}
                    onReply={() => { }}
                    userVote={thread.user_vote}
                />

                {/* Comment Form */}
                <div className="pt-6 border-t border-zinc-700">
                    <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
                    <CommentReplyForm threadId={id} onSuccess={handleNewTopLevelComment} />
                </div>

                {/* Comments */}
                <div className="pt-6 border-t border-zinc-700 ">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {comments.length === 0 ? (
                        <p className="text-gray-400">No comments yet.</p>
                    ) : (
                        comments.map((comment) => (
                            <CommentsComponent key={comment.id} comment={comment} fetchComments={fetchThreadAndComments} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
