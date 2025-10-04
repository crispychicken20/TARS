import React, { useEffect, useRef } from "react";

const About = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		// Smoothly scroll the about container into view when this route mounts
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, []);

	return (
		<div className="about-container" ref={containerRef}>
			<h1>About Us</h1>
			<p>
				Welcome to T.A.R.S, your AI-powered assistant. Inspired by futuristic
				holographic systems, this project demonstrates interactive spatial
				visualization using canvas, motion physics, and React. Explore the mesh,
				feel the gravity, and enter a new era of visual AI.
			</p>
		</div>
	);
};

export default About;