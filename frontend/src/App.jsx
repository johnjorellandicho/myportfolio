import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Code, Database, Palette, Smartphone, Layers, Server } from 'lucide-react';
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
  SiRedis,
  SiCplusplus,
  SiDart,
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

  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    contact: useRef(null)
  };

  const skillsControls = useAnimation();
  const experienceControls = useAnimation();
  const projectsControls = useAnimation();
  const educationControls = useAnimation();
  const contactControls = useAnimation();
  

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
    { name: 'C++', category: 'Languages', icon: SiCplusplus },
    { name: 'Laravel', category: 'Backend', icon: SiLaravel },
    { name: 'PHP', category: 'Backend', icon: SiPhp },
    { name: 'MongoDB', category: 'Backend', icon: SiMongodb },
    { name: 'PostgreSQL', category: 'Backend', icon: SiPostgresql },
    { name: 'MySQL', category: 'Backend', icon: SiMysql },
    { name: 'Firebase', category: 'Backend', icon: SiFirebase },
    { name: 'Redis', category: 'Backend', icon: SiRedis },
    { name: 'Dart', category: 'Language', icon: SiDart },
    { name: 'Flutter', category: 'Mobile', icon: SiFlutter }
  ];

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Mobile', 'Design'];
  
  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);


  useEffect(() => {
    const currentGreeting = greetings[currentGreetingIndex];
    let index = 0;
    let timeoutId;
    
    const typeCharacter = () => {
      if (index < currentGreeting.length) {
        setDisplayedText(currentGreeting.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeCharacter, 50);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
          setDisplayedText('');
        }, 2000);
      }
    };
    
    typeCharacter();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentGreetingIndex]);

  useEffect(() => {
    loadFallbackData();
  }, []);

  const loadFallbackData = () => {
    setProjects([
      {
        id: 1,
        title: 'AlwaysOnTrack (Capstone)',
        description: 'Mobile IoT tracker app with real-time analytics built using Flutter and Firebase.',
        image: '/images/alwaysontrack.png',
        tech: ['Flutter', 'Firebase', 'IoT', 'MongoDB', 'Node.js'],
        tag: 'Mobile Application',
        github: 'https://github.com/johnjorellandicho/alwaysontrackimpossible',
        demo: 'https://your-live-demo-link.com'

      },
      {
        id: 2,
        title: 'NAMFREL Analytics',
        description: 'Election data analytics platform ensuring system reliability and data accuracy.',
        image: '/images/namfrel.png',
        tech: ['Next.js', 'PowerBI'],
        tag: 'Web Application',
        demo: 'namfrel-analytics-apc.org'
        
      },
      {
        id: 3,
        title: 'ParkSense',
        description: 'Full-stack parking management system integrating hardware sensors, MongoDB, and Redis.',
        image: '/images/parksense.png',
        tech: ['Django', 'MongoDB', 'Redis', 'IoT', 'PostgreSQL'],
        tag: ['IoT System', 'Web Application'],
        github: 'https://github.com/johnjorellandicho/djangofinals',
      },
      {
        id: 4,
        title: 'Bamboo Warriors Philippines Application',
        description: 'Mobile application for Bamboo Warriors Philippines designed to educate and promote bamboo propagation. Features an intuitive interface with seamless navigation and optimized responsiveness across Android devices.',
        image: '/images/bwp.png',
        tech: ['Android Studio', 'XML', 'Java', 'Firebase'],
        tag: 'Mobile Application',
        github: 'https://github.com/tvsayson/MobProg_2nd-year_1st-term.git',
      }
    ]);

    setExperiences([
      {
        id: 1,
        title: 'AlwaysOnTrack Mobile Application (Capstone)',
        company: 'Asia Pacific College',
        period: 'Aug 2025 – Oct 2025',
        bullets: [
          'Led development of real-time tracking and monitoring mobile app with IoT integration.',
          'Ensured accurate data visualization and seamless cross-platform experience.',
          'Architected backend systems and database schema to handle real-time data streams from IoT devices.',
          'Developed core features including notifications, alerts, and chatbot functionality.'
        ]
      },
      {
        id: 2,
        title: 'NAMFREL Analytics Project',
        company: 'Asia Pacific College',
        period: 'May 2025 – Jun 2025',
        bullets: [
          'Served as QA officer ensuring data accuracy and system reliability during the 2025 elections.',
          'Validated analytics results and monitored backend performance under load.'
        ]
      },
      {
        id: 3,
        title: 'ParkSense – Parking Management System',
        company: 'Asia Pacific College',
        period: 'Mar 2024 – Jun 2025',
        bullets: [
          'Served as team leader in the capstone project, Parking Management System, overseeing project planning, task delegation, and coordination between hardware and software teams.',
          'Stored and managed data with MongoDB, with Redis acting as a change-tracking layer.',
          'Enabled authenticated users to view available slots, with admins granted access to analytics and full system controls.',
        ]
      },
      {
        id: 4,
        title: 'Mobile Application Developer - Bamboo Warriors Philippines',
        company: 'Asia Pacific College',
        period: 'Sept 2023 – Nov 2023',
        bullets: [
          'Designed a user-friendly interface for the Bamboo Verse app using Figma, focusing on intuitive navigation and clean aesthetics.',
          'Developed and implemented app functionality using Android Studio, ensuring stable performance across key features.',
          'Optimized UI/UX for responsiveness, providing seamless user experience across various screen sizes and Android devices.'
        ]
      }
    ]);

    setEducation([
      {
        id: 1,
        degree: 'Bachelor of Science in Information Technology',
        school: 'Asia Pacific College',
        period: 'Aug 2022 – Present',
        icon: '/images/cropped-APC_Seal-Official-scaled.png',
        level: 'College',
        gwa: '(Tentative)'

      },
      {
        id: 2,
        degree: 'TECHVOC-ICT',
        school: 'Signal Village National High School',
        period: '2020 – 2022',
        icon: '/images/svnhs.png',
        level: 'Senior High School',
        gwa: '95'

      }
    ]);
  };

  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + 200;
    for (const key in sectionRefs) {
      const section = sectionRefs[key].current;
      if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        setActiveSection(key);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id) => {
    const section = sectionRefs[id].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    
    const skillsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) skillsControls.start({ opacity: 1, y: 0 });
      else skillsControls.start({ opacity: 0, y: 60 });
    }, observerOptions);

    const experienceObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) experienceControls.start({ opacity: 1, y: 0 });
      else experienceControls.start({ opacity: 0, y: 60 });
    }, observerOptions);

    const projectsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) projectsControls.start({ opacity: 1, y: 0 });
      else projectsControls.start({ opacity: 0, y: 60 });
    }, observerOptions);

    const educationObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) educationControls.start({ opacity: 1, y: 0 });
      else educationControls.start({ opacity: 0, y: 60 });
    }, observerOptions);

    const contactObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) contactControls.start({ opacity: 1, y: 0 });
      else contactControls.start({ opacity: 0, y: 60 });
    }, observerOptions);

    if (sectionRefs.skills.current) skillsObserver.observe(sectionRefs.skills.current);
    if (sectionRefs.experience.current) experienceObserver.observe(sectionRefs.experience.current);
    if (sectionRefs.projects.current) projectsObserver.observe(sectionRefs.projects.current);
    if (sectionRefs.education.current) educationObserver.observe(sectionRefs.education.current);
    if (sectionRefs.contact.current) contactObserver.observe(sectionRefs.contact.current);

    return () => {
      skillsObserver.disconnect();
      experienceObserver.disconnect();
      projectsObserver.disconnect();
      educationObserver.disconnect();
      contactObserver.disconnect();
    };
  }, [skillsControls, experienceControls, projectsControls, educationControls, contactControls]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
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
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <nav className={`fixed top-0 w-full z-50 border-b transition-colors ${isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <button onClick={() => scrollToSection('home')} className="text-2xl font-bold">JJL</button>
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg transition ${
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
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg">{isDarkMode ? '☀️' : '🌙'}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </nav>

      {/* HOME */}
      <section ref={sectionRefs.home} id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">Hi, I'm John Jorel T. Landicho</h1>
            <p className="text-xl font-semibold">Web and Mobile Developer</p>
            <p className="text-lg min-h-12">{displayedText}<span className="animate-pulse">|</span></p>
            <div className="flex gap-4">
              <button 
                aria-label="GitHub" 
                onClick={() => window.open('https://github.com/johnjorellandicho', '_blank')}
                className={`p-3 rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                <Github size={24} />
              </button>
              <button 
                aria-label="LinkedIn" 
                onClick={() => window.open('https://www.linkedin.com/in/jtlandicho/', '_blank')}
                className={`p-3 rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                <Linkedin size={24} />
              </button>
              <button 
                aria-label="Email" 
                onClick={() => window.location.href = 'mailto:johnjorel.landicho8@gmail.com'}
                className={`p-3 rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                <Mail size={24} />
              </button>
              <a 
                href="/JohnJorel_CV.pdf" 
                download 
                className={`inline-block px-6 py-3 rounded-lg font-semibold transition ${isDarkMode ? 'bg-white text-slate-900 hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex justify-end">
            <img 
              src="/images/sigekayonapogi.jpg" 
              alt="Developer"
              className="w-80 h-96 rounded-2xl object-cover border-2"
            />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <motion.section ref={sectionRefs.skills} id="skills" initial={{ opacity: 0, y: 60 }} animate={skillsControls} transition={{ duration: 0.8 }} className={`py-20 px-4 pt-32 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(category => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full font-semibold transition ${selectedCategory === category ? isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white' : isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{category}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSkills.map((skill, idx) => {
              const Icon = skill.icon;  // Use the icon directly from skillsData
              return (
                <motion.div key={idx} onMouseEnter={() => setHoveredSkill(idx)} onMouseLeave={() => setHoveredSkill(null)} whileHover={{ scale: 1.05 }} className={`p-6 border rounded-xl flex flex-col items-center gap-3 cursor-pointer transition relative z-10 ${isDarkMode ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' : 'bg-gray-50 border-slate-200 hover:bg-gray-100'}`}>
                  {hoveredSkill === idx ? (
                    <div className={`text-center absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 rounded-lg whitespace-nowrap z-20 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'}`}>
                      <span className="text-sm font-medium block">{skill.name}</span>
                      <span className="text-xs block mt-1 opacity-80">{skill.category}</span>
                      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-800'}`} style={{clipPath: 'polygon(0 0, 100% 0, 50% 100%)'}}></div>
                    </div>
                  ) : null}
                  <Icon size={32} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section ref={sectionRefs.experience} id="experience" initial={{ opacity: 0, y: 60 }} animate={experienceControls} transition={{ duration: 0.8 }} className={`py-20 px-4 pt-32 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          <div className="relative">
            <div className={`absolute left-8 top-0 bottom-0 w-1 ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={experienceControls} transition={{ delay: idx * 0.1 }} className="relative pl-32">
                  <div className={`absolute left-0 top-2 w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'} border-4 ${isDarkMode ? 'border-slate-900' : 'border-gray-50'}`}>
                    <span className="text-xl font-bold">●</span>
                  </div>
                  <div className={`p-6 border rounded-xl ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{exp.company}</p>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section ref={sectionRefs.projects} id="projects" initial={{ opacity: 0, y: 60 }} animate={projectsControls} transition={{ duration: 0.8 }} className={`py-20 px-4 pt-32 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-6 w-fit">
            {projects.map((project, idx) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={projectsControls} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }} className={`border rounded-xl overflow-hidden transition ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-slate-200'}`}>
               <div className={`h-48 flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'}`}>{project.tag}</span>
                <h3 className="text-xl font-bold mt-3">{project.title}</h3>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{project.description}</p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-slate-200 text-slate-700'}`}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Live</a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Code</a>
                </div>
              </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section ref={sectionRefs.education} id="education" initial={{ opacity: 0, y: 60 }} animate={educationControls} transition={{ duration: 0.8 }} className={`py-20 px-4 pt-32 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-6 w-fit">
              {education.map(edu => (
              <motion.div key={edu.id} whileHover={{ scale: 1.05 }} className={`p-6 border rounded-xl text-center ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200'}`}>
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  {edu.icon.startsWith('/') ? (
                    <img src={edu.icon} alt={edu.school} className="w-full h-full object-cover" />
                  ) : (
                    edu.icon
                  )}
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{edu.period}</p>
                <p className={`text-xs uppercase mt-2 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{edu.level}</p>
                {edu.gwa && <p className={`text-sm font-semibold mt-3 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>GWA: {edu.gwa}</p>}
                <h3 className="text-lg font-bold mt-3">{edu.degree}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{edu.school}</p>
              </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section ref={sectionRefs.contact} id="contact" initial={{ opacity: 0, y: 60 }} animate={contactControls} transition={{ duration: 0.8 }} className={`py-20 px-4 pt-32 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className={`p-6 border rounded-xl ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-slate-200'}`}>
                <h3 className="font-bold text-lg">Email</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>jtlandicho@student.apc.edu.ph</p>
              </div>
              <div className={`p-6 border rounded-xl ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-slate-200'}`}>
                <h3 className="font-bold text-lg">Location</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Taguig City, Manila, Philippines</p>
              </div>
            </div>
            <div className={`space-y-4 p-6 border rounded-xl ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-slate-200'}`}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleFormChange} className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleFormChange} className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} rows="4" className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
              </div>
              <button onClick={handleFormSubmit} className={`w-full px-6 py-3 rounded-lg font-semibold transition ${isDarkMode ? 'bg-white text-slate-900 hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>{formStatus === 'sending' ? 'Sending...' : 'Send Message'}              </button>
              {formStatus === 'success' && <p className="text-green-400 text-center">Message sent!</p>}
            </div>
          </div>
        </div>
      </motion.section>

      <footer className={`border-t py-8 px-4 text-center ${isDarkMode ? 'border-slate-700 bg-slate-900 text-gray-400' : 'border-slate-200 bg-gray-50 text-slate-600'}`}>
        <p>© 2025 John Jorel T. Landicho. All rights reserved.</p>
      </footer>
    </div>
  );
}