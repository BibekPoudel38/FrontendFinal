import { Link } from "react-router-dom";

export default function JobCard({ job }) {
    return (
        <Link to={`/jobs/${job.id}`}>
            <div className="p-4 bg-zinc-800 rounded-lg hover:shadow-lg transition cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-400 text-sm">{job.category} • {job.location}</p>
                {/* Loop inside tags and show in chips */}
                <div className="flex flex-wrap mt-2">
                    {job.tags.map((tag) => (
                        <span key={tag} className="bg-purple-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-400 text-sm mt-2">Salary: ${job.salary_amount + " per " + job.salary_unit || "Not specified"}</p>
            </div>
        </Link>
    );
}
