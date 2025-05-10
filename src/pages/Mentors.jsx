import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // for navigation
import api from "../api/apiClients"; // your axios instance

export default function MentorPage() {
    const [mentors, setMentors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const mentorshipFormats = ["Online", "Offline", "Both"];


    const toggleFilter = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: prev[field] === value ? "" : value,
        }));
    };

    const fetchMentors = async () => {
        try {
            const params = new URLSearchParams(filters).toString();
            const url = params ? `/mentor/?${params}` : `/mentor/`;
            const res = await api.get(url);
            setMentors(res.data);
        } catch (error) {
            console.error("Error fetching mentors", error);
        }
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setSearchTerm(value);

        if (value.trim().length > 0) {
            fetchMentors(value);
        } else {
            fetchMentors(); // reload all
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
        fetchMentors();
    }, [filters]);

    return (
        <div className="p-6 min-h-screen bg-zinc-900 text-white">
            <div className="bg-zinc-800 p-6 rounded-xl shadow-md gap-3.5 mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Find Perfect Mentor</h1>

                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search mentors by name, expertise, major or method of mentoring..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-6 mb-8">


                    <div>
                        <div className="flex flex-wrap gap-3">
                            {mentorshipFormats.map(type => (
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

                        </div>
                    </div>
                </div>
            </div>


            <div className="grid md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (

                    <Link to={`/mentors/${mentor.id}`} key={mentor.id}>

                        <div key={mentor.id} className="bg-zinc-800 p-4 rounded-lg shadow-md cursor-pointer">

                            <div>
                                <h2 className="text-xl font-bold">{mentor.full_name}</h2>
                                {/* mentor.expertise split by comma and show in chips */}
                                <div className="flex flex-wrap mt-2">
                                    {mentor.expertise.split(",").map((tag) => (
                                        <span key={tag} className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-400">{mentor.bio}</p>
                                <p className="text-gray-400">Education: {mentor.education}</p>
                                {mentor.services_offered.split(",").map((service) => (
                                    <span key={service} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                        {service.trim()}
                                    </span>
                                ))}
                                <p className="text-gray-400">{mentor.method}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
