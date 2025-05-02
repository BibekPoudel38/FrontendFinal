// App.jsx

import { MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = 500;
        if (start === end) return;

        let totalMilSecDur = 2000;
        let incrementTime = (totalMilSecDur / end) * 5;

        let timer = setInterval(() => {
            start += 5;
            setCount(prev => (prev < end ? prev + 5 : end));
            if (start >= end) clearInterval(timer);
        }, incrementTime);
    }, []);

    return (
        <div className="bg-gradient-to-br from-[#0f172a] to-[#6d28d9] text-white relative overflow-hidden">

            {/* Particles Background */}
            <ParticlesBackground />

            {/* Header */}
            <header className="fixed w-full bg-opacity-20 backdrop-blur-md z-50">
                <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                    <div className="text-2xl font-bold tracking-wider">StudentConnect</div>
                    <nav className="space-x-6 hidden md:flex">
                        <a href="#threads" className="hover:text-purple-400">Threads</a>
                        <a href="#mentorship" className="hover:text-purple-400">Mentorship</a>
                        <a href="#jobs" className="hover:text-purple-400">Jobs</a>
                        <a href="#chatbot" className="hover:text-purple-400">AI Buddy</a>
                        <a href="/login/" className="ml-4 neon-btn cursor-pointer">Join Now</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10 pt-32">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-extrabold mb-6"
                >
                    Empowering Students, Together
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-2xl max-w-2xl mb-10"
                >
                    Collaborate, Learn, Mentor, and Grow in a Future-Ready Student Community.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="neon-btn px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                    onClick={() => window.location.href = "/login/"}
                >
                    Get Started
                </motion.button>

                {/* Scroll Down Arrow */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-16 text-4xl text-purple-400"
                >
                    ↓
                </motion.div>

                {/* 3D Model Floating */}
                <div className="absolute right-10 top-1/3 w-72 h-72">
                    <Canvas>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[2, 5, 2]} />
                        <OrbitControls enableZoom={false} autoRotate />
                        <Sphere visible args={[1.5, 100, 200]} scale={1.2}>
                            <MeshDistortMaterial
                                color="#6d28d9"
                                attach="material"
                                distort={0.5}
                                speed={1.5}
                                roughness={90}
                                scale={55}
                            />
                        </Sphere>
                    </Canvas>
                </div>
            </section>
            {/* About Section */}
            <section className="text-center py-24 px-6 max-w-5xl mx-auto z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    About StudentConnect
                </motion.h2>
                <p className="text-lg md:text-xl">
                    A platform by students, for students — find mentors, share ideas, land internships, and get smart support via AI Buddy.
                </p>
            </section>

            {/* Feature: Threads */}
            <FeatureBox
                id="threads"
                title="Threads: Discuss & Collaborate"
                desc="Post your ideas, ask questions, and engage with a vibrant community. Threads are your digital noticeboard for learning!"
                img="https://dummyimage.com/500x350/6d28d9/ffffff&text=Threads+Preview"
                reverse={false}
            />

            {/* Feature: Mentorship */}
            <FeatureBox
                id="mentorship"
                title="Mentorship: Learn from Experience"
                desc="Senior students guide you through project doubts, career planning, and more. Book Zoom meetings directly through the app."
                img="https://dummyimage.com/500x350/0f172a/ffffff&text=Mentorship+Portal"
                reverse={true}
            />

            {/* Feature: Jobs */}
            <FeatureBox
                id="jobs"
                title="Jobs & Internships: Verified Opportunities"
                desc="Apply to internships and jobs with ease. Use our recommended resume templates crafted specially for students!"
                img="https://dummyimage.com/500x350/6d28d9/ffffff&text=Job+Board"
                reverse={false}
            />

            {/* Feature: AI Buddy */}
            <FeatureBox
                id="chatbot"
                title="AI Buddy 🤖: Your Personal Assistant"
                desc="Got questions about your university or major? AI Buddy gives instant smart answers, anytime, anywhere."
                img="https://dummyimage.com/300x300/6d28d9/ffffff&text=AI+Buddy"
                reverse={true}
            />
            {/* Success Metrics */}
            <section className="text-center py-20 px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-12"
                >
                    Impact So Far
                </motion.h2>
                <div className="flex flex-wrap justify-center gap-12">
                    <Metric number={`${count}+`} label="Threads Created" />
                    <Metric number="100+" label="Mentors" />
                    <Metric number="200+" label="Jobs Listed" />
                    <Metric number="24/7" label="AI Buddy Active" />
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-[#0f172a] py-20">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Students Love Us</h2>
                <div className="flex flex-wrap justify-center gap-8 px-6">
                    <TestimonialCard
                        name="Sophia L."
                        text="Thanks to StudentConnect, I found my mentor and internship in just a few clicks. Absolutely love the AI Buddy too!"
                        img="https://randomuser.me/api/portraits/women/65.jpg"
                    />
                    <TestimonialCard
                        name="Jason M."
                        text="The Threads feature helped me find teammates for my capstone project. It's like LinkedIn but for students!"
                        img="https://randomuser.me/api/portraits/men/44.jpg"
                    />
                </div>
            </section>

            {/* Final Call to Action */}
            <section id="join" className="text-center py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-bold mb-10"
                >
                    Ready to level up your student life?
                </motion.h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="neon-btn px-10 py-4 rounded-full font-bold text-lg shadow-lg"
                >
                    Join StudentConnect Today
                </motion.button>
            </section>

            {/* Footer */}
            <footer className="bg-[#0c1120] py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4">StudentConnect</h3>
                        <p>Empowering the next generation of students, together.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li><a href="#threads" className="hover:text-purple-300">Threads</a></li>
                            <li><a href="#mentorship" className="hover:text-purple-300">Mentorship</a></li>
                            <li><a href="#jobs" className="hover:text-purple-300">Jobs</a></li>
                            <li><a href="#chatbot" className="hover:text-purple-300">AI Buddy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#faq" className="hover:text-purple-300">FAQ</a></li>
                            <li><a href="#terms" className="hover:text-purple-300">Terms</a></li>
                            <li><a href="#privacy" className="hover:text-purple-300">Privacy</a></li>
                        </ul>
                    </div>
                    <div className="flex space-x-6 text-2xl mt-4">
                        <a href="#"><FaLinkedin className="hover:text-purple-300" /></a>
                        <a href="#"><FaInstagram className="hover:text-purple-300" /></a>
                        <a href="#"><FaTwitter className="hover:text-purple-300" /></a>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-400 mt-10">
                    &copy; 2025 StudentConnect. All rights reserved.
                </div>
            </footer>

        </div>

    );
}

