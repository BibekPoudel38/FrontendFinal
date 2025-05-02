import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appIcon from "../assets/icon.webp";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { login } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
                email,
                password,
            });

            const { access, refresh } = res.data;

            if (access && refresh) {
                login(access, refresh); // ✅ call the context login function
                navigate("/dashboard");
            } else {
                alert("Invalid login response.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials or server error.");
        }
    };
    return (
        <>
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
                                <div
                                    className="h-8 sm:h-10"

                                >
                                    <img srcSet={appIcon} alt="G" className='h-14' />
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

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <a
                                    className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                                    href="#"
                                >
                                    <img srcSet={appIcon} alt="G" className='h-14' />
                                </a>
                            </div>

                            <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
                                <div className='col-span-6'>
                                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Toro Portal</h1>

                                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                                        Help, Share, Learn, Grow
                                    </p>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 placeholder:text-gray-400 text-sm text-gray-700 p-4 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 placeholder:text-gray-400 text-sm text-gray-700 p-4 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        By using this service, you agree to our
                                        <a href="#" className="text-gray-700 underline dark:text-gray-200 ph-1">
                                            &nbsp; terms and conditions&nbsp;
                                        </a>
                                        and
                                        <a href="#" className="text-gray-700 underline dark:text-gray-200">&nbsp; Privacy policy &nbsp; </a>.
                                    </p>
                                </div>
                                <div className="col-span-6 sm:flex sm:items-start sm:gap-4 flex-col">
                                    {error && <p className="text-red-600">{error}</p>}
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 flex-col">
                                    <button
                                        className="w-full hover:cursor-pointer hover:bg-grey-900 inline-block shrink-0 rounded-md bg-[#5E40A0] px-12 py-3 text-sm font-medium text-white transition hover:text-white focus:outline-hidden dark:hover:bg-blue-700 dark:hover:text-white"
                                    >
                                        Login
                                    </button>





                                </div>
                            </form>

                            <GoogleLoginButton />
                            <span className="mt-4 py-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                Dont have an account?
                                <Link to={'/signup'} className="text-gray-700 underline dark:text-gray-200 ml-2">Signup</Link>
                                <p className="mt-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                    <Link to="/forgot-password" className="text-gray-700 underline dark:text-gray-200 ml-2">
                                        Forgot password?
                                    </Link>
                                </p>

                            </span>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}
