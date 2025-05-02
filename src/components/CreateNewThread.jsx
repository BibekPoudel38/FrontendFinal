import React, { useState } from "react";
import Select from "react-select";
import TiptapEditor from '../components/RichTextBox'; // Make sure path is correct

const CreateNewThreadModal = ({ isOpen, onClose, onSubmit, categories }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategoryIds = selectedCategories.map(option => option.value);
        onSubmit({ title, content, categories: selectedCategoryIds, file });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-zinc-900 text-white rounded-xl p-6 w-full max-w-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Create New Thread</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            placeholder="Share your thoughts"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Content</label>
                        <TiptapEditor onChange={setContent} />
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Categories</label>
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
                    {/* Upload File */}
                    {/* <div>
                        <label className="block mb-2 text-sm font-medium">Upload File (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700"
                        />
                    </div> */}

                    {/* Submit + Cancel */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white font-semibold transition"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-md bg-gray-700 hover:bg-gray-600 px-5 py-2 text-white font-semibold transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateNewThreadModal;
