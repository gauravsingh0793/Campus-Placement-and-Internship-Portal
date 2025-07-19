import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Upload, CheckCircle, ArrowRight, GraduationCap, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    college: '',
    course: '',
    graduationYear: '',
    companyName: '',
    designation: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    const url = `http://localhost:5000/api/${endpoint}`;
    let payload: any = {
      email: formData.email,
      password: formData.password,
      userType,
    };
    if (!isLogin) {
      payload = {
        ...payload,
        fullName: formData.fullName,
        confirmPassword: formData.confirmPassword,
        college: userType === 'student' ? formData.college : undefined,
        course: userType === 'student' ? formData.course : undefined,
        graduationYear: userType === 'student' ? formData.graduationYear : undefined,
        companyName: userType === 'recruiter' ? formData.companyName : undefined,
        designation: userType === 'recruiter' ? formData.designation : undefined,
      };
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      if (isLogin) {
        alert('Login successful!');
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        navigate('/dashboard');
      } else {
        alert('Signup successful!');
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
          return;
        }
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const benefits = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Personalized Dashboard",
      description: "Track your applications, view recommendations, and manage your profile",
      color: "border-blue-500",
      iconColor: "text-blue-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Application Tracking",
      description: "Monitor the status of all your job and internship applications in real-time",
      color: "border-green-500",
      iconColor: "text-green-500"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Resume Builder",
      description: "Create professional resumes with our AI-powered builder and templates",
      color: "border-purple-500",
      iconColor: "text-purple-500"
    }
  ];

  const courses = [
    "Computer Science Engineering", "Information Technology", "Electronics & Communication",
    "Mechanical Engineering", "Civil Engineering", "Business Administration", "Commerce",
    "Arts", "Science", "Other"
  ];

  const graduationYears = ["2024", "2025", "2026", "2027", "2028"];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {isLogin ? 'Welcome Back' : 'Join PlacementHub'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isLogin
              ? 'Sign in to access your dashboard and continue your career journey'
              : 'Create your account and unlock thousands of opportunities'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Join PlacementHub?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className={`bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 ${benefit.color} shadow-lg`}>
                    <div className="flex items-center mb-3">
                      <div className={`${benefit.iconColor} mr-4`}>{benefit.icon}</div>
                      <h4 className={`text-lg font-semibold ${benefit.iconColor}`}>{benefit.title}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white">
              <h4 className="text-lg font-semibold mb-4">Join Our Community</h4>
              <div className="grid grid-cols-2 gap-4">
                {["50K+", "2.5K+", "15K+", "85%"].map((value, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm opacity-90">
                      {["Students", "Companies", "Placements", "Success Rate"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
            {/* User Type Selection */}
            <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {["student", "recruiter"].map(type => (
                <button
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium transition-colors ${
                    userType === type
                      ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  {type === "student" ? <GraduationCap className="w-4 h-4 mr-2" /> : <Building2 className="w-4 h-4 mr-2" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Login/Signup Toggle */}
            <div className="flex mb-6">
              {["Sign In", "Sign Up"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setIsLogin(idx === 0)}
                  className={`flex-1 py-2 px-4 font-medium transition-colors ${
                    isLogin === (idx === 0)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={<User />}
                />
              )}

              <InputField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                icon={<Mail />}
              />

              <InputField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                icon={<Lock />}
                showToggle
                toggle={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />

              {!isLogin && (
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  icon={<Lock />}
                />
              )}

              {!isLogin && userType === 'student' && (
                <>
                  <InputField
                    label="College/University"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="Enter your college name"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label="Course"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      options={courses}
                      placeholder="Select Course"
                    />
                    <SelectField
                      label="Graduation Year"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      options={graduationYears}
                      placeholder="Select Year"
                    />
                  </div>
                </>
              )}

              {!isLogin && userType === 'recruiter' && (
                <>
                  <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                  <InputField
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter your designation"
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            {isLogin && (
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                  Forgot your password?
                </a>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  showToggle = false,
  toggle = false,
  onToggle = () => {}
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg
                   bg-white text-gray-800 placeholder-gray-500
                   dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {toggle ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

// Reusable Select Component
const SelectField = ({ label, name, value, onChange, options, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                 bg-white text-gray-800 placeholder-gray-500
                 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default LoginPage;
