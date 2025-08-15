import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Search, Menu, X, User, GraduationCap, Moon, Sun, Bell } from 'lucide-react';
=======
import { Search, Menu, X, User, GraduationCap, Moon, Sun } from 'lucide-react';
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
import { Link, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
<<<<<<< HEAD
  const [token, setToken] = useState<string>('');
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
=======
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      const tokenData = localStorage.getItem('token');
      const parsedUser = userData ? JSON.parse(userData) : null;
      console.log('Navigation: User data updated:', parsedUser);
      setUser(parsedUser);
      setToken(tokenData || '');
    };

    // Check user on mount
    checkUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkUser();
      }
    };

    // Listen for custom events (when user logs in/out in same tab)
    const handleUserChange = () => {
      checkUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleUserChange);
    window.addEventListener('userLogout', handleUserChange);
    window.addEventListener('notificationRead', fetchUnreadCount);

=======
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
    // Dark mode preference
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
<<<<<<< HEAD

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleUserChange);
      window.removeEventListener('userLogout', handleUserChange);
      window.removeEventListener('notificationRead', fetchUnreadCount);
    };
  }, []);

  // Function to fetch unread notifications count
  const fetchUnreadCount = async () => {
    if (!user || !token) return;
    
    try {
      if (user.userType === 'student') {
        // For students: count unread notifications
        const response = await fetch('http://localhost:5000/api/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const notifications = data.notifications || [];
          // Count notifications that haven't been read by this user
          const unreadCount = notifications.filter((notification: any) => 
            !notification.readBy || !notification.readBy.includes(user.id)
          ).length;
          setUnreadNotifications(unreadCount);
        }
      }
      // Removed recruiter notification count - only students see notification badges
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
    }
  };

  // Fetch unread notifications count for students
  useEffect(() => {
    fetchUnreadCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, [user, token]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('userLogout'));
=======
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
      return next;
    });
  };

  const profileButton = user ? (
    <div className="relative group">
      <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium focus:outline-none">
        <User className="w-4 h-4 mr-1" />
        {user.fullName || user.email || 'Profile'}
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  ) : (
    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
      Login
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
<<<<<<< HEAD
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold gradient-text">PlacementHub</span>
            </div>
=======
            <Link to="/" className="flex-shrink-0 flex items-center">
  <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
  <span className="text-xl font-bold gradient-text">PlacementHub</span>
</Link>

>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/internships" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Internships
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Jobs
            </Link>
<<<<<<< HEAD
            <Link to="/notifications" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-1" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </div>
            </Link>
            {user && user.userType === 'recruiter' && (
              <Link to="/my-notifications" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                My Notifications
              </Link>
            )}
=======
            <Link to="/notifications" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Notifications
            </Link>
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
            {profileButton}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
            </button>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
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
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/internships" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Internships
            </Link>
            <Link to="/jobs" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Jobs
            </Link>
            <Link to="/notifications" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
<<<<<<< HEAD
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </div>
                {unreadNotifications > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </div>
            </Link>
            {user && user.userType === 'recruiter' && (
              <Link to="/my-notifications" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                My Notifications
              </Link>
            )}
=======
              Notifications
            </Link>
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
            )}
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
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
    </nav>
  );
};

export default Navigation;