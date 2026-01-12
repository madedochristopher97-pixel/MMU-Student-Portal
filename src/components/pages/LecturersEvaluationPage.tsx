import { useState, useEffect, useRef } from 'react';
import { Star, Search, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';

// Comprehensive lecturers data from prompt
const lecturersData = [
  // Faculty of Computing
  { id: 1, name: 'Dr. Silas Kamau', unit: 'Introduction to Programming', faculty: 'Computing & IT', code: 'CIT-101' },
  { id: 2, name: 'Prof. Jane Mutua', unit: 'Database Management Systems', faculty: 'Computing & IT', code: 'CIT-102' },
  { id: 3, name: 'Mr. Kevin Omollo', unit: 'Data Communication & Networking', faculty: 'Computing & IT', code: 'CIT-103' },
  // Faculty of Engineering
  { id: 4, name: 'Dr. Anthony Mwangi', unit: 'Engineering Mathematics I', faculty: 'Engineering & Tech', code: 'ENG-201' },
  { id: 5, name: 'Eng. Sarah Teresia', unit: 'Fluid Mechanics', faculty: 'Engineering & Tech', code: 'ENG-202' },
  { id: 6, name: 'Prof. David Omondi', unit: 'Circuit Theory', faculty: 'Engineering & Tech', code: 'ENG-203' },
  // Faculty of Media
  { id: 7, name: 'Ms. Brenda Wanja', unit: 'Digital Photography & Editing', faculty: 'Media & Comm', code: 'MED-301' },
  { id: 8, name: 'Mr. Robert Gichuru', unit: 'Mass Media Law & Ethics', faculty: 'Media & Comm', code: 'MED-302' },
  { id: 9, name: 'Dr. Emily Nekesa', unit: 'Public Relations Strategy', faculty: 'Media & Comm', code: 'MED-303' },
  // Faculty of Science
  { id: 10, name: 'Dr. Peter Karanja', unit: 'Organic Chemistry', faculty: 'Science & Tech', code: 'SCI-401' },
  { id: 11, name: 'Prof. Alice Wambui', unit: 'Microbiology', faculty: 'Science & Tech', code: 'SCI-402' },
  { id: 12, name: 'Mr. James Lekolool', unit: 'General Physics II', faculty: 'Science & Tech', code: 'SCI-403' },
  // Faculty of Social Science
  { id: 13, name: 'Dr. Mercy Chepngetich', unit: 'Development Studies', faculty: 'Social Science', code: 'SST-501' },
  { id: 14, name: 'Mr. Victor Otieno', unit: 'Introduction to Psychology', faculty: 'Social Science', code: 'SST-502' },
  { id: 15, name: 'Ms. Faith Kyalo', unit: 'Social Research Methods', faculty: 'Social Science', code: 'SST-503' },
];

const evaluationCriteria = [
  { id: 'knowledge', label: 'Knowledge of Subject Matter', description: 'Demonstrates expertise in the subject' },
  { id: 'communication', label: 'Communication Skills', description: 'Explains concepts clearly and effectively' },
  { id: 'engagement', label: 'Student Engagement', description: 'Encourages participation and discussion' },
  { id: 'organization', label: 'Course Organization', description: 'Well-structured and organized lessons' },
  { id: 'availability', label: 'Availability', description: 'Accessible for questions and consultation' },
  { id: 'fairness', label: 'Fairness in Grading', description: 'Objective and fair assessment methods' },
];

export function LecturersEvaluationPage() {
  const [selectedLecturerId, setSelectedLecturerId] = useState<string>('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLecturers = lecturersData.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLecturer = lecturersData.find(l => l.id.toString() === selectedLecturerId);

  const handleRating = (criterionId: string, rating: number, ev?: React.MouseEvent) => {
    setRatings(prev => ({ ...prev, [criterionId]: rating }));
    if (ev && containerRef.current) {
      triggerParticle(ev.nativeEvent as MouseEvent, containerRef.current)
      // add a quick pop animation to the clicked star svg
      try {
        const btn = ev.currentTarget as HTMLElement
        const svg = btn.querySelector('svg')
        if (svg) {
          svg.classList.add('star-pop')
          setTimeout(() => svg.classList.remove('star-pop'), 300)
        }
      } catch (e) {
        // ignore if DOM not available
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLecturerId) {
      alert('Please select a lecturer');
      return;
    }

    const allRated = evaluationCriteria.every(criterion => ratings[criterion.id] > 0);
    if (!allRated) {
      alert('Please rate all criteria');
      return;
    }

    setSubmitted(true)
    setTimeout(() => {
      alert(`Evaluation submitted for ${selectedLecturer?.name}! Thank you for your feedback.`);
      setSubmitted(false)
      // Reset form
      setSelectedLecturerId('');
      setRatings({});
      setComments('');
    }, 700)
  };

  function triggerParticle(e: MouseEvent, container: HTMLElement) {
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const dx = (Math.random() - 0.5) * 180 + 'px'
      const dy = (Math.random() - 0.5) * 180 + 'px'
      p.style.left = `${x}px`
      p.style.top = `${y}px`
      p.style.setProperty('--dx', dx)
      p.style.setProperty('--dy', dy)
      container.appendChild(p)
      setTimeout(() => { p.remove() }, 700)
    }
  }

  const RatingStars = ({ criterionId, currentRating }: { criterionId: string; currentRating: number }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={(e) => handleRating(criterionId, star, e)}
            className="focus:outline-none star-btn"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`w-8 h-8 star ${star <= currentRating ? 'star-on' : 'text-slate-200'}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Lecturers Evaluation</h1>
        <p className="text-lg text-slate-700">Evaluate your lecturers to help improve academic quality.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lecturer List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white border-slate-200 shadow-md flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-800 mb-2">Select Lecturer</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search..."
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredLecturers.map((lecturer) => (
                <div
                  key={lecturer.id}
                  onClick={() => setSelectedLecturerId(lecturer.id.toString())}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${selectedLecturerId === lecturer.id.toString()
                      ? 'bg-orange-50 border-orange-200 shadow-sm'
                      : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                    }`}
                >
                  <h4 className={`font-semibold text-sm ${selectedLecturerId === lecturer.id.toString() ? 'text-orange-700' : 'text-slate-800'}`}>
                    {lecturer.name}
                  </h4>
                  <p className="text-xs text-slate-500 mb-1">{lecturer.unit}</p>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                    {lecturer.faculty.split(' ').slice(0, 1)}...
                  </Badge>
                </div>
              ))}
              {filteredLecturers.length === 0 && (
                <p className="text-center text-slate-500 p-4 text-sm">No lecturers found.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Evaluation Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200 shadow-lg min-h-[600px]">
            {selectedLecturer ? (
              <>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedLecturer.name}</h2>
                      <h3 className="text-lg text-slate-700 font-medium flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-sm font-bold font-mono">{selectedLecturer.code}</span>
                        {selectedLecturer.unit}
                      </h3>
                    </div>
                    <Badge className="bg-slate-800">{selectedLecturer.faculty}</Badge>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Evaluation Criteria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {evaluationCriteria.map((criterion) => (
                        <div key={criterion.id} className="glass-card p-8 rounded-2xl border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-900 mb-1">{criterion.label}</p>
                              <p className="text-sm text-slate-500">{criterion.description}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                              <RatingStars
                                criterionId={criterion.id}
                                currentRating={ratings[criterion.id] || 0}
                              />
                              <span className="text-sm font-bold text-slate-700 min-w-[32px] text-center">
                                {ratings[criterion.id] || '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="comments" className="text-base font-semibold text-slate-800">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="What did this lecturer do well? What could be improved?"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="min-h-[120px] border-slate-300 focus:border-orange-500 focus:ring-orange-500 w-full"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 submit-eval-btn w-full sm:w-auto">
                      {submitted ? (
                        <span className="flex items-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="check" d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Submitted
                        </span>
                      ) : (
                        'Submit Evaluation'
                      )}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Lecturer Selected</h3>
                <p className="max-w-md">Please select a lecturer from the list on the left to begin the evaluation process.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
