import React, { useState, useEffect } from 'react';
import { Search, Menu, X, GraduationCap, Bell, Plus, Check, CheckCheck } from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

// Create Notification Form Component
const CreateNotificationForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.message.trim()) {
      onSubmit(formData);
      setFormData({ title: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Notification title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Notification message"
          rows={3}
          required
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Send Notification
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [showCreateNotification, setShowCreateNotification] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
    // Load notifications
    const jobAlerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
    const systemNotifications = JSON.parse(localStorage.getItem('systemNotifications') || '[]');
    setNotifications([...jobAlerts, ...systemNotifications]);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.notification-dropdown')) {
        setIsNotificationDropdownOpen(false);
      }
    };

    if (isNotificationDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isNotificationDropdownOpen]);

  // Hide tooltip when dropdown is open
  const tooltipClass = isNotificationDropdownOpen 
    ? "opacity-0 invisible" 
    : "opacity-0 invisible group-hover:opacity-100 group-hover:visible";

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };



  const handleCreateNotification = (notificationData: any) => {
    const newNotification = {
      id: Date.now(),
      title: notificationData.title,
      message: notificationData.message,
      type: 'system',
      createdBy: user?.email,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    const systemNotifications = JSON.parse(localStorage.getItem('systemNotifications') || '[]');
    systemNotifications.push(newNotification);
    localStorage.setItem('systemNotifications', JSON.stringify(systemNotifications));
    
    // Update local state
    setNotifications(prev => [...prev, newNotification]);
    setShowCreateNotification(false);
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const markNotificationAsRead = (notificationId: number, type: string = 'system') => {
    if (type === 'system') {
      const systemNotifications = JSON.parse(localStorage.getItem('systemNotifications') || '[]');
      const updatedNotifications = systemNotifications.map((n: any) => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('systemNotifications', JSON.stringify(updatedNotifications));
    } else {
      const jobAlerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
      const updatedJobAlerts = jobAlerts.map((n: any) => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('jobAlerts', JSON.stringify(updatedJobAlerts));
    }
    
    // Update local state
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const systemNotifications = JSON.parse(localStorage.getItem('systemNotifications') || '[]');
    const jobAlerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
    
    const updatedSystemNotifications = systemNotifications.map((n: any) => ({ ...n, read: true }));
    const updatedJobAlerts = jobAlerts.map((n: any) => ({ ...n, read: true }));
    
    localStorage.setItem('systemNotifications', JSON.stringify(updatedSystemNotifications));
    localStorage.setItem('jobAlerts', JSON.stringify(updatedJobAlerts));
    
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
  };

  // Build display name and initials
  const getNameParts = (full?: string) => {
    if (!full) return { first: '', last: '' };
    const parts = full.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: '' };
    return { first: parts[0], last: parts[parts.length - 1] };
  };

  const displayFull = user?.fullName || user?.email || 'Profile';
  const { first, last } = getNameParts(user?.fullName || user?.email);
  const initials = `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase() || (displayFull?.[0] || 'U').toUpperCase();
  const displayName = `${first}${last ? ` ${last}` : ''}` || displayFull;

  const profileButton = user ? (
    <div className="relative group">
      <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium focus:outline-none">
        <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold mr-2">
          {initials}
        </span>
        <span className="truncate max-w-[160px]">{displayName}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
        {user?.userType === 'recruiter' && (
          <Link to="/notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Applications</Link>
        )}
        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  ) : (
    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
      Login
    </Link>
  );

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
      : 'text-gray-700 hover:text-blue-600 transition-colors font-medium';

  // Treat apply subroutes as active for Jobs/Internships tabs
  const isJobsActive = location.pathname.startsWith('/jobs') || location.pathname.startsWith('/apply/');
  const isInternshipsActive = location.pathname.startsWith('/internships') || location.pathname.startsWith('/apply-internship/');

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'block px-3 py-2 text-blue-600 font-semibold'
      : 'block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors';

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold gradient-text">PlacementHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink end to="/" className={desktopLinkClass}>Home</NavLink>
            <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
            <NavLink
              to="/internships"
              className={({ isActive }: { isActive: boolean }) => (isActive || isInternshipsActive)
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600 transition-colors font-medium'}
            >
              Internships
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }: { isActive: boolean }) => (isActive || isJobsActive)
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600 transition-colors font-medium'}
            >
              Jobs
            </NavLink>
            
            {/* Notification Bell */}
            {user && (
              <div className="relative notification-dropdown group">
                <button
                  onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                  className={`relative p-2 transition-all duration-200 rounded-md ${
                    getUnreadNotificationCount() > 0 
                      ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  aria-label={`Notifications (${getUnreadNotificationCount()} unread)`}
                >
                  <Bell className={`w-5 h-5 transition-transform duration-200 ${
                    getUnreadNotificationCount() > 0 ? 'animate-pulse' : ''
                  }`} />
                  {getUnreadNotificationCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce font-bold shadow-lg">
                      {getUnreadNotificationCount() > 99 ? '99+' : getUnreadNotificationCount()}
                    </span>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded transition-all duration-200 whitespace-nowrap z-50 ${tooltipClass}`}>
                  Notifications{getUnreadNotificationCount() > 0 ? ` (${getUnreadNotificationCount()} unread)` : ''}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                </div>
                
                {/* Notification Dropdown */}
                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                    <div className="p-4 border-b dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                        <div className="flex items-center gap-2">
                          {getUnreadNotificationCount() > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                              title="Mark all as read"
                            >
                              <CheckCheck className="w-4 h-4" />
                            </button>
                          )}
                          {user.userType === 'recruiter' && (
                            <button
                              onClick={() => setShowCreateNotification(true)}
                              className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                              title="Create notification"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((notification, index) => (
                          <div 
                            key={notification.id || index} 
                            className={`p-3 border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                            }`}
                            onClick={() => {
                              if (!notification.read) {
                                markNotificationAsRead(
                                  notification.id, 
                                  notification.type || (notification.position ? 'job' : 'system')
                                );
                              }
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm font-medium ${
                                    !notification.read 
                                      ? 'text-gray-900 dark:text-gray-100 font-semibold' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {notification.title || notification.position}
                                  </p>
                                  {notification.read && (
                                    <Check className="w-3 h-3 text-green-500" />
                                  )}
                                </div>
                                <p className={`text-xs mt-1 ${
                                  !notification.read 
                                    ? 'text-gray-600 dark:text-gray-300' 
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {notification.message || `${notification.company} - ${notification.type}`}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : ''}
                                </p>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markNotificationAsRead(
                                        notification.id, 
                                        notification.type || (notification.position ? 'job' : 'system')
                                      );
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    title="Mark as read"
                                  >
                                    Mark read
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t dark:border-gray-700">
                      <Link
                        to="/notifications"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => setIsNotificationDropdownOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {profileButton}
            <div className="ml-2">
              <ThemeToggle />
            </div>
            <NavLink to="/contact" className={desktopLinkClass}>Contact</NavLink>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center">
            <form onSubmit={e => e.preventDefault()} className="flex">
              <input
                type="search"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink end to="/" className={mobileLinkClass}>Home</NavLink>
            <NavLink to="/about" className={mobileLinkClass}>About</NavLink>
            <NavLink to="/internships" className={({ isActive }: { isActive: boolean }) => (isActive || isInternshipsActive) ? 'block px-3 py-2 text-blue-600 font-semibold' : 'block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors'}>Internships</NavLink>
            <NavLink to="/jobs" className={({ isActive }: { isActive: boolean }) => (isActive || isJobsActive) ? 'block px-3 py-2 text-blue-600 font-semibold' : 'block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors'}>Jobs</NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className={mobileLinkClass}>Dashboard</NavLink>
                <NavLink to="/profile" className={mobileLinkClass}>Profile</NavLink>
                
                {/* Mobile Notification Bell */}
                <div className="flex items-center justify-between px-3 py-2">
                  <Link 
                    to="/notifications" 
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell className={`w-5 h-5 mr-2 ${
                      getUnreadNotificationCount() > 0 ? 'text-blue-600 animate-pulse' : ''
                    }`} />
                    <span>Notifications</span>
                    {getUnreadNotificationCount() > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {getUnreadNotificationCount() > 99 ? '99+' : getUnreadNotificationCount()}
                      </span>
                    )}
                  </Link>
                </div>
                
                {user.userType === 'recruiter' && (
                  <button
                    onClick={() => setShowCreateNotification(true)}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Create Notification
                  </button>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className={mobileLinkClass}>Login</NavLink>
            )}
            <NavLink to="/contact" className={mobileLinkClass}>Contact</NavLink>
            {/* Mobile Search */}
            <div className="pt-4 px-3">
              <form onSubmit={e => e.preventDefault()} className="flex">
                <input
                  type="search"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Notification Modal */}
      {showCreateNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Notification</h3>
              <button
                onClick={() => setShowCreateNotification(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <CreateNotificationForm 
              onSubmit={handleCreateNotification}
              onCancel={() => setShowCreateNotification(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;