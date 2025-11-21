import { useState } from 'react';
import { Star } from 'lucide-react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Sample lecturers data
const lecturersData = [
  { id: 1, name: 'Dr. Jane Mwangi', unit: 'COM 201 - Digital Media' },
  { id: 2, name: 'Prof. John Kamau', unit: 'COM 202 - Public Relations' },
  { id: 3, name: 'Dr. Sarah Omondi', unit: 'JRN 201 - Broadcast Journalism' },
  { id: 4, name: 'Mr. Peter Wanjiru', unit: 'ADV 201 - Advertising Principles' },
  { id: 5, name: 'Dr. Mary Njeri', unit: 'COM 203 - Communication Research' },
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
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');

  const handleRating = (criterionId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [criterionId]: rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLecturer) {
      alert('Please select a lecturer');
      return;
    }

    const allRated = evaluationCriteria.every(criterion => ratings[criterion.id] > 0);
    if (!allRated) {
      alert('Please rate all criteria');
      return;
    }

    alert('Evaluation submitted successfully! Thank you for your feedback.');
    
    // Reset form
    setSelectedLecturer('');
    setRatings({});
    setComments('');
  };

  const RatingStars = ({ criterionId, currentRating }: { criterionId: string; currentRating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(criterionId, star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= currentRating
                  ? 'fill-orange-500 text-orange-500'
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Lecturers Evaluation</h1>
        <p className="text-slate-600">Provide feedback on your lecturers to help improve teaching quality</p>
      </div>

      {/* Evaluation Form */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-3 border-b border-slate-200">
          <h3 className="text-slate-900">Lecturer Evaluation Form</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lecturer Selection */}
          <div className="space-y-2">
            <Label htmlFor="lecturer">Select Lecturer to Evaluate *</Label>
            <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
              <SelectTrigger id="lecturer" className="bg-slate-50">
                <SelectValue placeholder="Choose a lecturer" />
              </SelectTrigger>
              <SelectContent>
                {lecturersData.map((lecturer) => (
                  <SelectItem key={lecturer.id} value={lecturer.id.toString()}>
                    {lecturer.name} - {lecturer.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 mt-1">
              Only lecturers associated with your current semester's registered units will appear.
            </p>
          </div>

          {/* Rating Criteria */}
          {selectedLecturer && (
            <div className="space-y-6">
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-slate-900 mb-4">Rate the following criteria (1-5 stars)</h4>
                <div className="space-y-6">
                  {evaluationCriteria.map((criterion) => (
                    <div key={criterion.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-slate-900">{criterion.label}</p>
                        <p className="text-sm text-slate-600">{criterion.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <RatingStars 
                          criterionId={criterion.id} 
                          currentRating={ratings[criterion.id] || 0} 
                        />
                        <span className="text-sm text-slate-600 min-w-[60px]">
                          {ratings[criterion.id] ? `${ratings[criterion.id]}/5` : 'Not rated'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Share any additional feedback or suggestions..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="bg-slate-50 min-h-[120px]"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Submit Evaluation
              </Button>
            </div>
          )}
        </form>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200 p-6">
        <h4 className="text-blue-900 mb-2">About Lecturer Evaluations</h4>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Your feedback is anonymous and confidential</li>
          <li>• Evaluations help lecturers improve their teaching methods</li>
          <li>• Be honest and constructive in your feedback</li>
          <li>• You can evaluate each lecturer once per semester</li>
        </ul>
      </Card>
    </div>
  );
}