// ----------- Helper Components Below ------------

// Feature Box
const FeatureBox = ({ id, title, desc, img, reverse }) => (
    <section id={id} className={`py-20 px-6 flex flex-row ${reverse ? 'flex-row-reverse' : 'md:flex-row'} items-center gap-10 max-w-7xl mx-auto`}>
        <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            src={img}
            alt={title}
            className="w-full md:w-1/3 rounded-3xl shadow-2xl"
        />
        <div className="md:w-2/3">
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg">{desc}</p>
        </div>
    </section>
);

// Metric Counter
const Metric = ({ number, label }) => (
    <div className="text-center">
        <div className="text-5xl font-bold">{number}</div>
        <div className="mt-2">{label}</div>
    </div>
);

// Testimonial Card
const TestimonialCard = ({ name, text, img }) => (
    <div className="bg-[#f3f4f6] text-[#0f172a] p-8 rounded-2xl max-w-sm shadow-lg">
        <img src={img} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm mt-2">{text}</p>
    </div>
);

// Particles Background
function ParticlesBackground() {
    return (
        <div className="absolute inset-0 z-0">
            {/* You can install react-tsparticles here and setup */}
            {/* Here we simulate particles with simple gradient for now */}
            <div className="bg-gradient-to-br from-[#0f172a]/60 via-[#6d28d9]/30 to-[#0f172a]/60 w-full h-full"></div>
        </div>
    );
}

// Neon button styling
// (In your Tailwind config or global CSS you can add this pulse animation)
