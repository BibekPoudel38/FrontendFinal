import { Link } from 'react-router-dom';
import UpVoteDownVoteReplies from './UpVoteDownVoteReplies';



export default function FeedItem({ thread }) {
    return (
        <Link to={`/thread/${thread.id}`}>
            <div className="p-4 mt-3 rounded-xl bg-zinc-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
                <div className="flex justify-between gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* User Info */}
                        <div className="mb-2 text-sm text-gray-400">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-white">@{thread.user.username}</span>
                                <span className="text-gray-500">•</span>
                                <span>{new Date(thread.created_at).toLocaleString()}</span>
                                <span className="text-gray-500">•</span>

                                {thread.category?.length > 0 ? (
                                    thread.category.map((e) => (
                                        <span key={e.id} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs font-medium">
                                            {e.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-2 py-1 bg-zinc-700 text-zinc-300 rounded-full text-xs font-medium">
                                        Undefined
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg text-white font-semibold mb-2">{thread.title}</h3>

                        {/* Optional: Description */}
                        {/* <p className="text-sm text-gray-300 mb-4 line-clamp-2">{thread.description}</p> */}

                        {/* Action Buttons */}
                        <UpVoteDownVoteReplies
                            upvotes={thread.up_vote}
                            downvotes={thread.down_vote}
                            repliesCount={thread.comment_count}
                            onUpvote={() => console.log("Upvoted!")}
                            onDownvote={() => console.log("Downvoted!")}
                            onReply={() => console.log("Replied!")}
                        />
                    </div>

                    {/* File Preview */}
                    {thread.file && (
                        <div className="w-32 h-32 flex-shrink-0">
                            <a
                                href={thread.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <img
                                    src={thread.file}
                                    alt="Attachment"
                                    className="w-full h-full object-cover rounded-lg border border-zinc-700"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
