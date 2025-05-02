import { motion } from "framer-motion";

const bounceTransition = {
    y: {
        duration: 0.6,
        yoyo: Infinity,
        ease: "easeOut",
    },
};

export default function Loader({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 bg-zinc-800 rounded-lg p-4">
            <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="w-4 h-4 rounded-full bg-blue-500"
                        transition={bounceTransition}
                        animate={{ y: ["100%", "-100%"] }}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
            <p className="text-gray-400 text-sm animate-pulse">{text}</p>
        </div>
    );
}
