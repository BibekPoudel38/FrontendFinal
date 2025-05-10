import { useEffect, useState } from "react";
import api from "../api/apiClients"; // Your axios client

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [threads, setThreads] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    // Fetch User, Threads, Jobs
    useEffect(() => {
        fetchProfileData();
    }, []);



    const fetchProfileData = async () => {
        try {
            const userRes = await api.get("/auth/profile/");
            const threadsRes = await api.get("/threads/?my_threads=true");
            const jobsRes = await api.get("/jobs/?my_jobs=true");
            console.log(userRes.data)
            setUser(userRes.data);
            setThreads(threadsRes.data);
            setJobs(jobsRes.data);
        } catch (error) {
            console.error("Failed fetching profile data", error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordForm.new_password !== passwordForm.confirm_password) {
            alert("New passwords do not match.");
            return;
        }
        try {
            var response = await api.post("/auth/change_password/", {
                old_password: passwordForm.old_password,
                new_password: passwordForm.new_password,
            });
            if (response.status === 200) {
                alert("Password successfully changed!");
                setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
            }
            else {
                alert("Failed to change password.");
            }
        } catch (error) {
            console.error("Password change failed", error);
            alert("Failed to update password.");
        }
    };

    const deleteThread = async (threadId) => {
        if (!window.confirm("Are you sure you want to delete this thread?")) return;
        try {
            await api.delete(`/threads/${threadId}/`);
            setThreads((prev) => prev.filter((t) => t.id !== threadId));
        } catch (error) {
            console.error("Delete thread failed", error);
        }
    };

    const closeJob = async (jobId) => {
        if (!window.confirm("Mark this job as Closed?")) return;
        try {
            await api.patch(`/jobs/${jobId}/`, { status: "closed" });
            fetchProfileData();  // reload updated list
        } catch (error) {
            console.error("Failed to close job", error);
        }
    };

    if (!user) return <div className="p-10 text-center text-white">Loading Profile...</div>;

    return (
        <div className="bg-zinc-900 min-h-screen text-white">
            <div className="grid grid-cols-2 gap-2 max-w-6xl mx-auto py-8 text-white ">

                {/* User Info */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow mb-2">
                    <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
                    <p><strong>Email:</strong> {user.profile.email}</p>
                    <p><strong>Username:</strong> @{user.profile.email.toString().split("@")[0]}</p>
                    <p><strong>Joined:</strong> {new Date(user.profile.created_at).toLocaleDateString()}</p>
                </div>
                {/* Mentor Profile */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow mb-2">
                    <h2 className="text-2xl font-bold mb-4 text-purple-700">Mentor's Profile</h2>

                    <div className="space-y-3 text-gray-800 dark:text-white">
                        <p><strong>Name:</strong> {user.mentor.full_name}</p>
                        <p><strong>Bio:</strong> {user.mentor.bio}</p>
                        <p><strong>Expertise:</strong> {user.mentor.expertise}</p>
                        <p><strong>Services Offered:</strong> {user.mentor.services_offered}</p>
                        <p><strong>Education:</strong> {user.mentor.education}</p>
                        <p><strong>Experience:</strong> {user.mentor.experience_years} years</p>
                        <p><strong>Mentorship Mode:</strong> {user.mentor.mode_of_mentorship}</p>
                        <p><strong>Verified:</strong> {user.mentor.verified ? "✅ Yes" : "❌ No"}</p>
                        <p><strong>Joined:</strong> {new Date(user.mentor.created_at).toLocaleDateString()}</p>
                        {user.mentor.resume && (
                            <p><strong>Resume:</strong> <a href={user.mentor.resume} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">View Resume</a></p>
                        )}
                    </div>
                </div>
                {/* Change Password
                <div className="bg-zinc-800 p-6 rounded-lg shadow mb-2">
                    <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="grid gap-4">
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={passwordForm.old_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwordForm.new_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passwordForm.confirm_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold">
                            Update Password
                        </button>
                    </form>
                </div>
                {/* <div className="bg-zinc-800 p-6 rounded-lg shadow mb-2">
                    <h2 className="text-2xl font-bold mb-4">Register as Mentor</h2>
                    <form onSubmit={handlePasswordChange} className="grid gap-4">
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={passwordForm.old_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwordForm.new_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passwordForm.confirm_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                            className="bg-zinc-700 p-3 rounded-lg border border-zinc-600 focus:outline-none"
                            required
                        />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold">
                            Update Password
                        </button>
                    </form>
                </div> */}

                {/* My Threads */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-2xl font-bold mb-4">My Threads</h2>
                    {threads.length === 0 ? (
                        <p className="text-gray-400">No threads posted yet.</p>
                    ) : (
                        threads.map((thread) => (
                            <div key={thread.id} className="flex justify-between items-center border-b border-zinc-700 py-3">
                                <p>{thread.title}</p>
                                <button
                                    onClick={() => deleteThread(thread.id)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* My Jobs */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-2xl font-bold mb-4">My Job Listings</h2>
                    {jobs.length === 0 ? (
                        <p className="text-gray-400">No jobs posted yet.</p>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="flex justify-between items-center border-b border-zinc-700 py-3">
                                <div>
                                    <p className="font-bold">{job.title}</p>
                                    <p className="text-sm text-gray-400">{job.status}</p>
                                </div>
                                {job.status !== "closed" && (
                                    <button
                                        onClick={() => closeJob(job.id)}
                                        className="text-green-500 hover:text-green-400"
                                    >
                                        Mark as Closed
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
