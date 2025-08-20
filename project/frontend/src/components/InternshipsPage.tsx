import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, Building2, Calendar, Users, ArrowRight, Bookmark, Check, Eye, TrendingUp, Star, Zap } from 'lucide-react';
import { internships } from '../data/internships';
import AnimatedCounter from './AnimatedCounter';
import FloatingParticles from './FloatingParticles';

const InternshipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedInternships') || '[]');
    if (Array.isArray(saved)) {
      setSavedIds(saved);
    }
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const toggleSave = (id: number) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(sid => sid !== id) : [...prev, id];
      localStorage.setItem('savedInternships', JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (id: number) => savedIds.includes(id);

  const filters = [
    { id: 'all', label: 'All Internships' },
    { id: 'tech', label: 'Technology' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'finance', label: 'Finance' },
    { id: 'design', label: 'Design' }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || internship.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { 
      number: 1200, 
      label: "Active Internships", 
      icon: <Building2 className="w-5 h-5" />,
      suffix: "+",
      color: "from-blue-500 to-blue-600",
      description: "Available positions"
    },
    { 
      number: 800, 
      label: "Partner Companies", 
      icon: <Users className="w-5 h-5" />,
      suffix: "+",
      color: "from-green-500 to-green-600",
      description: "Hiring organizations"
    },
    { 
      number: 25, 
      label: "Average Stipend", 
      icon: <TrendingUp className="w-5 h-5" />,
      suffix: "K",
      prefix: "₹",
      color: "from-purple-500 to-purple-600",
      description: "Monthly compensation"
    },
    { 
      number: 92, 
      label: "Completion Rate", 
      icon: <Star className="w-5 h-5" />,
      suffix: "%",
      color: "from-orange-500 to-red-500",
      description: "Student satisfaction"
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Internship Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Gain valuable industry experience with internships from leading companies. 
            Build your skills, expand your network, and kickstart your career.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 rounded-3xl mb-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          
          {/* Floating Particles */}
          <FloatingParticles />
          
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Internship Statistics
                </span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">Discover the latest trends in internship opportunities</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center card-hover group hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mb-2">
                    <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix}
                      prefix={stat.prefix || ''}
                      duration={2000}
                      delay={index * 200}
                      className="text-2xl md:text-3xl font-bold"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search internships by position or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Status */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredInternships.length} of {internships.length} internships
          {selectedFilter !== 'all' && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">
              Category: {filters.find(f => f.id === selectedFilter)?.label}
            </span>
          )}
        </div>

        {/* Internships Grid */}
        <div className="grid gap-6">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="company-logo mr-4 w-12 h-12 text-sm">
                          {internship.company.split(' ').map(word => word[0]).join('')}
                        </div>
                        <div>
                          <h3 
                            className="text-xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:underline"
                            onClick={() => navigate(`/internships/${internship.id}`)}
                          >
                            {internship.position}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">{internship.company}</p>
                        </div>
                      </div>
                    </div>
                    <span className="status-badge status-active">
                      {internship.type}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{internship.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      {internship.stipend}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      Apply by {internship.deadline}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {internship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Benefits:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {internship.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:ml-6 lg:flex-shrink-0">
                  <div className="flex flex-col gap-3">
                    {user && user.userType === 'student' ? (
                      <button
                        onClick={() => navigate(`/apply-internship/${internship.id}`)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center opacity-50 cursor-not-allowed" disabled>
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    )}
                    {user && user.userType === 'student' ? (
                      <button
                        onClick={() => toggleSave(internship.id)}
                        className={`${
                          isSaved(internship.id)
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        } px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
                        aria-pressed={isSaved(internship.id)}
                      >
                        {isSaved(internship.id) ? (
                          <>
                            <Check className="w-4 h-4 mr-2" /> Saved
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4 mr-2" /> Save for Later
                          </>
                        )}
                      </button>
                    ) : (
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center opacity-50 cursor-not-allowed" disabled>
                        <Bookmark className="w-4 h-4 mr-2" /> Save for Later
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/internships/${internship.id}`)}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Can't find the right internship?</h3>
          <p className="text-lg opacity-90">Refine your filters, explore multiple categories, and save roles to track opportunities.</p>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;