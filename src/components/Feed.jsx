import { useEffect, useState } from "react";
import api from "../api/apiClients";
import CreatePostBox from "./CreatePostBox";
import FeedItem from "./FeedItem";

export default function Feed() {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchThreads();
    }, []);



    const fetchThreads = async (categoryId = null) => {
        setLoading(true);
        try {
            var url = '/threads/';
            if (categoryId) {
                url = `/threads/?cat=${categoryId}`;
            }
            const res = await api.get(url,);
            console.log(res.config.url)
            setThreads(res.data);
        } catch (err) {
            console.error("Failed to fetch threads", err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="space-y-6">

            <CreatePostBox fetchThreads={fetchThreads} setThreads={setThreads} />

            {/* 🧵 Feed Items */}
            {loading ? (
                <p className="text-gray-400">Loading threads...</p>
            ) : (
                threads.map((thread) => (
                    <FeedItem key={thread.id} thread={thread} />
                ))
            )}
        </div>
    );
}
