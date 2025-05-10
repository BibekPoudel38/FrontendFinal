import React, { useEffect } from "react";
import api from "../api/apiClients";
import CustomLoading from "./Loader";


export default function MentorProfileCard({ mentorId }) {



    const [mentor, setMentorData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await api.get(`/mentor/?id=${mentorId}`);
                setMentorData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMentorData();
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CustomLoading />
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-red-500 text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg text-gray-800 dark:text-white space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                {/* <img
                    src={mentor.profile_picture || "/default-profile.png"}
                    alt="Mentor"
                    className="w-24 h-24 rounded-full object-cover border"
                /> */}
                <div>
                    <h2 className="text-2xl font-bold">{mentor.full_name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mode: {mentor.mode_of_mentorship.toUpperCase()}
                    </p>
                    {mentor.verified && (
                        <span className="text-green-500 font-medium">✔ Verified Mentor</span>
                    )}
                </div>
            </div>

            {/* Bio & Details */}
            <section>
                <h3 className="text-xl font-semibold">Bio</h3>
                <p>{mentor.bio}</p>
            </section>

            <section>
                <h3 className="text-xl font-semibold">Expertise</h3>
                {/* Break model.expertise by comma and show in chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {mentor.expertise.split(",").map((tag) => (
                        <span key={tag} className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-xl font-semibold">Services Offered</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                    {mentor.services_offered.split(",").map((tag) => (
                        <span key={tag} className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </section>

            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mentor.education && (
                    <div>
                        <h4 className="font-semibold">Education</h4>
                        <p>{mentor.education}</p>
                    </div>
                )}
                {mentor.experience_years !== null && (
                    <div>
                        <h4 className="font-semibold">Experience</h4>
                        <p>{mentor.experience_years} years</p>
                    </div>
                )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-4">
                {mentor.linkedin && (
                    <a href={mentor.linkedin} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                )}
                {mentor.website && (
                    <a href={mentor.website} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                        Website
                    </a>
                )}
                {mentor.resume && (
                    <a href={mentor.resume} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                        Resume
                    </a>
                )}
            </div>

        </div>
    );
}
