import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appIcon from "../assets/icon.webp";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/signup/", {
                email,
                password,
            });

            const { access, refresh } = res.data;

            if (access && refresh) {
                login(access, refresh);
                navigate("/dashboard");
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup failed:", err);
            setError(err.response?.data?.detail || "Server error. Try again.");
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        srcSet="https://www.usnews.com/dims4/USNEWS/7788598/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fed%2Fc6%2Fc08782c54056bb0220249a469fc1%2Fgettyimages-1347520881.jpg"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>
                            <div className="h-8 sm:h-10">
                                <img srcSet={appIcon} alt="G" className="h-14" />
                            </div>
                        </a>
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Final Project
                        </h2>
                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900" href="#">
                                <img srcSet={appIcon} alt="G" className="h-14" />
                            </a>
                        </div>

                        <form onSubmit={handleSignup} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Create your account</h1>
                                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                                    Help, Share, Learn, Grow
                                </p>
                            </div>


                            <div className="col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    By signing up, you agree to our
                                    <a href="#" className="text-gray-700 underline dark:text-gray-200">&nbsp;Terms&nbsp;</a>
                                    and
                                    <a href="#" className="text-gray-700 underline dark:text-gray-200">&nbsp;Privacy Policy</a>.
                                </p>
                            </div>

                            {error && (
                                <div className="col-span-6 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="col-span-6">
                                <button
                                    className="w-full rounded-md bg-[#5E40A0] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#4e3490]"
                                    type="submit"
                                >
                                    Signup
                                </button>
                            </div>
                        </form>

                        <GoogleLoginButton />
                        <span className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Already have an account?
                            <Link to={'/login'} className="text-gray-700 underline dark:text-gray-200 ml-2">Login</Link>
                        </span>
                    </div>
                </main>
            </div>
        </section>
    );
}
