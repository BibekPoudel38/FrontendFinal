import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // (Optional for success/error messages)
import api from "../api/apiClients"; // Adjust path if needed
import CreateNewThreadModal from "./CreateNewThread"; // Adjust path if needed
export default function CreatePostBox({ fetchThreads, setThreads }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        fetchCategories();
        fetchThreads();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/threads/categories/");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === "") {
            // If search box is empty, fetch all threads again
            await fetchThreads();
            return;
        }

        try {
            const res = await api.get(`/threads/?q=${term}`);
            setThreads(res.data);
        } catch (error) {
            console.error("Error searching threads", error);
        }
    };


    const handleCategoryClick = (categoryId) => {
        console.log(localStorage.getItem("accessToken"));
        const newCategory = categoryId === selectedCategory ? null : categoryId;
        setSelectedCategory(newCategory);
        fetchThreads(newCategory);
    };

    const handleCreateThread = async (formData) => {
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("content", JSON.stringify(formData.content)); // Important: Send JSON content as a string
            formData.categories.forEach((categoryId) => {
                data.append("category", categoryId); // Django accepts multiple same keys like category=1&category=2
            });

            if (formData.file) {
                data.append("file", formData.file);
            }

            const res = await api.post("/threads/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            toast.success("Thread created successfully! 🎉"); // (optional)

            fetchThreads();
        } catch (error) {
            toast.error("Failed to create thread 😔"); // (optional)
        }
    };

    return (
        <div className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col gap-3.5">
            <h1 className="text-3xl font-bold">Student Forum</h1>
            <div className="flex gap-4">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search threads..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />

                {/* Create Post Section */}
                <div className="w-50">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="h-10 gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-semibold transition"
                    >
                        New Thread
                    </button>
                </div>

                {/* Modal */}
                <CreateNewThreadModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateThread}
                    categories={categories}
                />
            </div>

            <div className="flex gap-3 flex-wrap mt-4">
                <button
                    onClick={() => handleCategoryClick(null)}
                    className={`px-4 py-1 rounded-full text-sm ${selectedCategory === null
                        ? "bg-purple-700 text-white"
                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`px-4 py-2 rounded-full border transition ${selectedCategory === cat.id
                            ? "bg-purple-700 text-white"
                            : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
