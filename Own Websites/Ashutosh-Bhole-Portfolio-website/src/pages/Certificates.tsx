'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

const certificates = [
	{
		title: "JavaScript Language",
		issuer: "Namaste JavaScript",
		// date: "22th April 2025",
		// link: "./files/certificates_pdf/Typescript.pdf",
		link: "https://namastedev.com/ashutoshbhole1/certificates/namaste-javascript",
		description: "Comprehensive JavaScript course covering ES6+, DOM manipulation, asynchronous programming, closures, and real-world project implementations.",
		skills: ["JavaScript", "ES6+", "Asynchronous Programming", "DOM Manipulation", "Frontend Development"]
	},
	{
		title: "Frontend Developer (React) Certificate",
		issuer: "HackerRank",
		// date: "20th March 2025",
		link: "https://www.hackerrank.com/certificates/531e71ef4b22",
		description: "Demonstrates expertise in building dynamic and responsive user interfaces using React, including components, hooks, and state management.",
		skills: ["React.js", "JSX", "Components", "Hooks", "State Management", "Props", "Event Handling"]
	},
	{
		title: "Software Engineer Intern - HackerRank",
		issuer: "HackerRank",
		// date: "26th February 2025",
		link: "https://www.hackerrank.com/certificates/6750eaa77f6c",
		description: "Demonstrates proficiency in programming, problem-solving, and algorithmic thinking through completing diverse software engineering challenges.",
		skills: ["Programming", "Data Structures & Algorithms", "Problem Solving", "Software Engineering", "Debugging"]
	},
	{
		title: "React Foundations for Next.js",
		issuer: "Vercel",
		// date: "26th February 2025",
		link: "https://drive.google.com/file/d/14IZmjwdihW4aMbyDFX5zgDW7LmTNitUu/view?usp=sharing",
		description: "Covers essential React concepts required for building Next.js applications, including components, JSX, props, state management, and hooks.",
		skills: ["React.js", "JSX", "Components", "Props", "State Management", "Hooks", "Event Handling"]


	},
	{
		title: "Node.js (Intermediate) Certificate",
		issuer: "HackerRank",
		// date: "26th February 2025",
		link: "https://www.hackerrank.com/certificates/bd023bc05da2",
		description: "Demonstrates intermediate-level proficiency in Node.js, covering server-side development, RESTful API creation, asynchronous programming, and application architecture.",
		skills: ["Node.js", "JavaScript", "RESTful APIs", "Asynchronous Programming", "Express.js", "Backend Development", "Application Architecture"]

	},
	{
		title: "Next Js Fundamentals Certificate - Vercel",
		issuer: "Vercel ",
		// date: "26th February 2025",
		link: "https://drive.google.com/file/d/16WG6JQG0Shv7CAu6PLWvQgGbKAbw5HX6/view?usp=drive_link",
		description: "Validates understanding of Next.js fundamentals including server-side rendering, static site generation, routing, and API integration for building performant React applications.",
		skills: ["Next.js", "React.js", "Server-Side Rendering (SSR)", "Static Site Generation (SSG)", "Routing", "API Integration", "Vercel Deployment"]

	}
	
];

const Certificates = () => {
	return (
		<div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
			<ScrollAnimation>
				<motion.div
					className="flex items-center gap-3 mb-12"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Award className="w-8 h-8" />
					<h2 className="text-4xl font-bold gradient-text">Certificates</h2>
				</motion.div>
			</ScrollAnimation>

			<div className="grid md:grid-cols-2 gap-6">
				{certificates.map((cert, index) => (
					<ScrollAnimation key={cert.title}>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5"
						>
							<h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
							<div className="text-gray-400 space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-lg">{cert.issuer}</span>
									<div className="flex items-center gap-2">
										{/* <Calendar className="w-4 h-4" /> */}
										{/* <span>{cert.date}</span> */}
									</div>
								</div>
								<p className="text-gray-300 line-clamp-2">{cert.description}</p>
								<div className="flex flex-wrap gap-2 mt-4">
									{cert.skills.map((skill) => (
										<span
											key={skill}
											className="px-2 py-1 text-sm bg-white/10 rounded-full"
										>
											{skill}
										</span>
									))}
								</div>
								<motion.a
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 group-hover:translate-x-2 transition-transform"
									whileHover={{ scale: 1.05 }}
								>
									View Certificate
									<ExternalLink className="w-4 h-4" />
								</motion.a>
							</div>
						</motion.div>
					</ScrollAnimation>
				))}
			</div>
		</div>
	);
};

export default Certificates;