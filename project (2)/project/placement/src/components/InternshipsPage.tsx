import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Building2, Calendar, Users, ArrowRight } from 'lucide-react';

const InternshipsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Internships' },
    { id: 'tech', label: 'Technology' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'finance', label: 'Finance' },
    { id: 'design', label: 'Design' }
  ];

  const internships = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Software Development Intern",
      location: "Bangalore",
      duration: "3 months",
      stipend: "₹25,000/month",
      type: "Full-time",
      category: "tech",
      deadline: "Dec 15, 2024",
      description: "Work on cutting-edge web applications using React, Node.js, and cloud technologies.",
      requirements: ["Computer Science/IT background", "Knowledge of JavaScript", "Problem-solving skills"],
      benefits: ["Mentorship program", "Certificate", "Pre-placement offer opportunity"]
    },
    {
      id: 2,
      company: "Digital Marketing Pro",
      position: "Digital Marketing Intern",
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹20,000/month",
      type: "Hybrid",
      category: "marketing",
      deadline: "Dec 20, 2024",
      description: "Learn and execute digital marketing strategies across social media, SEO, and content marketing.",
      requirements: ["Marketing/Business background", "Creative thinking", "Social media knowledge"],
      benefits: ["Industry certification", "Portfolio development", "Networking opportunities"]
    },
    {
      id: 3,
      company: "FinanceHub",
      position: "Financial Analyst Intern",
      location: "Delhi",
      duration: "6 months",
      stipend: "₹30,000/month",
      type: "Full-time",
      category: "finance",
      deadline: "Dec 18, 2024",
      description: "Assist in financial modeling, data analysis, and investment research projects.",
      requirements: ["Finance/Economics background", "Excel proficiency", "Analytical mindset"],
      benefits: ["CFA preparation support", "Real project experience", "Full-time opportunity"]
    },
    {
      id: 4,
      company: "Creative Studios",
      position: "UI/UX Design Intern",
      location: "Pune",
      duration: "3 months",
      stipend: "₹22,000/month",
      type: "Remote",
      category: "design",
      deadline: "Dec 25, 2024",
      description: "Design user interfaces and experiences for mobile and web applications.",
      requirements: ["Design background", "Figma/Adobe XD skills", "Portfolio required"],
      benefits: ["Design mentorship", "Portfolio enhancement", "Industry exposure"]
    },
    {
      id: 5,
      company: "DataTech Analytics",
      position: "Data Science Intern",
      location: "Hyderabad",
      duration: "4 months",
      stipend: "₹28,000/month",
      type: "Full-time",
      category: "tech",
      deadline: "Dec 22, 2024",
      description: "Work on machine learning projects and data analysis using Python and R.",
      requirements: ["Statistics/CS background", "Python/R knowledge", "ML fundamentals"],
      benefits: ["ML certification", "Research publication opportunity", "Industry projects"]
    },
    {
      id: 6,
      company: "StartupLab",
      position: "Business Development Intern",
      location: "Chennai",
      duration: "3 months",
      stipend: "₹18,000/month",
      type: "Hybrid",
      category: "marketing",
      deadline: "Dec 30, 2024",
      description: "Support business development activities and client relationship management.",
      requirements: ["Business/MBA background", "Communication skills", "Sales aptitude"],
      benefits: ["Startup experience", "Equity opportunity", "Leadership development"]
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || internship.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { number: "1,200+", label: "Active Internships", icon: <Building2 className="w-5 h-5" /> },
    { number: "800+", label: "Partner Companies", icon: <Users className="w-5 h-5" /> },
    { number: "₹25K", label: "Average Stipend", icon: <DollarSign className="w-5 h-5" /> },
    { number: "92%", label: "Completion Rate", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Internship Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Gain valuable industry experience with internships from leading companies. 
            Build your skills, expand your network, and kickstart your career.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center card-hover">
              <div className="flex justify-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search internships by position or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid gap-6">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="company-logo mr-4 w-12 h-12 text-sm">
                          {internship.company.split(' ').map(word => word[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{internship.position}</h3>
                          <p className="text-gray-600">{internship.company}</p>
                        </div>
                      </div>
                    </div>
                    <span className="status-badge status-active">
                      {internship.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{internship.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {internship.stipend}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Apply by {internship.deadline}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {internship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {internship.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:ml-6 lg:flex-shrink-0">
                  <div className="flex flex-col gap-3">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Save for Later
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

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Don't See What You're Looking For?</h3>
          <p className="text-lg mb-6 opacity-90">
            Set up job alerts and get notified when new internships matching your preferences are posted
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Create Job Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;