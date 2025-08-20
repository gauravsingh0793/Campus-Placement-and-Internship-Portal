import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, Calendar, MapPin, ArrowLeft, ArrowRight, Bookmark, Check, Download } from 'lucide-react';
import { internships as staticInternships } from '../data/internships';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InternshipDetailsPage: React.FC = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);

    const saved = JSON.parse(localStorage.getItem('savedInternships') || '[]');
    setSavedIds(Array.isArray(saved) ? saved : []);

    const found = staticInternships.find((i: any) => String(i.id) === String(internshipId));
    setInternship(found || null);
  }, [internshipId]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((sid) => sid !== id) : [...prev, id];
      localStorage.setItem('savedInternships', JSON.stringify(next));
      return next;
    });
  };

  const campusDetails = useMemo(() => {
    if (!internship) return null as any;
    const isLiveU = String(internship.company).toLowerCase().includes('live u');

    const formatDeadline = (d: string | undefined) => {
      if (!d) return 'Will Be Declared Soon';
      const date = new Date(d);
      if (isNaN(date.getTime())) return d as string;
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const weekday = date.toLocaleString('en-US', { weekday: 'long' });
      return `${day} ${month}, ${year} - ${weekday}`;
    };

    if (isLiveU) {
      return {
        bannerTitle: `Campus by ${internship.company} 25-26 Batch`,
        companyName: 'Live U Ltd',
        companyType: 'MNC',
        campusDateTime: 'Will Be Declared Soon',
        lastRegistrationDate: formatDeadline('2025-08-01'),
        venue: 'Will be declare Soon',
        profiles: [internship.position],
        ctc: internship.stipend || 'As per company standards',
        workLocation: internship.location,
        descriptionTitle: internship.position,
        responsibilities: internship.requirements || [],
        skillsSoft: [],
        skillsRequiredNote: undefined,
        selectionProcess: ['CV Screening', 'Interview(s)'],
        eligibilityEducation: 'As per company criteria',
        eligibilityCriteria: 'No active backlogs preferred',
        registrationProcess: 'Online',
        registrationLink: `/apply-internship/${internship.id}`,
        placementContact: undefined,
        otherInfo: [],
        aboutCompany: internship.description,
        website: undefined,
      };
    }

    return {
      bannerTitle: `${internship.company} Campus Drive`,
      companyName: internship.company,
      companyType: 'Company',
      campusDateTime: 'Will Be Declared Soon',
      lastRegistrationDate: formatDeadline(internship.deadline),
      venue: 'Will be declared soon',
      profiles: [internship.position],
      ctc: internship.stipend || 'As per company standards',
      workLocation: internship.location,
      descriptionTitle: internship.position,
      responsibilities: internship.requirements || [],
      skillsSoft: [],
      skillsRequiredNote: undefined,
      selectionProcess: ['CV Screening', 'Interview(s)'],
      eligibilityEducation: 'As per company criteria',
      eligibilityCriteria: 'No active backlogs preferred',
      registrationProcess: 'Online',
      registrationLink: `/apply-internship/${internship.id}`,
      placementContact: undefined,
      otherInfo: [],
      aboutCompany: internship.description,
      website: undefined,
    };
  }, [internship]);

  const handleDownloadPDF = async () => {
    try {
      const element = printRef.current;
      if (!element) return;

      const hiddenNodes: Array<{ node: HTMLElement; prevDisplay: string | null }> = [];
      element.querySelectorAll('.no-pdf').forEach((node) => {
        const el = node as HTMLElement;
        hiddenNodes.push({ node: el, prevDisplay: el.style.display || null });
        el.style.display = 'none';
      });

      const canvas = await html2canvas(element, {
        useCORS: true,
        scrollY: -window.scrollY,
        backgroundColor: '#ffffff',
        scale: 2,
      } as any);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidthPx, pdfHeight / imgHeightPx);
      const imgWidth = imgWidthPx * ratio;
      const imgHeight = imgHeightPx * ratio;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileBase = (internship?.company || 'Internship')
        .replace(/[^a-z0-9]+/gi, '_')
        .replace(/^_+|_+$/g, '');
      pdf.save(`${fileBase}_Campus_Drive.pdf`);

      hiddenNodes.forEach(({ node, prevDisplay }) => {
        node.style.display = prevDisplay ?? '';
      });
    } catch (err) {
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!internship) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700 mb-6 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <div className="text-gray-600">Internship not found.</div>
      </div>
    );
  }

  const isSaved = savedIds.includes(internship.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700 mb-6 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Internships
        </button>

        {/* Export region start */}
        <div ref={printRef}>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{internship.position}</h1>
                <div className="text-gray-600">{internship.company}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{internship.location}</div>
                  <div className="flex items-center"><Briefcase className="w-4 h-4 mr-2" />{internship.duration}</div>
                  <div className="flex items-center">{internship.stipend}</div>
                  <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Apply by {internship.deadline}</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 no-pdf">
                {user && user.userType === 'student' ? (
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    onClick={() => navigate(`/apply-internship/${internship.id}`)}
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center opacity-50 cursor-not-allowed" disabled>
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
                <button
                  onClick={() => toggleSave(internship.id)}
                  className={`${isSaved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'} px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
                >
                  {isSaved ? (<><Check className="w-4 h-4 mr-2" /> Saved</>) : (<><Bookmark className="w-4 h-4 mr-2" /> Save Internship</>)}
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {campusDetails && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  {campusDetails.bannerTitle}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Company Campus Drive Details</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-blue-50 rounded-lg p-4">
                <div>
                  <div className="text-gray-500">Company Name</div>
                  <div className="font-medium text-gray-900">{campusDetails.companyName}</div>
                </div>
                <div>
                  <div className="text-gray-500">Type of Company</div>
                  <div className="font-medium text-gray-900">{campusDetails.companyType}</div>
                </div>
                <div>
                  <div className="text-gray-500">Campus Date & Time</div>
                  <div className="font-medium text-gray-900">{campusDetails.campusDateTime}</div>
                </div>
                <div>
                  <div className="text-gray-500">Last Registration Date</div>
                  <div className="font-medium text-gray-900">{campusDetails.lastRegistrationDate}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-gray-500">Venue</div>
                  <div className="font-medium text-gray-900">{campusDetails.venue}</div>
                </div>
              </div>

              <div className="my-6 h-px bg-gray-200" />

              <h3 className="text-lg font-semibold mb-3">Internship Description</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-amber-50 rounded-lg p-4">
                <div>
                  <div className="text-gray-500">Internship Profile</div>
                  <div className="font-medium text-gray-900">{campusDetails.profiles.join(', ')}</div>
                </div>
                <div>
                  <div className="text-gray-500">Stipend</div>
                  <div className="font-medium text-gray-900">{campusDetails.ctc}</div>
                </div>
                <div>
                  <div className="text-gray-500">Work Location</div>
                  <div className="font-medium text-gray-900">{campusDetails.workLocation}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-gray-500">Role</div>
                  <div className="font-medium text-gray-900">{campusDetails.descriptionTitle}</div>
                </div>
              </div>

              {(campusDetails.responsibilities?.length > 0) && (
                <div className="mt-4">
                  <div className="text-gray-500 mb-1">Key Responsibilities</div>
                  <ul className="list-disc ml-5 text-gray-800 space-y-1">
                    {campusDetails.responsibilities.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(campusDetails.skillsSoft?.length > 0 || campusDetails.skillsRequiredNote) && (
                <div className="mt-4">
                  <div className="text-gray-500 mb-1">Skills</div>
                  <div className="text-gray-800">
                    {campusDetails.skillsSoft?.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 mb-2">
                        {campusDetails.skillsSoft.map((s: string, idx: number) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    )}
                    {campusDetails.skillsRequiredNote && (
                      <div className="text-sm">Skills Required: {campusDetails.skillsRequiredNote}</div>
                    )}
                  </div>
                </div>
              )}

              {(campusDetails.selectionProcess?.length > 0) && (
                <div className="mt-4">
                  <div className="text-gray-500 mb-1">Selection Process</div>
                  <ol className="list-decimal ml-5 text-gray-800 space-y-1">
                    {campusDetails.selectionProcess.map((s: string, idx: number) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="my-6 h-px bg-gray-200" />

              <h3 className="text-lg font-semibold mb-3">Eligibility Parameters</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-purple-50 rounded-lg p-4">
                <div>
                  <div className="text-gray-500">Education Qualification</div>
                  <div className="font-medium text-gray-900">{campusDetails.eligibilityEducation}</div>
                </div>
                <div>
                  <div className="text-gray-500">Eligibility Criteria</div>
                  <div className="font-medium text-gray-900">{campusDetails.eligibilityCriteria}</div>
                </div>
              </div>

              <div className="my-6 h-px bg-gray-200" />

              <h3 className="text-lg font-semibold mb-3">To Participate</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-green-50 rounded-lg p-4">
                <div>
                  <div className="text-gray-500">Registration Process</div>
                  <div className="font-medium text-gray-900">{campusDetails.registrationProcess}</div>
                </div>
                <div>
                  <div className="text-gray-500">Registration</div>
                  <a href={campusDetails.registrationLink} className="text-blue-600 hover:underline font-medium">Click here for Registration</a>
                </div>
                {campusDetails.placementContact && (
                  <div className="md:col-span-2">
                    <div className="text-gray-500">Placement Cell Contact Person</div>
                    <div className="font-medium text-gray-900">
                      {campusDetails.placementContact.name} — Mob.: {campusDetails.placementContact.mobile}
                    </div>
                  </div>
                )}
              </div>

              {campusDetails.otherInfo?.length > 0 && (
                <div className="mt-6 text-sm bg-orange-50 rounded-lg p-4">
                  <div className="text-gray-500 mb-1">Other Information</div>
                  <ul className="list-disc ml-5 text-gray-800 space-y-1">
                    {campusDetails.otherInfo.map((info: string, idx: number) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </div>
              )}

              {campusDetails.aboutCompany && (
                <div className="mt-6 bg-sky-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">About Company</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{campusDetails.aboutCompany}</p>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 no-pdf">
            <h2 className="text-xl font-semibold mb-3">Internship Description</h2>
            <p className="text-gray-700 leading-relaxed">{internship.description}</p>
          </div>
        </div>
        {/* Export region end */}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {(internship.requirements || []).map((req: string, i: number) => (
                <li key={i} className="flex items-start"><span className="text-blue-600 mr-2">•</span>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {(internship.benefits || []).map((b: string, i: number) => (
                <li key={i} className="flex items-start"><span className="text-green-600 mr-2">•</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsPage;


