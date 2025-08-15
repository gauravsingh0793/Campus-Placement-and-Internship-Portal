import React from 'react';
import { ArrowRight, Users, Building2, TrendingUp, Award, Search, Upload, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Find Opportunities",
      description: "Browse thousands of internships and job openings from top companies",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Resume",
      description: "Create your profile and upload your resume to get noticed by recruiters",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Get Notifications",
      description: "Receive instant alerts for new opportunities matching your profile",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Registered", icon: <Users className="w-6 h-6" /> },
    { number: "2,500+", label: "Partner Companies", icon: <Building2 className="w-6 h-6" /> },
    { number: "85%", label: "Placement Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "15,000+", label: "Success Stories", icon: <Award className="w-6 h-6" /> }
  ];

  const recentOpportunities = [
    {
      company: "TechCorp",
      position: "Software Engineering Intern",
      type: "Internship",
      location: "Bangalore",
      salary: "₹25,000/month",
      deadline: "Dec 15, 2024"
    },
    {
      company: "DataSys",
      position: "Full Stack Developer",
      type: "Full-time",
      location: "Mumbai",
      salary: "₹8-12 LPA",
      deadline: "Dec 20, 2024"
    },
    {
      company: "InnovateLab",
      position: "UI/UX Design Intern",
      type: "Internship",
      location: "Delhi",
      salary: "₹20,000/month",
      deadline: "Dec 18, 2024"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="gradient-bg hero-pattern pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="hero-title text-4xl md:text-6xl font-bold text-white mb-6 fade-in-up">
              Your Gateway to
              <span className="block text-yellow-300">Dream Career</span>
            </h1>
            <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto fade-in-up">
              Connect with top companies, discover internships, and launch your career with PlacementHub -
              the premier platform for college placements and internships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
              <a
                href="#internships"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Explore Internships <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href="#jobs"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Browse Jobs <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center slide-in-left">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 stats-counter">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How PlacementHub Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect students with their dream opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 feature-grid">
            {features.map((feature, index) => (
              feature.title === 'Find Opportunities' ? (
                <div
                  key={index}
                  className="text-center card-hover cursor-pointer"
                  onClick={() => navigate('/jobs')}
                >
                  <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ) : feature.title === 'Upload Resume' ? (
                <div
                  key={index}
                  className="text-center card-hover cursor-pointer"
                  onClick={() => navigate('/upload-resume')}
                >
                  <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ) : feature.title === 'Get Notifications' ? (
                <div
                  key={index}
                  className="text-center card-hover cursor-pointer"
                  onClick={() => navigate('/notifications')}
                >
                  <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ) : (
                <div key={index} className="text-center card-hover">
                  <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Fresh openings from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentOpportunities.map((opportunity, index) => (
              <div key={index} className="job-card p-6 rounded-xl card-hover">
                <div className="flex items-center mb-4">
                  <div className="company-logo mr-4">
                    {opportunity.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{opportunity.company}</h3>
                    <span className={`status-badge ${opportunity.type === 'Internship' ? 'status-upcoming' : 'status-active'}`}>
                      {opportunity.type}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.position}</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>📍 {opportunity.location}</div>
                  <div>💰 {opportunity.salary}</div>
                  <div>⏰ Apply by {opportunity.deadline}</div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#internships"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Opportunities <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of students who have found their dream jobs through PlacementHub
          </p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
          >
            Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;