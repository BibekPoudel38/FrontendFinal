import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import forgotImg from "../assets/forgot.jpeg"; // Update if needed

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleCheckEmail = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/checkemail/", { email });
            console.log(res.data);
            if (res.status === 200) {
                setMessage("OTP has been sent to your email.");
                setStep(2);
            }
        } catch (err) {
            setError(err.response?.data?.message || "User not found or server error.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/verifyotp/", { email, otp });
            if (res.status === 200) {
                setMessage("OTP verified! Set your new password.");
                setStep(3);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP or server error.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/resetpassword/", {
                email,
                otp,
                password,
            });
            if (res.status === 200) {
                setMessage("Password successfully reset! Redirect to login.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password.");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Left Side Image */}
            <div className="bg-[#e6f2ea] hidden md:block">
                <img
                    src={forgotImg}
                    alt="Forgot Password Illustration"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side Form */}
            <div className="bg-[#0f172a] flex items-center justify-center p-8">
                <div className="w-full max-w-md text-white space-y-6">
                    <h2 className="text-3xl font-bold text-purple-500 text-center">
                        Forgot Password
                    </h2>

                    {step === 1 && (
                        <form onSubmit={handleCheckEmail} className="space-y-4">
                            <p className="text-sm text-gray-300 text-center">
                                Enter your CSUDH email to receive an OTP.
                            </p>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@toromail.csudh.edu"
                                    required
                                    className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-medium"
                            >
                                Send OTP
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <p className="text-sm text-gray-300 text-center">
                                Enter the OTP sent to your email.
                            </p>
                            <div>
                                <label className="block text-sm mb-1">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    required
                                    className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-medium"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <p className="text-sm text-gray-300 text-center">
                                Set your new password.
                            </p>
                            <div>
                                <label className="block text-sm mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                    required
                                    className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                    className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-medium"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}

                    {message && (
                        <p className="text-center text-green-400 text-sm">{message}</p>
                    )}
                    {error && (
                        <p className="text-center text-red-400 text-sm">{error}</p>
                    )}

                    <p className="text-sm text-center text-gray-400">
                        Remembered your password?{" "}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:underline font-semibold"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
