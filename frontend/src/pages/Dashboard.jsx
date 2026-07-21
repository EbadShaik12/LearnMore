import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, LogOut, BookOpen, Clock, Award,
  TrendingUp, Users, DollarSign, Star, Plus, FileText,
  Settings, Search, Download, Upload, CheckCircle2, X,
  Shield, User, Mail, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─── tiny helpers ─── */
const pill = (type) => {
  const map = { PDF: 'pill-pdf', PPTX: 'pill-pptx', ZIP: 'pill-zip', DOCX: 'pill-docx' };
  return map[type] || 'pill-pdf';
};

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses',   label: 'My Learning', instructorLabel: 'My Courses', icon: BookOpen },
  { id: 'documents', label: 'Materials',   icon: FileText },
  { id: 'settings',  label: 'Settings',    icon: Settings },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab]     = useState('dashboard');
  const [toast, setToast] = useState(null);

  const [courseSearch, setCourseSearch] = useState('');
  const [docSearch,    setDocSearch]    = useState('');

  const [showModal, setShowModal]         = useState(false);
  const [newCourseTitle, setNewCourseTitle]     = useState('');
  const [newCourseCat,   setNewCourseCat]       = useState('Coding');

  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType,  setNewDocType]  = useState('PDF');

  const [profileName,      setProfileName]      = useState(user?.name  || '');
  const [profileEmail,     setProfileEmail]     = useState(user?.email || '');
  const [notifyEmail,      setNotifyEmail]      = useState(true);
  const [notifyAnnounce,   setNotifyAnnounce]   = useState(true);

  const [studentCourses, setStudentCourses] = useState([
    { id: 1, title: 'Introduction to Full-Stack Web Development', category: 'Coding',      progress: 75, instructor: 'Dr. Sarah Jenkins' },
    { id: 2, title: 'UI/UX Design Systems & Micro-animations',    category: 'Design',      progress: 92, instructor: 'Marcus Cole'       },
    { id: 3, title: 'Advanced Machine Learning with Python',       category: 'Data Science', progress: 18, instructor: 'Prof. Alan Turing' },
  ]);

  const [catalogCourses, setCatalogCourses] = useState([
    { id: 4, title: 'Data Structures & Algorithms',     category: 'Coding',        instructor: 'Dr. Sarah Jenkins' },
    { id: 5, title: 'Introduction to Cyber Security',   category: 'Cyber Security', instructor: 'Bruce Wayne'       },
    { id: 6, title: 'Product Management Fundamentals',  category: 'Business',      instructor: 'Steve Jobs'        },
  ]);

  const [instructorCourses, setInstructorCourses] = useState([
    { id: 1, title: 'Mastering React 19 & Next.js',           category: 'Web Dev',          students: 320, rating: 4.9 },
    { id: 2, title: 'Data Structures & Algorithms for Beginners', category: 'Computer Science', students: 192, rating: 4.8 },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, title: 'Syllabus & Lecture Schedule',       type: 'PDF',  size: '1.2 MB', date: 'Jul 10, 2026' },
    { id: 2, title: 'Introduction to React 19 Slides',  type: 'PPTX', size: '4.5 MB', date: 'Jul 12, 2026' },
    { id: 3, title: 'HTML5/CSS3 Cheat Sheet',            type: 'PDF',  size: '850 KB', date: 'Jul 15, 2026' },
    { id: 4, title: 'Project Starter Files',             type: 'ZIP',  size: '2.3 MB', date: 'Jul 18, 2026' },
  ]);

  const isInstructor = user?.role === 'instructor';
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  /* helpers */
  const toast$ = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const enrollInCourse = (c) => {
    setStudentCourses(prev => [...prev, { ...c, progress: 0 }]);
    setCatalogCourses(prev => prev.filter(x => x.id !== c.id));
    toast$(`Enrolled in "${c.title}"!`);
  };

  const createCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) { toast$('Please enter a course title', 'error'); return; }
    const c = { id: Date.now(), title: newCourseTitle, category: newCourseCat, students: 0, rating: 5.0 };
    setInstructorCourses(prev => [c, ...prev]);
    setNewCourseTitle('');
    setShowModal(false);
    toast$(`"${c.title}" published!`);
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    if (!newDocTitle.trim()) { toast$('Please enter a document title', 'error'); return; }
    const d = { id: Date.now(), title: newDocTitle, type: newDocType, size: '—', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    setMaterials(prev => [d, ...prev]);
    setNewDocTitle('');
    toast$(`"${d.title}" uploaded!`);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    toast$('Profile updated successfully!');
  };

  /* animation */
  const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

  /* student stats */
  const studentStats = [
    { label: 'Enrolled',       value: studentCourses.length, icon: BookOpen,  color: 'icon-indigo' },
    { label: 'Study Hours',    value: '28.5 hrs',            icon: Clock,     color: 'icon-cyan'   },
    { label: 'Completed',      value: '1',                   icon: Award,     color: 'icon-green'  },
  ];
  const instructorStats = [
    { label: 'Active Courses',  value: instructorCourses.length,                                        icon: BookOpen,  color: 'icon-indigo'  },
    { label: 'Total Students',  value: instructorCourses.reduce((a, c) => a + c.students, 0),           icon: Users,     color: 'icon-cyan'    },
    { label: 'Earnings',        value: '$4,850',                                                        icon: DollarSign, color: 'icon-green'   },
    { label: 'Avg Rating',      value: '4.9 ★',                                                         icon: Star,      color: 'icon-amber'   },
  ];
  const stats = isInstructor ? instructorStats : studentStats;

  const tabLabel = (t) => t.id === 'courses'
    ? (isInstructor ? (t.instructorLabel || t.label) : t.label)
    : t.label;

  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div className="dashboard-layout">

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{    opacity: 0, y: -20, scale: 0.95 }}
          >
            <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-section">
            <GraduationCap className="logo-icon" size={26} />
            <span className="logo-text" style={{ fontSize: '1.25rem' }}>Learn<span>More</span></span>
          </div>
        </div>

        <span className="sidebar-section-label">Menu</span>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={`nav-link ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icon size={18} />
                <span>{tabLabel(t)}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{avatarLetter}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{user?.role || 'student'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={17} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="dashboard-main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left">
            <h1>
              {tab === 'dashboard'  && `Hello, ${user?.name?.split(' ')[0] || 'there'} 👋`}
              {tab === 'courses'    && (isInstructor ? 'My Courses' : 'My Learning')}
              {tab === 'documents' && 'Materials'}
              {tab === 'settings'  && 'Settings'}
            </h1>
            <p>
              {tab === 'dashboard'  && 'Here\'s what\'s happening today.'}
              {tab === 'courses'    && (isInstructor ? 'Manage and track your published courses.' : 'Your enrolled courses and catalog.')}
              {tab === 'documents' && 'Learning materials and resources.'}
              {tab === 'settings'  && 'Manage your account and preferences.'}
            </p>
          </div>
          <div className="topbar-right">
            <span className={`role-badge ${isInstructor ? 'badge-instructor' : 'badge-student'}`}>
              {user?.role || 'student'}
            </span>
            <div className="topbar-avatar">{avatarLetter}</div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className="page-content">
          <AnimatePresence mode="wait">

            {/* ═══════════════ DASHBOARD TAB ═══════════════ */}
            {tab === 'dashboard' && (
              <motion.div key="dashboard" variants={fadeUp} initial="hidden" animate="visible">
                {/* Stats */}
                <div className="stats-grid">
                  {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={i}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className={`stat-icon ${s.color}`}><Icon size={22} /></div>
                        <div className="stat-body">
                          <span className="stat-label">{s.label}</span>
                          <span className="stat-value">{s.value}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Two column layout */}
                <div className="two-col">
                  <div className="panel">
                    <div className="panel-header">
                      <h2>{isInstructor ? 'Created Courses' : 'In-Progress'}</h2>
                      {isInstructor
                        ? <button className="btn btn-primary btn-small" onClick={() => setShowModal(true)}><Plus size={15} /> New Course</button>
                        : <button className="btn btn-secondary btn-small" onClick={() => setTab('courses')}>Browse Catalog</button>
                      }
                    </div>
                    <div className="panel-body">
                      <div className="course-list">
                        {(isInstructor ? instructorCourses : studentCourses).slice(0, 3).map((c, i) => (
                          <div key={i} className="course-item">
                            <div className="course-item-icon">{c.title.charAt(0)}</div>
                            <div className="course-item-body">
                              <div className="course-category">{c.category}</div>
                              <div className="course-title">{c.title}</div>
                              {!isInstructor && (
                                <div className="prog-wrap">
                                  <div className="prog-bar-bg">
                                    <div className="prog-bar-fill" style={{ width: `${c.progress}%` }} />
                                  </div>
                                  <div className="prog-text">{c.progress}% complete</div>
                                </div>
                              )}
                              {isInstructor && (
                                <div className="course-instructor">{c.students} students · ★ {c.rating}</div>
                              )}
                            </div>
                            <div className="course-item-actions">
                              {isInstructor
                                ? <button className="btn btn-outline btn-small" onClick={() => toast$(`Opening "${c.title}"...`)}>Manage</button>
                                : <button className="btn btn-primary btn-small" onClick={() => toast$(`Resuming "${c.title}"...`)}>Continue</button>
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-header"><h2>Announcements</h2></div>
                    <div className="panel-body">
                      <div className="announce-list">
                        <div className="announce-item">
                          <div className="announce-date">Jul 18, 2026</div>
                          <div className="announce-title">Server Maintenance Window</div>
                          <div className="announce-body">Scheduled maintenance tonight 02:00–04:00 UTC. Brief downtime expected.</div>
                        </div>
                        <div className="announce-item">
                          <div className="announce-date">Jul 12, 2026</div>
                          <div className="announce-title">Welcome to LearnMore v1.0!</div>
                          <div className="announce-body">Start enrolling in courses or publishing your own curriculum today.</div>
                        </div>
                        <div className="announce-item">
                          <div className="announce-date">Jul 5, 2026</div>
                          <div className="announce-title">New AI Recommendations</div>
                          <div className="announce-body">Personalized course suggestions are now live based on your learning history.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══════════════ COURSES TAB ═══════════════ */}
            {tab === 'courses' && (
              <motion.div key="courses" variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {/* toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div className="search-wrap">
                    <Search className="search-icon" size={17} />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search courses…"
                      value={courseSearch}
                      onChange={e => setCourseSearch(e.target.value)}
                    />
                  </div>
                  {isInstructor && (
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                      <Plus size={17} /> New Course
                    </button>
                  )}
                </div>

                {/* student: enrolled */}
                {!isInstructor && (
                  <>
                    <div className="panel">
                      <div className="panel-header"><h2>Enrolled Courses</h2></div>
                      <div className="panel-body">
                        <div className="course-list">
                          {studentCourses
                            .filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()))
                            .map((c, i) => (
                              <div key={i} className="course-item">
                                <div className="course-item-icon">{c.title.charAt(0)}</div>
                                <div className="course-item-body">
                                  <div className="course-category">{c.category}</div>
                                  <div className="course-title">{c.title}</div>
                                  <div className="course-instructor">by {c.instructor}</div>
                                  <div className="prog-wrap">
                                    <div className="prog-bar-bg">
                                      <div className="prog-bar-fill" style={{ width: `${c.progress}%` }} />
                                    </div>
                                    <div className="prog-text">{c.progress}% complete</div>
                                  </div>
                                </div>
                                <button className="btn btn-primary btn-small" onClick={() => toast$(`Resuming "${c.title}"...`)}>Continue</button>
                              </div>
                            ))}
                          {studentCourses.filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase())).length === 0 && (
                            <p style={{ color: 'var(--tx-3)', padding: '12px 0', fontSize: '0.9rem' }}>No courses match your search.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* catalog */}
                    {catalogCourses.length > 0 && (
                      <div className="panel">
                        <div className="panel-header"><h2>Explore Catalog</h2></div>
                        <div className="panel-body">
                          <div className="catalog-grid">
                            {catalogCourses
                              .filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()))
                              .map((c, i) => (
                                <div key={i} className="catalog-card">
                                  <div className="catalog-card-body">
                                    <div className="course-category">{c.category}</div>
                                    <div className="course-title" style={{ marginTop: 6, fontSize: '1rem', whiteSpace: 'normal' }}>{c.title}</div>
                                    <div className="course-instructor" style={{ marginTop: 6 }}>by {c.instructor}</div>
                                  </div>
                                  <div className="catalog-card-footer">
                                    <span style={{ fontSize: '0.82rem', color: 'var(--tx-3)' }}>Free Enrollment</span>
                                    <button className="btn btn-primary btn-small" onClick={() => enrollInCourse(c)}>Enroll</button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* instructor: course list */}
                {isInstructor && (
                  <div className="panel">
                    <div className="panel-header"><h2>Published Courses</h2></div>
                    <div className="panel-body">
                      <div className="course-list">
                        {instructorCourses
                          .filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()))
                          .map((c, i) => (
                            <div key={i} className="course-item">
                              <div className="course-item-icon">{c.title.charAt(0)}</div>
                              <div className="course-item-body">
                                <div className="course-category">{c.category}</div>
                                <div className="course-title">{c.title}</div>
                                <div className="course-instructor">{c.students} students · ★ {c.rating}</div>
                              </div>
                              <div className="course-item-actions">
                                <button className="btn btn-outline btn-small" onClick={() => toast$(`Opening editor...`)}>Edit</button>
                                <button className="btn btn-secondary btn-small" onClick={() => toast$(`Viewing roster...`)}>Students</button>
                              </div>
                            </div>
                          ))}
                        {instructorCourses.length === 0 && (
                          <p style={{ color: 'var(--tx-3)', padding: '12px 0', fontSize: '0.9rem' }}>No courses yet. Create your first!</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════════════ DOCUMENTS TAB ═══════════════ */}
            {tab === 'documents' && (
              <motion.div key="documents" variants={fadeUp} initial="hidden" animate="visible">
                <div className="two-col">
                  {/* LEFT: table */}
                  <div className="panel">
                    <div className="panel-header">
                      <h2>Shared Files</h2>
                      <div className="search-wrap">
                        <Search className="search-icon" size={15} />
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search…"
                          value={docSearch}
                          onChange={e => setDocSearch(e.target.value)}
                          style={{ width: 180 }}
                        />
                      </div>
                    </div>
                    <div className="table-wrap" style={{ margin: 0, borderRadius: 0, border: 'none', borderTop: '1px solid var(--bd-1)' }}>
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Date</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {materials
                            .filter(m => m.title.toLowerCase().includes(docSearch.toLowerCase()))
                            .map((m, i) => (
                              <tr key={i}>
                                <td>
                                  <div className="file-info">
                                    <div className="file-icon"><FileText size={17} /></div>
                                    <div>
                                      <div className="file-name">{m.title}</div>
                                    </div>
                                  </div>
                                </td>
                                <td><span className={`badge-pill ${pill(m.type)}`}>{m.type}</span></td>
                                <td><span className="file-meta">{m.size}</span></td>
                                <td><span className="file-meta">{m.date}</span></td>
                                <td>
                                  <button className="btn btn-ghost btn-xs" onClick={() => toast$(`Downloading "${m.title}"...`)}>
                                    <Download size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {materials.filter(m => m.title.toLowerCase().includes(docSearch.toLowerCase())).length === 0 && (
                            <tr>
                              <td colSpan={5} style={{ color: 'var(--tx-3)', textAlign: 'center', padding: '24px' }}>No files found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RIGHT: upload or stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {isInstructor ? (
                      <div className="panel">
                        <div className="panel-header"><h2>Upload File</h2></div>
                        <div className="panel-body">
                          <form onSubmit={uploadDoc} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="form-group">
                              <label className="form-label">Document Title</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Lecture 3 Slides"
                                value={newDocTitle}
                                onChange={e => setNewDocTitle(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Format</label>
                              <select className="form-select" value={newDocType} onChange={e => setNewDocType(e.target.value)}>
                                <option value="PDF">PDF Document</option>
                                <option value="PPTX">PowerPoint Presentation</option>
                                <option value="ZIP">ZIP Archive</option>
                                <option value="DOCX">Word Document</option>
                              </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-full">
                              <Upload size={16} /> Upload Material
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="panel">
                        <div className="panel-header"><h2>My Progress</h2></div>
                        <div className="panel-body">
                          <div>
                            <div className="settings-stat-row"><span className="settings-stat-label">Attendance</span><span className="settings-stat-value">96%</span></div>
                            <div className="settings-stat-row"><span className="settings-stat-label">Submitted Assignments</span><span className="settings-stat-value">4 / 4</span></div>
                            <div className="settings-stat-row"><span className="settings-stat-label">Active Quizzes</span><span className="settings-stat-value" style={{ color: 'var(--brand-primary)' }}>1 Available</span></div>
                            <div className="settings-stat-row" style={{ borderBottom: 'none' }}><span className="settings-stat-label">Certificates Earned</span><span className="settings-stat-value">1</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══════════════ SETTINGS TAB ═══════════════ */}
            {tab === 'settings' && (
              <motion.div key="settings" variants={fadeUp} initial="hidden" animate="visible">
                <div className="settings-layout">
                  <div className="settings-section">

                    {/* Profile */}
                    <div className="settings-panel">
                      <div className="settings-panel-header">
                        <div className={`settings-panel-icon icon-indigo`}><User size={18} /></div>
                        <h3>Profile Details</h3>
                      </div>
                      <div className="settings-panel-body">
                        <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                          <div className="form-group">
                            <label className="form-label">Display Name</label>
                            <div className="input-wrap">
                              <input type="text" className="form-input has-icon" value={profileName} onChange={e => setProfileName(e.target.value)} />
                              <User className="icon" size={16} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrap">
                              <input type="email" className="form-input has-icon" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
                              <Mail className="icon" size={16} />
                            </div>
                          </div>
                          <div>
                            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Save Changes</button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="settings-panel">
                      <div className="settings-panel-header">
                        <div className="settings-panel-icon icon-cyan"><TrendingUp size={18} /></div>
                        <h3>Notifications</h3>
                      </div>
                      <div className="settings-panel-body">
                        <div className="toggle-row">
                          <div className="toggle-info">
                            <h4>Email Notifications</h4>
                            <p>Grades, messages, and course updates sent to your inbox.</p>
                          </div>
                          <label className="switch">
                            <input type="checkbox" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} />
                            <span className="slider" />
                          </label>
                        </div>
                        <div className="toggle-row">
                          <div className="toggle-info">
                            <h4>System Announcements</h4>
                            <p>Maintenance windows and platform news.</p>
                          </div>
                          <label className="switch">
                            <input type="checkbox" checked={notifyAnnounce} onChange={e => setNotifyAnnounce(e.target.checked)} />
                            <span className="slider" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="settings-section">
                    <div className="settings-panel">
                      <div className="settings-panel-header">
                        <div className="settings-panel-icon icon-green"><Shield size={18} /></div>
                        <h3>Account Security</h3>
                      </div>
                      <div className="settings-panel-body">
                        <div>
                          <div className="settings-stat-row">
                            <span className="settings-stat-label">Role</span>
                            <span className="settings-stat-value" style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                          </div>
                          <div className="settings-stat-row">
                            <span className="settings-stat-label">Token Expiry</span>
                            <span className="settings-stat-value">30 days</span>
                          </div>
                          <div className="settings-stat-row" style={{ borderBottom: 'none' }}>
                            <span className="settings-stat-label">Protocol</span>
                            <span className="settings-stat-value" style={{ color: 'var(--green)' }}>JWT HS256 ✓</span>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-full btn-small" onClick={() => toast$('Password reset email sent!')}>
                          Change Password
                        </button>
                        <button className="btn btn-danger btn-full btn-small" onClick={handleLogout}>
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── CREATE COURSE MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0   }}
              exit={{    opacity: 0, scale: 0.94, y: 16  }}
            >
              <div className="modal-header">
                <h2>Publish New Course</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={createCourse} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Mastering React 19"
                    value={newCourseTitle}
                    onChange={e => setNewCourseTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={newCourseCat} onChange={e => setNewCourseCat(e.target.value)}>
                    <option value="Coding">Coding / Web Development</option>
                    <option value="Design">Design & UI/UX</option>
                    <option value="Data Science">Data Science & ML</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Business">Business Strategy</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Publish Course</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
