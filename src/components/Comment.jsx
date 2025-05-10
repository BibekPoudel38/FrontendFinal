import { useState } from 'react';
import api from "../api/apiClients.jsx"; // Import your axios client
import UpVoteDownVoteReplies from '../components/UpVoteDownVoteReplies.jsx';
import { useAuth } from "../context/AuthContext.jsx"; // Adjust path if needed
import CommentReplyForm from './CommentReplyForm.jsx';

export default function CommentComponent({ comment, fetchComments }) {
    const { accessToken } = useAuth();
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false); // Added this to toggle reply form



    const handleVote = async ({ type, id }) => {
        try {
            const url = `/threads/comments/${id}/${type}/`;

            const response = await api.post(url);
            console.log("Vote success", response.data);
        } catch (error) {
            console.error("Vote failed", error);
        }
        finally {
            fetchComments();
        }
    };



    const fetchReplies = async () => {
        if (showReplies) {
            setShowReplies(false);
            return;
        }

        setLoading(true);
        try {
            const res = await api.get(`/threads/${comment.thread}/comments/${comment.id}/`);
            setReplies(res.data);
            setShowReplies(true);
        } catch (error) {
            console.error('Failed to fetch child comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReply = async (content, parentCommentId = null) => {
        try {
            const payload = {
                content,
                thread: comment.thread,
                parent_comment: parentCommentId || comment.id,
            };

            const res = await api.post(`/threads/${comment.thread}/comments/`, payload);
            console.log("Reply submitted:", res.data);

            // After success, add reply immediately
            setReplies((prevReplies) => [...prevReplies, res.data]);
            setShowReplyForm(false);
            if (!showReplies) setShowReplies(true);
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    return (
        <div className="mb-6 ml-2 border-l-2 border-zinc-700 pl-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-white">{comment.user.email.split("@")[0]}</span>
                <span className="text-gray-400 text-xs">• 2 hours ago</span>
            </div>

            {/* Comment Content */}
            <p className="text-gray-300 mb-2">{comment.content}</p>

            {/* Upvote/Downvote/Replies */}
            <UpVoteDownVoteReplies
                upvotes={comment.up_vote}
                downvotes={comment.down_vote}
                repliesCount={comment.reply_count}
                onUpvote={() => handleVote({ type: "upvote", id: comment.id })}
                onDownvote={() => handleVote({ type: "downvote", id: comment.id })}
                onReply={() => setShowReplyForm(!showReplyForm)}
                userVote={comment.user_vote}
            />

            {/* Reply Form */}
            {showReplyForm && (
                <div className="mt-2">
                    <CommentReplyForm
                        threadId={comment.thread}
                        parentCommentId={comment.id}
                        onSuccess={(newReply) => {
                            setReplies((prev) => [...prev, newReply]);
                            setShowReplyForm(false);
                            if (!showReplies) setShowReplies(true);
                        }}
                    />
                </div>
            )}

            {/* Load Replies */}
            <div className="mt-2">
                {loading && <p className="text-sm text-gray-400">Loading replies...</p>}
                {!loading && replies.length > 0 && (
                    <div className="space-y-4 mt-2">
                        {replies.map((reply) => (
                            <CommentComponent key={reply.id} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
