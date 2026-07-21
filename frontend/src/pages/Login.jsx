import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const { login, error, setError, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    setFormError('');
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setError(null);
    if (!email || !password) { setFormError('Please fill in all fields'); return; }
    try {
      await login(email, password);
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
      >
        {/* Brand */}
        <div className="auth-brand">
          <Link to="/" className="logo-section">
            <GraduationCap className="logo-icon" size={30} />
            <span className="logo-text">Learn<span>More</span></span>
          </Link>
          <h2>Welcome back</h2>
          <p>Sign in to continue your learning journey</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type="password"
                className="form-input has-icon"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
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
              ? <><Loader2 size={18} className="spinner-icon" /> Signing in…</>
              : <>Sign In <ArrowRight size={18} /></>
            }
          </button>
        </form>

        <div className="auth-footer">
          New to LearnMore?{' '}
          <Link to="/register">Create an account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
