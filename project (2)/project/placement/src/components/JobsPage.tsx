import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Search, Filter, MapPin, Briefcase, DollarSign, Building2, Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
=======
import { Search, Filter, MapPin, Briefcase, DollarSign, Building2, Calendar, Users, ArrowRight, Star, IndianRupeeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import IndianRupeeIcon from lucide-react;


>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const categoryFilters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'tech', label: 'Technology' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'finance', label: 'Finance' },
    { id: 'design', label: 'Design' },
    { id: 'sales', label: 'Sales' }
  ];

  const experienceFilters = [
    { id: 'all', label: 'All Levels' },
    { id: 'fresher', label: 'Fresher (0-1 years)' },
    { id: 'junior', label: 'Junior (1-3 years)' },
    { id: 'mid', label: 'Mid-level (3-5 years)' }
  ];

  const jobs = [
    {
      id: 1,
      company: "TechGlobal Inc.",
      position: "Full Stack Developer",
      location: "Bangalore",
      experience: "fresher",
      salary: "₹6-10 LPA",
      type: "Full-time",
      category: "tech",
      deadline: "Jan 15, 2025",
      featured: true,
      description: "Join our dynamic team to build scalable web applications using modern technologies.",
      requirements: ["Bachelor's in Computer Science", "Proficiency in React, Node.js", "Understanding of databases", "Problem-solving skills"],
      benefits: ["Health insurance", "Flexible working hours", "Learning & development budget", "Stock options"],
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "Git"]
    },
    {
      id: 2,
      company: "MarketPro Solutions",
      position: "Digital Marketing Specialist",
      location: "Mumbai",
      experience: "junior",
      salary: "₹4-7 LPA",
      type: "Full-time",
      category: "marketing",
      deadline: "Jan 20, 2025",
      featured: false,
      description: "Drive digital marketing campaigns and grow our online presence across multiple channels.",
      requirements: ["Marketing degree preferred", "2+ years digital marketing experience", "Google Ads certification", "Analytics expertise"],
      benefits: ["Performance bonuses", "Remote work options", "Professional certifications", "Career growth"],
      skills: ["Google Ads", "SEO", "Social Media", "Analytics", "Content Marketing"]
    },
    {
      id: 3,
      company: "FinanceCore",
      position: "Financial Analyst",
      location: "Delhi",
      experience: "fresher",
      salary: "₹5-8 LPA",
      type: "Full-time",
      category: "finance",
      deadline: "Jan 18, 2025",
      featured: true,
      description: "Analyze financial data and support strategic decision-making processes.",
      requirements: ["Finance/Economics degree", "Excel proficiency", "Financial modeling knowledge", "Analytical thinking"],
      benefits: ["CFA sponsorship", "Mentorship program", "Performance incentives", "Health benefits"],
      skills: ["Excel", "Financial Modeling", "SQL", "PowerBI", "Risk Analysis"]
    },
    {
      id: 4,
      company: "DesignStudio Pro",
      position: "Senior UI/UX Designer",
      location: "Pune",
      experience: "mid",
      salary: "₹8-12 LPA",
      type: "Full-time",
      category: "design",
      deadline: "Jan 25, 2025",
      featured: false,
      description: "Lead design initiatives and create exceptional user experiences for our products.",
      requirements: ["Design degree", "4+ years UI/UX experience", "Portfolio required", "Leadership skills"],
      benefits: ["Creative freedom", "Latest design tools", "Conference attendance", "Flexible schedule"],
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"]
    },
    {
      id: 5,
      company: "DataTech Solutions",
      position: "Data Scientist",
      location: "Hyderabad",
      experience: "junior",
      salary: "₹7-12 LPA",
      type: "Full-time",
      category: "tech",
      deadline: "Jan 22, 2025",
      featured: true,
      description: "Build machine learning models and extract insights from large datasets.",
      requirements: ["Statistics/CS background", "Python/R expertise", "ML experience", "PhD preferred"],
      benefits: ["Research opportunities", "Conference presentations", "Cutting-edge projects", "Stock options"],
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"]
    },
    {
      id: 6,
      company: "SalesForce Pro",
      position: "Sales Executive",
      location: "Chennai",
      experience: "fresher",
      salary: "₹3-6 LPA",
      type: "Full-time",
      category: "sales",
      deadline: "Jan 30, 2025",
      featured: false,
      description: "Drive sales growth and build relationships with potential clients.",
      requirements: ["Any degree", "Communication skills", "Sales aptitude", "Target-oriented mindset"],
      benefits: ["High commission structure", "Travel opportunities", "Sales training", "Career progression"],
      skills: ["Communication", "Negotiation", "CRM", "Lead Generation", "Presentation"]
    }
  ];

  // Get recruiter-created jobs from localStorage
  const recruiterJobs = JSON.parse(localStorage.getItem('jobAlerts') || '[]');

  // Merge static jobs and recruiter jobs
  const allJobs = [
    ...jobs,
    ...recruiterJobs.map((job: any) => ({
      ...job,
      id: job.id || Date.now() + Math.random(),
      featured: false,
      skills: Array.isArray(job.skills) ? job.skills : [],
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      benefits: Array.isArray(job.benefits) ? job.benefits : [],
      category: job.category || 'other',
      experience: job.experience || 'all',
<<<<<<< HEAD
      postedBy: 'recruiter', // Add postedBy for recruiter jobs
=======
      postedBy: 'recruiter', // Add postedBy for recruiter jobs 
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
    })),
  ];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || job.category === selectedFilter;
    const matchesExperience = experienceFilter === 'all' || job.experience === experienceFilter;
    return matchesSearch && matchesCategory && matchesExperience;
  });

  const stats = [
    { number: "2,500+", label: "Active Jobs", icon: <Briefcase className="w-5 h-5" /> },
    { number: "1,200+", label: "Hiring Companies", icon: <Building2 className="w-5 h-5" /> },
<<<<<<< HEAD
    { number: "₹8.5L", label: "Average Package", icon: <DollarSign className="w-5 h-5" /> },
=======
    { number: "₹8.5L", label: "Average Package", icon: <IndianRupeeIcon className="w-5 h-5" /> },
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
    { number: "78%", label: "Placement Rate", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover your dream job from thousands of opportunities with leading companies.
            Start your career journey with positions that match your skills and aspirations.
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
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by position or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <div className="flex gap-2 flex-wrap">
                  {experienceFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setExperienceFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${experienceFilter === filter.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add buttons at the top */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mb-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/upload-resume')}
          >
            Upload Resume
          </button>
          {user && user.userType === 'recruiter' && (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              onClick={() => navigate('/create-job-alert')}
            >
              Create Job Alert
            </button>
          )}
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`bg-white rounded-xl shadow-lg p-6 card-hover ${job.featured ? 'ring-2 ring-yellow-400' : ''}`}>
              {job.featured && (
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-yellow-600">Featured Job</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="company-logo mr-4 w-12 h-12 text-sm">
                          {job.company.split(' ').map((word: string) => word[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                    </div>
                    <span className="status-badge status-active">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {experienceFilters.find(f => f.id === job.experience)?.label.split(' ')[0]}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Apply by {job.deadline}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 3).map((req: string, index: number) => (
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
                        {job.benefits.slice(0, 3).map((benefit: string, index: number) => (
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
                    {user && user.userType === 'student' && job.postedBy ? (
                      <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                        onClick={() => navigate(`/apply/${job.id}`)}
                      >
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center opacity-50 cursor-not-allowed" disabled>
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    )}
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Save Job
                    </button>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
          <p className="text-lg mb-6 opacity-90">
            Upload your resume and let top companies find you. Get personalized job recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/upload-resume')}
            >
              Upload Resume
            </button>
            {user && user.userType === 'recruiter' && (
              <button
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                onClick={() => navigate('/create-job-alert')}
              >
                Create Job Alert
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;