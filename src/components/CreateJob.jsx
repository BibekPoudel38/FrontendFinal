import { useState } from "react";
import Select from "react-select";
import api from "../api/apiClients";
import TiptapEditor from "./RichTextBox";


export default function CreateJobModal({ isOpen, onClose, onSuccess }) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [salaryUnit, setSalaryUnit] = useState("");
    const [category, setCategory] = useState("");
    const [jobType, setJobType] = useState("");
    const [level, setLevel] = useState("");
    const [applyLink, setApplyLink] = useState("");
    const [description, setDescription] = useState("");
    const [lastApplyDate, setLastApplyDate] = useState("");

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    const categories = [
        { id: 1, name: "Software Development" },
        { id: 2, name: "Data Science" },
        { id: 3, name: "Design" },
        { id: 4, name: "Marketing" },
        { id: 5, name: "Sales" },
        { id: 6, name: "Customer Support" },
        { id: 7, name: "Product Management" },
        { id: 8, name: "Human Resources" },
        { id: 9, name: "Finance" },
        { id: 10, name: "Legal" },
        { id: 11, name: "Operations" },
        { id: 12, name: "Quality Assurance" },
        { id: 13, name: "Project Management" },
        { id: 14, name: "Operations" },
        { id: 15, name: "Quality Assurance" },
        { id: 16, name: "Project Management" },
        { id: 17, name: "Operations" },
        { id: 18, name: "Quality Assurance" },
        { id: 19, name: "Project Management" },
        { id: 20, name: "Operations" },
        { id: 21, name: "Quality Assurance" },
        { id: 22, name: "Project Management" },
        { id: 23, name: "Operations" },
        { id: 24, name: "Quality Assurance" },
        { id: 25, name: "Project Management" },
        { id: 26, name: "Operations" },
        { id: 27, name: "Quality Assurance" },
        { id: 28, name: "Project Management" },
        { id: 29, name: "Operations" },
        { id: 30, name: "Quality Assurance" },
        { id: 31, name: "Project Management" },
        { id: 32, name: "Operations" },
        { id: 33, name: "Quality Assurance" },
        { id: 34, name: "Project Management" },
        { id: 35, name: "Operations" },
        { id: 36, name: "Quality Assurance" },
        { id: 37, name: "Project Management" },
        { id: 38, name: "Operations" },
        { id: 39, name: "Quality Assurance" },
        { id: 40, name: "Project Management" },
        { id: 41, name: "Operations" },
        { id: 42, name: "Quality Assurance" },
        { id: 43, name: "Project Management" },
        { id: 44, name: "Operations" },
        { id: 45, name: "Quality Assurance" },
        { id: 46, name: "Project Management" },
        { id: 47, name: "Operations" },
        { id: 48, name: "Quality Assurance" },
        { id: 49, name: "Project Management" },
    ]


    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            title,
            company_name: company,
            location,
            salary_amount: salary,
            salary_unit: salaryUnit,
            category: selectedCategories.map((option) => option.value),
            type: jobType,
            tags: jobType,
            level,
            apply_link: applyLink,
            description,
            expiry_date: lastApplyDate,
        };

        try {
            await api.post("/jobs/", jobData);
            onSuccess(); // Refresh jobs list
            onClose();   // Close modal
        } catch (error) {
            console.error("Error posting job", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
            <div className="bg-zinc-900 text-white rounded-xl p-8 w-full max-w-4xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Two Column Section */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Job Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Software Engineer"
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Company Name</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., Google"
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., Remote or New York"
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Salary</label>
                                <input
                                    type="text"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="e.g., 20, 50000"
                                    required
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                />

                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Salary Unit</label>
                                <select
                                    value={salaryUnit}
                                    onChange={(e) => setSalaryUnit(e.target.value)}
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Salary Unit</option>
                                    <option value="hour">Per Hour</option>
                                    <option value="week">Per Week</option>
                                    <option value="month">Per Month</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Category</label>
                                <Select
                                    isMulti
                                    options={categories.map((category) => ({
                                        value: category.id,
                                        label: category.name,
                                    }))}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    placeholder="Select categories..."
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            backgroundColor: '#27272a', // bg-zinc-800
                                            borderColor: '#3f3f46',      // border-zinc-700
                                            padding: '0.4rem',
                                            fontSize: '0.875rem',         // text-sm
                                            color: 'white',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#7c3aed',     // purple-600 hover
                                            },
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#5b21b6', // bg-purple-700
                                            color: 'white',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: 'white',
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: '#9ca3af', // text-gray-400
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: 'white',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: '#27272a', // dark dropdown
                                        }),
                                        option: (base, { isFocused, isSelected }) => ({
                                            ...base,
                                            backgroundColor: isFocused
                                                ? '#7c3aed' // Hovered option = purple
                                                : isSelected
                                                    ? '#6d28d9' // Selected option
                                                    : '#27272a', // Normal option
                                            color: 'white',
                                            cursor: 'pointer',
                                        }),
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Job Type</label>
                                <select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Level</label>
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Job Level</option>
                                    <option value="Entry">Entry</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Senior">Senior</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Apply Link (optional)</label>
                                <input
                                    type="url"
                                    value={applyLink}
                                    onChange={(e) => setApplyLink(e.target.value)}
                                    placeholder="e.g., https://company.com/careers"
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Last application date</label>
                                <input
                                    type="date"
                                    value={applyLink}
                                    onChange={(e) => setLastApplyDate(e.target.value)}
                                    placeholder="Set application deadline"
                                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Job Description</label>
                        <TiptapEditor onChange={setDescription} />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-purple-600 hover:bg-purple-700 px-5 py-3 text-white font-semibold transition"
                        >
                            Post Job
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-md bg-gray-700 hover:bg-gray-600 px-5 py-3 text-white font-semibold transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}