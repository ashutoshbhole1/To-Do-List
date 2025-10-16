'use client';

import { motion } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, Award, Users, Globe } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

const About = () => {
	const achievements = [
		{
			icon: <Code2 className="w-6 h-6" />,
			title: "10+ Projects",
			description: "Business Websites"
		},
		{
			icon: <Briefcase className="w-6 h-6" />,
			title: "5+ ",
			description: "Satisfied Clients"
		},
		{
			icon: <GraduationCap className="w-6 h-6" />,
			title: "7.28 CGPA",
			description: "Academic excellence"
		}
	];

	const interests = [
		"Web Development",
		"UI/UX Design",
		// "Cloud Computing",
		"DevOps",
		// "Open Source",
		"Artificial Intelligence"
	];

	return (
		<div className="min-h-screen pt-20 px-4 max-w-4xl mx-auto pb-20">
			<ScrollAnimation>
				<motion.h2 className="text-4xl font-bold mb-8 gradient-text">
					About Me
				</motion.h2>
			</ScrollAnimation>

			<div className="grid md:grid-cols-2 gap-8">
				<ScrollAnimation>
					<div className="aspect-square overflow-hidden rounded-2xl">
						<img
							src="/profile/ashu profile.png"
							alt="Ashutosh Bhole"
							className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
						/>
					</div>
				</ScrollAnimation>

				<ScrollAnimation className="space-y-6">
					<div className="space-y-4">
						<p className="text-gray-300 leading-relaxed">
							Hi! I'm Ashutosh Bhole, a passionate full-stack developer with a focus on building modern, scalable web applications. My journey in tech began during my college years, where I discovered a love for crafting innovative solutions through code. 
						</p>
						<p className="text-gray-300 leading-relaxed">
							Currently pursuing my B.Tech in Computer Science Engineering, I balance academic excellence with hands-on experience in real-world projects, and freelance work. This combination of theoretical knowledge and practical application has strengthened my problem-solving skills and approach to software development.
						</p>
						<p className="text-gray-300 leading-relaxed">
							I specialize in React, Next.js, Node.js, and modern web technologies, with a strong interest in creating performant, user-friendly, and maintainable applications. My experience spans working with startups, developing strategic websites, and contributing to projects that bridge business goals with technology.
						</p>
					</div>

					<ScrollAnimation>
						<div className="pt-4">
							<h3 className="text-2xl font-semibold mb-4 gradient-text">Quick Facts</h3>
							<ul className="list-none space-y-3">
								{["Based in Indore, MP, India", "B.Tech in Computer Science"].map((fact, index) => (
									<motion.li
										key={fact}
										className="flex items-center space-x-2 text-gray-300"
									>
										<span className="w-2 h-2 bg-white rounded-full" />
										<span>{fact}</span>
									</motion.li>
								))}
							</ul>
						</div>
					</ScrollAnimation>

					<ScrollAnimation>
						<div className="flex justify-start space-x-4">
							<a
								href="#"
								// href="/files/cv_pdf/Niladri_Chatterjee(CV).pdf" resume
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
							>
								Download CV
							</a>
							<a
								href="/skills"
								className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
							>
								My Skills
							</a>
						</div>
					</ScrollAnimation>
				</ScrollAnimation>
			</div>

			<ScrollAnimation>
				<div className="mt-16">
					<h3 className="text-2xl font-semibold mb-8 gradient-text">Achievements</h3>
					<div className="grid md:grid-cols-3 gap-6">
						{achievements.map((achievement, index) => (
							<ScrollAnimation key={achievement.title}>
								<div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
									<div className="text-white mb-4">{achievement.icon}</div>
									<h4 className="text-xl font-semibold mb-2">{achievement.title}</h4>
									<p className="text-gray-400">{achievement.description}</p>
								</div>
							</ScrollAnimation>
						))}
					</div>
				</div>
			</ScrollAnimation>

			<ScrollAnimation>
				<div className="mt-16">
					<h3 className="text-2xl font-semibold mb-8 gradient-text">Areas of Interest</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{interests.map((interest, index) => (
							<ScrollAnimation key={interest}>
								<div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3">
									<Globe className="w-5 h-5 text-gray-400" />
									<span className="text-gray-300">{interest}</span>
								</div>
							</ScrollAnimation>
						))}
					</div>
				</div>
			</ScrollAnimation>
		</div>
	);
};

export default About;