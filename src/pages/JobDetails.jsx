import { ArrowUpRightIcon, HeartIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/apiClients";
import { ai_endpoint } from "../api/endpoints";
import BackButton from "../components/BackButton";
import ThreadPreviewer from "../components/ThreadPreviewer";

export default function JobDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiPanelOpen, setAiPanelOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [fetchingAI, setFetchingAI] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await api.get(`/jobs/${jobId}/`);
                setJob(res.data);
            } catch (error) {
                console.error("Error fetching job details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleAIAnalyze = async () => {
        setAiPanelOpen(true);
        setFetchingAI(true);
        try {
            const response = await api.post(ai_endpoint + "/analyze-job", { job_id: jobId });
            setAiResponse(response.data.answer);
        } catch (err) {
            setAiResponse(err.message);
        }
        setFetchingAI(false);
    };

    if (loading) {
        return <div className="text-center py-12 text-lg text-gray-300">Loading job details...</div>;
    }

    if (!job) {
        return <div className="text-center py-12 text-lg text-red-400">Job not found.</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-zinc-900 text-white relative">

            {/* Job Header */}
            <div className="max-w-5xl mx-auto bg-zinc-800 rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 border-b border-zinc-700">
                    <BackButton />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">{job.title}</h1>
                            <p className="text-gray-400">{job.company_name} • {job.location}</p>
                            <p className="text-sm text-gray-500">Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 mt-4 md:mt-0">
                            {job.apply_link && (
                                <a
                                    href={job.apply_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-2 bg-[#5E40A0] text-white rounded-lg hover:bg-[#4B2E83] transition"
                                >
                                    <ArrowUpRightIcon className="h-5 w-5" />
                                    Apply Now
                                </a>
                            )}
                            <button className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-zinc-700 transition">
                                <HeartIcon className="h-5 w-5" />
                                Save Job
                            </button>
                            <button
                                onClick={handleAIAnalyze}
                                className="flex items-center justify-center gap-2 px-6 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-600 hover:text-white transition"
                            >
                                <SparklesIcon className="h-5 w-5" />
                                Analyze with AI
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-4 p-6">
                    <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                        {job.type}
                    </span>
                    {job.level && (
                        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            {job.level}
                        </span>
                    )}
                    <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {job.paid ? `Paid: ${job.salary || "TBD"}` : "Unpaid"}
                    </span>
                </div>

                {/* Description Section */}
                <div className="p-6 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                        <div className="text-gray-300 leading-relaxed">
                            <ThreadPreviewer content={job.description} />
                        </div>
                    </section>
                </div>
            </div>

            {/* Resume Templates Section */}
            <div className="max-w-5xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4">Resume Templates</h2>
                <p className="text-gray-400 mb-6">
                    Use these templates to create a professional resume tailored for this job:
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((template) => (
                        <div
                            key={template}
                            className="bg-zinc-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                            <img
                                src="/resumes/images.png"
                                alt="Resume Template"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 text-white">Template {template}</h3>
                                <a
                                    href={`/resumes/template${template}.pdf`}
                                    download
                                    className="w-full block text-center bg-[#5E40A0] hover:bg-[#4B2E83] text-white px-4 py-2 rounded-lg transition"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Animated AI Panel */}
            <AnimatePresence>
                {aiPanelOpen && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className="fixed top-0 right-0 w-[30rem] h-full bg-zinc-950 text-white shadow-lg border-l border-zinc-800 z-50 overflow-y-auto p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">AI Job Analysis</h2>
                            <button onClick={() => setAiPanelOpen(false)} className="text-sm text-gray-400 hover:text-white">
                                Close
                            </button>
                        </div>
                        {fetchingAI ? (
                            <div className="text-center text-purple-300 animate-pulse">Analyzing...</div>
                        ) : (
                            <div className="whitespace-pre-wrap text-gray-300">{aiResponse}</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}