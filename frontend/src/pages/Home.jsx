import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, GraduationCap, Compass, ArrowRight,
  ShieldCheck, Cpu, Users, TrendingUp, Star, Zap
} from 'lucide-react';

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] }
    })
  };

  const features = [
    {
      icon: <Compass size={22} />,
      color: 'icon-cyan',
      title: 'Explore & Discover',
      desc: 'Access hundreds of expert-curated courses across software engineering, AI, design, and business.'
    },
    {
      icon: <BookOpen size={22} />,
      color: 'icon-indigo',
      title: 'Expert-Led Instruction',
      desc: 'Learn from industry professionals using interactive course builders, quizzes, and live assessments.'
    },
    {
      icon: <ShieldCheck size={22} />,
      color: 'icon-purple',
      title: 'Verified Credentials',
      desc: 'Earn cryptographically signed certificates that validate and showcase your professional expertise.'
    },
    {
      icon: <TrendingUp size={22} />,
      color: 'icon-green',
      title: 'Progress Analytics',
      desc: 'Track your learning journey with detailed insights, streaks, and milestone achievements.'
    },
    {
      icon: <Users size={22} />,
      color: 'icon-amber',
      title: 'Community & Mentorship',
      desc: 'Connect with peers, mentors, and industry leaders through a vibrant learning community.'
    },
    {
      icon: <Zap size={22} />,
      color: 'icon-indigo',
      title: 'AI-Powered Learning',
      desc: 'Personalized recommendations powered by AI that adapt to your learning style and goals.'
    }
  ];

  return (
    <div className="landing-page">
      {/* NAV */}
      <motion.nav
        className="landing-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo-section">
          <GraduationCap className="logo-icon" size={30} />
          <span className="logo-text">Learn<span>More</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/login" className="btn btn-ghost">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="hero-section">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <Cpu size={12} /> Next-Generation LMS Platform
          </div>
        </motion.div>

        <motion.h1 className="hero-title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          Map your knowledge with{' '}
          <span className="text-gradient">LearnMore</span>
        </motion.h1>

        <motion.p className="hero-subtitle" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          An advanced, intuitive ecosystem for learning — empowering instructors to create immersive courses and students to build career-defining skills.
        </motion.p>

        <motion.div className="hero-actions" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <Link to="/register?role=student" className="btn btn-primary btn-large">
            Join as Student <ArrowRight size={18} />
          </Link>
          <Link to="/register?role=instructor" className="btn btn-outline btn-large">
            Teach on LearnMore
          </Link>
        </motion.div>

        <motion.div className="hero-stats" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <div className="hero-stat">
            <span className="hero-stat-value">25K+</span>
            <span className="hero-stat-label">Students</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">800+</span>
            <span className="hero-stat-label">Courses</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">4.9</span>
            <span className="hero-stat-label">
              <Star size={11} style={{ display: 'inline', marginRight: 3 }} />
              Rating
            </span>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">Why LearnMore</span>
          <h2 className="section-heading">Everything you need to learn<br />& grow faster</h2>
          <p className="section-sub">
            Built for the modern learner — seamless, powerful, and beautifully designed.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8 }}
            >
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <Link to="/" className="logo-section">
          <GraduationCap className="logo-icon" size={22} />
          <span className="logo-text" style={{ fontSize: '1.1rem' }}>Learn<span>More</span></span>
        </Link>
        <p>&copy; {new Date().getFullYear()} LearnMore LMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
