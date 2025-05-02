import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import api from "../api/apiClients.jsx";
import { useAuth } from "../context/AuthContext";
const CommentReplyForm = ({ threadId, parentCommentId = null, onSuccess }) => {
    const [content, setContent] = useState('');
    const { accessToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const payload = {
                content,
                thread: threadId,
            };
            if (parentCommentId) {
                payload.parent_comment = parentCommentId;
            }

            const response = await api.post(`/threads/${threadId}/comments/`, payload);
            setContent('');

            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex flex-row items-center">
                <textarea
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                    rows="2"
                    placeholder="Write a reply..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
                >
                    <PaperAirplaneIcon className="h-5 w-5 rotate-325" />
                </button>
            </div>
        </form>
    );
};

export default CommentReplyForm;