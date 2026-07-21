import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap, User, Mail, Lock, BookOpen, UserCheck,
  AlertCircle, Loader2, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'instructor' ? 'instructor' : 'student';

  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [role, setRole]             = useState(initialRole);
  const [formError, setFormError]   = useState('');

  const { register, error, setError, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    setFormError('');
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setError(null);

    if (!name || !email || !password || !confirm) { setFormError('Please fill in all fields'); return; }
    if (password.length < 6) { setFormError('Password must be at least 6 characters'); return; }
    if (password !== confirm) { setFormError('Passwords do not match'); return; }

    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (_err) { /* Error shown via context */ }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ maxWidth: 500 }}
      >
        {/* Brand */}
        <div className="auth-brand">
          <Link to="/" className="logo-section">
            <GraduationCap className="logo-icon" size={30} />
            <span className="logo-text">Learn<span>More</span></span>
          </Link>
          <h2>Create your account</h2>
          <p>Join LearnMore as a student or instructor</p>
        </div>

        {/* Error */}
        {(formError || error) && (
          <motion.div
            className="alert alert-error"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginBottom: '16px' }}
          >
            <AlertCircle size={16} />
            <span>{formError || error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Role Selector */}
          <div className="form-group">
            <label className="form-label">I want to</label>
            <div className="role-selector">
              <div
                className={`role-card ${role === 'student' ? 'active-student' : ''}`}
                onClick={() => setRole('student')}
              >
                <UserCheck className="role-card-icon" size={22} />
                <div>
                  <div className="role-card-title">Learn</div>
                  <div className="role-card-desc">Enroll in courses</div>
                </div>
              </div>
              <div
                className={`role-card ${role === 'instructor' ? 'active-instructor' : ''}`}
                onClick={() => setRole('instructor')}
              >
                <BookOpen className="role-card-icon" size={22} />
                <div>
                  <div className="role-card-title">Teach</div>
                  <div className="role-card-desc">Create courses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full name</label>
            <div className="input-wrap">
              <input
                id="name"
                type="text"
                className="form-input has-icon"
                placeholder="Alex Johnson"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                autoComplete="name"
              />
              <User className="icon" size={17} />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <div className="input-wrap">
              <input
                id="email"
                type="email"
                className="form-input has-icon"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
              <Mail className="icon" size={17} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type="password"
                className="form-input has-icon"
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <Lock className="icon" size={17} />
            </div>
          </div>

          {/* Confirm */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirm">Confirm password</label>
            <div className="input-wrap">
              <input
                id="confirm"
                type="password"
                className="form-input has-icon"
                placeholder="Re-enter password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <Lock className="icon" size={17} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-large"
            disabled={loading}
            style={{ marginTop: '4px' }}
          >
            {loading
              ? <><Loader2 size={18} className="spinner-icon" /> Creating account…</>
              : <>Create Account <ArrowRight size={18} /></>
            }
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
