const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ DATA ============

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with real-time inventory, secure payment processing, and comprehensive admin dashboard.',
    image: '🛍️',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    tag: 'Web Application',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team features, and beautiful animations.',
    image: '📱',
    tech: ['Flutter', 'Firebase', 'Dart'],
    tag: 'Mobile App',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'ML-powered content generation tool that creates high-quality content instantly with custom parameters.',
    image: '🤖',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    tag: 'AI Tool',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts, data visualization, and custom reporting.',
    image: '📊',
    tech: ['React', 'D3.js', 'PostgreSQL', 'Express'],
    tag: 'Web Application',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  },
  {
    id: 5,
    title: 'Social Media API',
    description: 'RESTful API for social media platform with authentication, real-time notifications, and database optimization.',
    image: '🌐',
    tech: ['Node.js', 'PostgreSQL', 'JWT', 'Redis'],
    tag: 'Backend',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  },
  {
    id: 6,
    title: 'Design System',
    description: 'Comprehensive design system with reusable components, documentation, and accessibility standards.',
    image: '🎨',
    tech: ['React', 'Storybook', 'Tailwind CSS'],
    tag: 'Web Application',
    links: { demo: 'https://example.com', github: 'https://github.com' }
  }
];

const experiences = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    period: 'Jan 2023 - Present',
    bullets: [
      'Led a team of 5 developers in building scalable web applications',
      'Improved application performance by 40% through optimization techniques',
      'Mentored junior developers and conducted comprehensive code reviews',
      'Architected microservices infrastructure reducing deployment time by 60%'
    ]
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: 'Jun 2021 - Dec 2022',
    bullets: [
      'Built 15+ production web applications using React and Node.js',
      'Implemented RESTful APIs and real-time features with WebSockets',
      'Collaborated with UX/UI team to deliver pixel-perfect designs',
      'Increased database query efficiency by 50% through optimization'
    ]
  },
  {
    id: 3,
    title: 'Junior Developer',
    company: 'StartUp Hub',
    period: 'Jan 2020 - May 2021',
    bullets: [
      'Developed and maintained frontend components using React',
      'Contributed to database optimization and API improvements',
      'Participated in agile development and sprint planning',
      'Fixed 100+ bugs and implemented new features based on user feedback'
    ]
  }
];

const skills = [
  'JavaScript',
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'Python',
  'HTML/CSS',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
  'Git',
  'Docker',
  'AWS',
  'Firebase',
  'REST APIs',
  'GraphQL'
];

const education = [
  {
    id: 1,
    degree: 'Bachelor of Science in Information Technology',
    school: 'St. Dominic College of Asia',
    period: '2020 - 2024',
    icon: '🎓',
    level: 'Higher Education'
  },
  {
    id: 2,
    degree: 'AWS Solutions Architect Associate',
    school: 'Amazon Web Services',
    period: '2023',
    icon: '📜',
    level: 'Professional Certification'
  },
  {
    id: 3,
    degree: 'React Advanced Patterns',
    school: 'Epic React by Kent C. Dodds',
    period: '2022',
    icon: '🏆',
    level: 'Professional Certification'
  }
];

// ============ API ROUTES ============

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/experiences', (req, res) => {
  res.json(experiences);
});

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.get('/api/education', (req, res) => {
  res.json(education);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('==========================================');
  console.log('🚀 Portfolio Server Running');
  console.log('📍 http://localhost:' + PORT);
  console.log('✅ Ready to receive requests');
  console.log('==========================================');
  console.log('');
});