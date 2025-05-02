import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { ai_endpoint } from "../api/endpoints"; // Adjust the import path as necessary


export default function SidebarRight() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! Ask me anything from your CSUDH!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        // Add user's question to chat
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(`${ai_endpoint}` + '/ask', {
                question: input
            });

            // Add assistant's reply
            setMessages([
                ...newMessages,
                { role: "assistant", content: response.data.answer }
            ]);
        } catch (error) {
            console.error("Error talking to backend:", error);
            setMessages([
                ...newMessages,
                { role: "assistant", content: "Sorry, I couldn't get a response." }
            ]);
        }
        setLoading(false);
    };

    return (
        <div className="w-80 h-[88vh] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col overflow-hidden ">
            <div className="p-4 text-lg font-semibold text-white">
                AI Buddy {loading && <span className="text-sm animate-pulse">(typing...)</span>}
            </div>
            <div className="flex items-center justify-center p-4">
                <img srcSet="robot-chatbot-generative-ai-free-png.webp" className="w-40 aspect-auto " /></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${msg.role === "assistant"
                            ? "bg-purple-600 text-white self-start"
                            : "bg-white text-black self-end"
                            }`}
                    >
                        {msg.content}
                    </motion.div>
                ))}
            </div>
            <form
                onSubmit={handleSend}
                className="p-4 flex items-center gap-2 border-t border-white/20"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 transition p-2 rounded-lg text-white"
                    disabled={loading}
                >
                    ➤
                </button>
            </form>
        </div>
    );
}
