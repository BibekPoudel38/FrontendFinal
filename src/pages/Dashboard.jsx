import Feed from "../components/Feed";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

export default function Dashboard() {
    return (

        <div className="flex-grow bg-zinc-950 text-white flex pt-4">
            {/* Left Sidebar */}
            <aside className="lg:block w-1/5 px-4">
                <SidebarLeft />
            </aside>

            {/* Feed */}
            <main className="w-full lg:w-3/5 px-4">
                <Feed />
            </main>

            {/* Right Sidebar */}
            <aside className="xl:block w-1/5 px-4">
                <SidebarRight />
            </aside>
        </div>
    );
}
