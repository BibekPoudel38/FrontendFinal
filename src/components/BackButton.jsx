import { ChevronLeftIcon } from "@heroicons/react/24/outline";


export default function BackButton() {
    return (
        <button className="mb-2 bg-gray-200  flex gap-2 p-2 px-4 pr-8 rounded-3xl flex-row hover:cursor-pointer hover:bg-black text-black hover:text-white" onClick={() => window.history.back()}>
            <ChevronLeftIcon className="h-5 w-5" />
            <p>Back</p>
        </button>
    );
}