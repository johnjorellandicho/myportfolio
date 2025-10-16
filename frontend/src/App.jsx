// STEP 1: Install react-icons in your project
// Run this command in your terminal:
// npm install react-icons

// STEP 2: Replace your entire Portfolio.jsx with this code:

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

// Import icons from react-icons/si (SimpleIcons) for brand logos
import {
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiHtml5,
  SiCss3,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiFigma,
  SiAdobephotoshop,
  SiNodedotjs,
  SiDjango,
  SiLaravel,
  SiPhp,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiFlutter
} from 'react-icons/si';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayedText, setDisplayedText] = useState('');
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const greetings = [
    "Passionate about clean code.",
    "Building scalable solutions.",
    "Creating digital experiences."
  ];

  // Skill data with icons and categories
  const skillsData = [
    { name: 'JavaScript', category: 'Languages', icon: SiJavascript },
    { name: 'Python', category: 'Languages', icon: SiPython },
    { name: 'Java', category: 'Languages', icon: SiOpenjdk },
    { name: 'HTML', category: 'Languages', icon: SiHtml5 },
    { name: 'CSS', category: 'Languages', icon: SiCss3 },
    { name: 'React', category: 'Frontend', icon: SiReact },
    { name: 'TailwindCSS', category: 'Frontend', icon: SiTailwindcss },
    { name: 'Bootstrap', category: 'Frontend', icon: SiBootstrap },
    { name: 'Figma', category: 'Design', icon: SiFigma },
    { name: 'Adobe Photoshop', category: 'Design', icon: SiAdobephotoshop },
    { name: 'Node.js', category: 'Backend', icon: SiNodedotjs },
    { name: 'Django', category: 'Backend', icon: SiDjango },
    { name: 'Laravel', category: 'Backend', icon: SiLaravel },
    { name: 'PHP', category: 'Backend', icon: SiPhp },
    { name: 'MongoDB', category: 'Backend', icon: SiMongodb },
    { name: 'PostgreSQL', category: 'Backend', icon: SiPostgresql },
    { name: 'MySQL', category: 'Backend', icon: SiMysql },
    { name: 'Firebase', category: 'Backend', icon: SiFirebase },
    { name: 'Flutter', category: 'Mobile', icon: SiFlutter }
  ];

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Mobile', 'Design'];
  
  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  // Typing animation for greetings
  useEffect(() => {
    const currentGreeting = greetings[currentGreetingIndex];
    let index = 0;

    const interval = setInterval(() => {
      if (index < currentGreeting.length) {
        setDisplayedText(currentGreeting.slice(0, index + 1));
        index++;
      } else {
        const timeout = setTimeout(() => {
          setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
          setDisplayedText('');
        }, 2000);
        clearInterval(interval);
        return () => clearTimeout(timeout);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentGreetingIndex]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api';

        try {
          const [projRes, expRes, eduRes] = await Promise.all([
            fetch(`${apiUrl}/projects`),
            fetch(`${apiUrl}/experiences`),
            fetch(`${apiUrl}/education`)
          ]);

          if (projRes.ok) setProjects(await projRes.json());
          if (expRes.ok) setExperiences(await expRes.json());
          if (eduRes.ok) setEducation(await eduRes.json());
        } catch (err) {
          console.log('Backend not available');
          loadFallbackData();
        }
      } catch (err) {
        console.error('Error:', err);
        loadFallbackData();
      }
    };

    fetchData();
  }, []);

  const loadFallbackData = () => {
    setProjects([
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce with real-time inventory.',
        image: '🛍️',
        tech: ['React', 'Node.js', 'MongoDB'],
        tag: 'Web Application',
        links: { demo: 'https://example.com', github: 'https://github.com' }
      }
    ]);

    setExperiences([
      {
        id: 1,
        title: 'Student Developer – Capstone Project',
        company: 'St. Dominic College of Asia',
        period: 'Oct 2024 – Present',
        bullets: [
          'Co-developed PULSE — a barangay-level mobile application built with Flutter and Firebase, featuring a Material Design UI with custom animations.',
          'Built the SuperAdmin web dashboard using Flutter Web with responsive layouts and data visualization tools to manage admin registrations, verify community credentials, and monitor real-time platform analytics'
        ]
      },
      {
        id: 2,
        title: 'Full-Stack Developer (Personal Projects)',
        company: 'Self-Initiated | Freelance-style builds',
        period: '2024 – Present',
        bullets: [
          'IskedyulKo — Appointment Booking System (React, Node.js, MySQL): Designed a shareable, no-login booking flow with business dashboards, JWT auth, and a responsive UI for small Filipino businesses.',
          'S&Z Hot Pot Haven — E-commerce platform (PHP, MySQL, Bootstrap): Built a product catalog, shopping cart, admin panel, and integrated payment gateway for a local restaurant.'
        ]
      }
    ]);

    setEducation([
      {
        id: 1,
        degree: 'Bachelor of Science in IT',
        school: 'St. Dominic College of Asia',
        period: '2020 - 2024',
        icon: '🎓',
        level: 'Higher Education'
      }
    ]);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className={isDarkMode ? "min-h-screen bg-slate-900 text-white overflow-x-hidden" : "min-h-screen bg-gray-50 text-slate-900 overflow-x-hidden"}>

      <nav className={isDarkMode ? "fixed top-0 w-full z-50 backdrop-blur-sm bg-slate-900/95 border-b border-slate-700" : "fixed top-0 w-full z-50 backdrop-blur-sm bg-white/95 border-b border-slate-200"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold">
              JJL
            </button>

            <div className="hidden md:flex gap-1 items-center">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    activeSection === item.id 
                      ? isDarkMode ? 'bg-white text-slate-900 font-semibold' : 'bg-slate-900 text-white font-semibold'
                      : isDarkMode ? 'hover:bg-slate-800 text-gray-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className={isDarkMode ? "md:hidden pb-4 space-y-2 bg-slate-800/50 rounded-lg p-4" : "md:hidden pb-4 space-y-2 bg-slate-50/80 rounded-lg p-4"}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={isDarkMode ? "block w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition text-gray-300" : "block w-full text-left px-4 py-2 hover:bg-slate-200 rounded-lg transition text-slate-700"}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className={isDarkMode ? "relative min-h-screen flex items-center justify-center pt-20 px-4" : "relative min-h-screen flex items-center justify-center pt-20 px-4"}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-center">
            <div className="space-y-6">
              <h1 className={isDarkMode ? "text-4xl md:text-5xl font-bold" : "text-4xl md:text-5xl font-bold text-slate-900"}>
                Hi, I'm John Jorel T. Landicho
              </h1>
              
              <p className={isDarkMode ? "text-xl font-semibold" : "text-xl font-semibold"}>Full Stack Developer</p>
              
              <p className={isDarkMode ? "text-lg text-gray-300 min-h-12" : "text-lg text-slate-600 min-h-12"}>
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className={isDarkMode ? "px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-200 transition" : "px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition"}
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={isDarkMode ? "px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-slate-900 transition" : "px-8 py-3 border-2 border-slate-900 rounded-full font-semibold hover:bg-slate-900 hover:text-white transition"}
                >
                  Contact
                </button>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={isDarkMode ? "p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition" : "p-3 bg-slate-200 hover:bg-slate-300 rounded-lg transition text-slate-900"}>
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={isDarkMode ? "p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition" : "p-3 bg-slate-200 hover:bg-slate-300 rounded-lg transition text-slate-900"}>
                  <Linkedin size={24} />
                </a>
                <a href="mailto:your.email@example.com" className={isDarkMode ? "p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition" : "p-3 bg-slate-200 hover:bg-slate-300 rounded-lg transition text-slate-900"}>
                  <Mail size={24} />
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <img 
                src="/images/sigekayonapogi.jpg" 
                alt="John Jorel Landicho"
                className={isDarkMode ? "w-80 h-96 object-cover border-2 border-gray-600 rounded-2xl" : "w-80 h-96 object-cover border-2 border-slate-400 rounded-2xl"}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={isDarkMode ? "py-20 px-4 bg-slate-800" : "py-20 px-4 bg-white"}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Skills & Technologies</h2>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                    : isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSkills.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredSkill(idx)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={isDarkMode ? "p-6 bg-slate-800 border border-gray-600 rounded-xl text-center hover:bg-slate-700 transition flex flex-col items-center gap-3 cursor-pointer" : "p-6 bg-white border border-slate-300 rounded-xl text-center hover:bg-slate-50 transition flex flex-col items-center gap-3 cursor-pointer"}
                >
                  {hoveredSkill === idx ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-slate-200 text-slate-700'}`}>{skill.category}</span>
                    </div>
                  ) : (
                    <IconComponent size={32} className={isDarkMode ? "text-gray-300" : "text-slate-700"} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className={isDarkMode ? "py-20 px-4 bg-slate-900" : "py-20 px-4 bg-gray-50"}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Experience</h2>
          <p className={isDarkMode ? "text-center text-gray-400 mb-12" : "text-center text-slate-500 mb-12"}>
            My development journey and project highlights
          </p>

          <div className="relative">
            <div className={isDarkMode ? "absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600" : "absolute left-6 top-0 bottom-0 w-0.5 bg-slate-400"}></div>

            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-16">
                  <div className={isDarkMode ? "absolute left-4 top-2 w-5 h-5 bg-white rounded-full border-4 border-slate-900" : "absolute left-4 top-2 w-5 h-5 bg-slate-900 rounded-full border-4 border-slate-100"}></div>
                  
                  <div className={isDarkMode ? "p-6 bg-slate-800 border border-gray-600 rounded-xl" : "p-6 bg-white border border-slate-300 rounded-xl"}>
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className={isDarkMode ? "text-gray-300 font-medium" : "text-slate-700 font-medium"}>{exp.company}</p>
                    <p className={isDarkMode ? "text-gray-400 text-sm mb-4" : "text-slate-500 text-sm mb-4"}>{exp.period}</p>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className={isDarkMode ? "text-gray-300 text-sm leading-relaxed" : "text-slate-600 text-sm leading-relaxed"}>• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={isDarkMode ? "py-20 px-4 bg-slate-800" : "py-20 px-4 bg-white"}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className={isDarkMode ? "bg-slate-800 border border-gray-600 rounded-xl overflow-hidden hover:border-white transition" : "bg-white border border-slate-300 rounded-xl overflow-hidden hover:border-slate-900 transition"}>
                <div className={isDarkMode ? "h-48 bg-slate-700 flex items-center justify-center text-6xl" : "h-48 bg-slate-200 flex items-center justify-center text-6xl"}>
                  {project.image}
                </div>
                <div className="p-6">
                  <span className={isDarkMode ? "text-xs bg-slate-700 text-white px-3 py-1 rounded-full" : "text-xs bg-slate-200 text-slate-900 px-3 py-1 rounded-full"}>{project.tag}</span>
                  <h3 className="text-xl font-bold mt-3">{project.title}</h3>
                  <p className={isDarkMode ? "text-gray-300 text-sm mt-2" : "text-slate-600 text-sm mt-2"}>{project.description}</p>
                  <div className="flex gap-2 mt-4">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className={isDarkMode ? "text-xs px-2 py-1 bg-slate-700 text-gray-300 rounded" : "text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded"}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={isDarkMode ? "text-white text-sm hover:text-gray-300 underline" : "text-slate-900 text-sm hover:text-slate-600 underline"}>
                      Live
                    </a>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={isDarkMode ? "text-white text-sm hover:text-gray-300 underline" : "text-slate-900 text-sm hover:text-slate-600 underline"}>
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className={isDarkMode ? "py-20 px-4 bg-slate-900" : "py-20 px-4 bg-gray-50"}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Education</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map(edu => (
              <div key={edu.id} className={isDarkMode ? "p-6 bg-slate-800 border border-gray-600 rounded-xl text-center hover:bg-slate-700 transition" : "p-6 bg-white border border-slate-300 rounded-xl text-center hover:bg-slate-50 transition"}>
                <div className="text-5xl mb-4">{edu.icon}</div>
                <p className={isDarkMode ? "text-sm text-gray-400" : "text-sm text-slate-500"}>{edu.period}</p>
                <p className={isDarkMode ? "text-xs text-gray-500 uppercase mt-2" : "text-xs text-slate-400 uppercase mt-2"}>{edu.level}</p>
                <h3 className="text-lg font-bold mt-3">{edu.degree}</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-slate-600"}>{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={isDarkMode ? "py-20 px-4 bg-slate-800" : "py-20 px-4 bg-white"}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className={isDarkMode ? "p-6 bg-slate-800 border border-gray-600 rounded-xl" : "p-6 bg-white border border-slate-300 rounded-xl"}>
                <h3 className="font-bold text-lg">Email</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-slate-600"}>your.email@example.com</p>
              </div>

              <div className={isDarkMode ? "p-6 bg-slate-800 border border-gray-600 rounded-xl" : "p-6 bg-white border border-slate-300 rounded-xl"}>
                <h3 className="font-bold text-lg">Location</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Manila, Philippines</p>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={isDarkMode ? "flex-1 p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700 transition" : "flex-1 p-4 bg-slate-200 rounded-lg text-center hover:bg-slate-300 transition"}>
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={isDarkMode ? "flex-1 p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700 transition" : "flex-1 p-4 bg-slate-200 rounded-lg text-center hover:bg-slate-300 transition"}>
                  LinkedIn
                </a>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className={isDarkMode ? "space-y-4 p-6 bg-slate-800 border border-gray-600 rounded-xl" : "space-y-4 p-6 bg-white border border-slate-300 rounded-xl"}>
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className={isDarkMode ? "w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition" : "w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none transition"}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className={isDarkMode ? "w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition" : "w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none transition"}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="4"
                  className={isDarkMode ? "w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition" : "w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none transition"}
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={isDarkMode ? "w-full px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50" : "w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-50"}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {formStatus === 'success' && <p className="text-green-400 text-center">Message sent!</p>}
              {formStatus === 'error' && <p className="text-red-400 text-center">Failed to send. Try again.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className={isDarkMode ? "border-t border-slate-700 py-8 px-4 text-center text-gray-400 bg-slate-900" : "border-t border-slate-200 py-8 px-4 text-center text-slate-500 bg-gray-50"}>
        <p>© 2025 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}