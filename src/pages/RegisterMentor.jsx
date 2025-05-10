import React, { useState } from "react";
import api from "../api/apiClients";

export default function RegisterMentor({ accessToken }) {
    const [formData, setFormData] = useState({
        full_name: "",
        bio: "",
        expertise: "",
        services_offered: "",
        education: "",
        experience_years: "",
        linkedin: "",
        website: "",
        resume: null,
        profile_image: null,
        mode_of_mentorship: "online",
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData((prev) => ({ ...prev, resume: file }));
        } else {
            setError("Please upload a valid PDF resume.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFormData((prev) => ({ ...prev, profile_image: file }));
            setPreviewImage(URL.createObjectURL(file)); // 💡 Preview
        } else {
            setError("Only image files are allowed for profile picture.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // Basic validation
        if (!formData.bio || !formData.expertise || !formData.services_offered) {
            setError("Please fill in all the required fields.");
            return;
        }

        const data = new FormData();
        for (let key in formData) {
            if (formData[key] !== null && formData[key] !== "") {
                data.append(key, formData[key]);
            }
        }

        try {
            await api.post("/mentor/register/", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Mentor request submitted successfully!");
        } catch (err) {
            setError(err?.response?.data?.detail || "Something went wrong.");
        }
    };

    return (
        <div className="bg-zinc-900 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-zinc-700 text-white p-6 rounded-2xl shadow-xl mt-8">
                <h2 className="text-2xl font-semibold mb-4">Become a Mentor</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="name" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Years of Experience" className="w-full p-2 rounded bg-zinc-800" />

                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Your Bio" required className="w-full p-2 rounded bg-zinc-800" />

                    <div className="flex items-center gap-4">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 rounded bg-zinc-800" />
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="w-20 h-20 rounded-full object-cover border" />
                        )}
                    </div>

                    <input name="expertise" value={formData.expertise} onChange={handleChange} placeholder="Expertise (e.g., ML, Web Dev)" required className="w-full p-2 rounded bg-zinc-800" />
                    <textarea name="services_offered" value={formData.services_offered} onChange={handleChange} placeholder="Services Offered" required className="w-full p-2 rounded bg-zinc-800" />
                    <input name="education" value={formData.education} onChange={handleChange} placeholder="Education (optional)" className="w-full p-2 rounded bg-zinc-800" />
                    <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} placeholder="Years of Experience" className="w-full p-2 rounded bg-zinc-800" />
                    <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn (optional)" className="w-full p-2 rounded bg-zinc-800" />
                    <input name="website" value={formData.website} onChange={handleChange} placeholder="Website (optional)" className="w-full p-2 rounded bg-zinc-800" />

                    <label className="block">Upload Resume (PDF):</label>
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="bg-zinc-800 rounded p-2 w-full" />

                    <select name="mode_of_mentorship" value={formData.mode_of_mentorship} onChange={handleChange} className="w-full p-2 rounded bg-zinc-800">
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="both">Both</option>
                    </select>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">Submit</button>
                </form>

                {message && <p className="mt-4 text-green-400">{message}</p>}
                {error && <p className="mt-4 text-red-400">{error}</p>}
            </div>
        </div>
    );
}
