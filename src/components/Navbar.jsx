import {
    BriefcaseIcon,
    HomeIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { accessToken, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const navBarItems = [
        { name: 'Home', to: '/dashboard', icon: HomeIcon },
        { name: 'Mentors', to: '/mentors', icon: UserGroupIcon },
        { name: 'Jobs', to: '/jobs', icon: BriefcaseIcon },
    ];


    const handleLogout = () => {
        logout();
        navigate("/login"); // ✅ Redirect to login page after logout
    };

    return (
        <header className="bg-zinc-900 p-4 top-0 left-0 w-full flex justify-between items-center z-50 shadow-lg border-b border-zinc-800">
            {/* Logo / Title */}
            <h1
                className="text-2xl font-bold text-white cursor-pointer"
                onClick={() => navigate('/')}
            >
                Toro Portal
            </h1>

            {/* Navigation Links */}
            <ul className="flex gap-4 items-center">
                {navBarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;

                    return (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:bg-zinc-800'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <p>{item.name}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Profile + Menu */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl font-bold hover:bg-purple-500 transition  cursor-pointer"
                >
                    ⚙️
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2 z-50 text-gray-200">
                        <Link
                            to="/register-mentor"
                            className="block px-4 py-2 hover:bg-zinc-500"
                            onClick={() => setMenuOpen(false)}
                        >
                            Register as Mentor
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-zinc-500"
                            onClick={() => setMenuOpen(false)}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-zinc-500 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </header>
    );
}

export default Navbar;
