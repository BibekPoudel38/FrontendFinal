import { useEffect, useState } from "react";
import api from "../api/apiClients"; // your axios instance
import CreateJobModal from "../components/CreateJob"; // will create this
import JobCard from "../components/JobCard"; // will create this

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const jobTypes = ["Full Time", "Part Time", "Internship", "Contract"];
    const levels = ["Entry", "Mid", "Senior"];
    const paidOptions = [{ label: "Paid", value: true }, { label: "Unpaid", value: false }];



    const toggleFilter = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: prev[field] === value ? "" : value,
        }));
    };

    const fetchJobs = async () => {
        try {
            const params = new URLSearchParams(filters).toString();
            const url = params ? `/jobs/?${params}` : `/jobs/`;
            const res = await api.get(url);
            setJobs(res.data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setSearchTerm(value);

        if (value.trim().length > 0) {
            fetchJobs(value);
        } else {
            fetchJobs(); // reload all
        }
    };

    const [filters, setFilters] = useState({});

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    useEffect(() => {
        fetchJobs();
    }, [filters]);

    return (
        <div className="p-6 min-h-screen bg-zinc-900 text-white">
            <div className="bg-zinc-800 p-6 rounded-xl shadow-md gap-3.5 mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Job Opportunities</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2 rounded-md bg-purple-600 hover:bg-purple-700"
                    >
                        Post a Job
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-6 mb-8">

                    {/* Job Type Chips */}
                    <div>
                        <div className="flex flex-wrap gap-3">
                            {jobTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => toggleFilter("type", type)}
                                    className={`px-4 py-2 rounded-full border transition ${filters.type === type
                                        ? "bg-purple-600 border-purple-600 text-white"
                                        : "bg-zinc-800 border-zinc-600 text-gray-400 hover:bg-zinc-700"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                            {levels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => toggleFilter("level", level)}
                                    className={`px-4 py-2 rounded-full border transition ${filters.level === level
                                        ? "bg-blue-600 border-blue-600 text-white"
                                        : "bg-zinc-800 border-zinc-600 text-gray-400 hover:bg-zinc-700"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                            {paidOptions.map(opt => (
                                <button
                                    key={opt.label}
                                    onClick={() => toggleFilter("paid", opt.value)}
                                    className={`px-4 py-2 rounded-full border transition ${filters.paid === opt.value
                                        ? "bg-green-600 border-green-600 text-white"
                                        : "bg-zinc-800 border-zinc-600 text-gray-400 hover:bg-zinc-700"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            {/* Modal for creating a job */}
            <CreateJobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchJobs}
            />
        </div>
    );
}
