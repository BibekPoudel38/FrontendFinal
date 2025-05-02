import { ChatBubbleLeftIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

export default function UpVoteDownVoteReplies({
    upvotes,
    downvotes,
    repliesCount,
    onUpvote,
    onDownvote,
    onReply,
    userVote,
}) {
    return <div className="flex items-center gap-4 text-gray-600">
        <button
            className={`flex items-center gap-1 ${userVote === "upvote" ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-400`}
            onClick={onUpvote}
        >
            <HandThumbUpIcon className="h-5 w-5" />
            <span>{upvotes}</span>
        </button>

        <button
            className={`flex items-center gap-1 ${userVote === "downvote" ? "text-red-500" : "text-gray-400"
                } hover:text-red-400`}
            onClick={onDownvote}
        >
            <HandThumbDownIcon className="h-5 w-5" />
            <span>{downvotes}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-600  hover:cursor-pointer" onClick={onReply}>
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span>{repliesCount} Reply</span>
        </button>
    </div>;
}
