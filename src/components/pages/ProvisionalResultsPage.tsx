import { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

// Sample results data
const resultsData = {
  'Y1S1': [
    { code: 'COM 101', unit: 'Introduction to Communication', marks: 78, grade: 'A', points: 5.0 },
    { code: 'COM 102', unit: 'Media Studies', marks: 72, grade: 'A-', points: 4.7 },
    { code: 'ENG 101', unit: 'English Composition', marks: 68, grade: 'B+', points: 4.3 },
    { code: 'SOC 101', unit: 'Introduction to Sociology', marks: 75, grade: 'A-', points: 4.7 },
    { code: 'PSY 101', unit: 'General Psychology', marks: 70, grade: 'B+', points: 4.3 },
  ],
  'Y1S2': [
    { code: 'COM 103', unit: 'Media Writing', marks: 80, grade: 'A', points: 5.0 },
    { code: 'COM 104', unit: 'Visual Communication', marks: 76, grade: 'A', points: 5.0 },
    { code: 'ENG 102', unit: 'Advanced English', marks: 71, grade: 'A-', points: 4.7 },
    { code: 'JRN 101', unit: 'Introduction to Journalism', marks: 82, grade: 'A', points: 5.0 },
    { code: 'PHT 101', unit: 'Photography Basics', marks: 74, grade: 'A-', points: 4.7 },
  ],
  'Y2S1': [
    { code: 'COM 201', unit: 'Digital Media', marks: 85, grade: 'A', points: 5.0 },
    { code: 'COM 202', unit: 'Public Relations', marks: 79, grade: 'A', points: 5.0 },
    { code: 'JRN 201', unit: 'Broadcast Journalism', marks: 81, grade: 'A', points: 5.0 },
    { code: 'ADV 201', unit: 'Advertising Principles', marks: 77, grade: 'A', points: 5.0 },
    { code: 'COM 203', unit: 'Communication Research', marks: 73, grade: 'A-', points: 4.7 },
  ],
};

export function ProvisionalResultsPage() {
  const [selectedStage, setSelectedStage] = useState('Y2S1'); // Default to current stage
  const [showResults, setShowResults] = useState(true); // Auto-show results

  const availableStages = Object.keys(resultsData);
  const currentResults = selectedStage ? resultsData[selectedStage as keyof typeof resultsData] : [];

  const calculateGPA = () => {
    if (currentResults.length === 0) return 0;
    const totalPoints = currentResults.reduce((sum, unit) => sum + unit.points, 0);
    return (totalPoints / currentResults.length).toFixed(2);
  };

  // Auto-load results when stage changes
  const handleStageChange = (value: string) => {
    setSelectedStage(value);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Larger, clearer hierarchy */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Exam Results</h1>
        <p className="text-base text-slate-600">View your academic examination results</p>
      </div>

      {/* Filter Card - Centered with max-width */}
      <div className="flex justify-center">
        <Card className="bg-white border-slate-200 shadow-md overflow-hidden w-full max-w-2xl">
          <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
            <h3 className="text-base font-semibold text-blue-900">Select Examination Stage</h3>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <Label htmlFor="stage" className="text-sm font-medium text-slate-700">
                Examination Period
              </Label>
              <Select value={selectedStage} onValueChange={handleStageChange}>
                <SelectTrigger id="stage" className="bg-slate-50 border-slate-300">
                  <SelectValue placeholder="Select stage - Current is Y2S1" />
                </SelectTrigger>
                <SelectContent>
                  {availableStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage} {stage === 'Y2S1' && '(Current)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 mt-1">
                Results will load automatically when you select a stage
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Results Display - Full width */}
      {showResults && currentResults.length > 0 && (
        <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Results for {selectedStage}</h3>
              <span className="text-sm text-slate-600">{currentResults.length} Units</span>
            </div>
          </div>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-slate-900">Unit Code</TableHead>
                  <TableHead className="text-slate-900">Unit Name</TableHead>
                  <TableHead className="text-center text-slate-900">Marks</TableHead>
                  <TableHead className="text-center text-slate-900">Grade</TableHead>
                  <TableHead className="text-center text-slate-900">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentResults.map((unit, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-slate-900">{unit.code}</TableCell>
                    <TableCell>{unit.unit}</TableCell>
                    <TableCell className="text-center">{unit.marks}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                        {unit.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{unit.points.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 p-4">
            {currentResults.map((unit, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header with Unit Name and Grade Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-2">
                    <h4 className="font-bold text-slate-900 text-base mb-1">{unit.unit}</h4>
                    <p className="text-sm text-slate-500">{unit.code}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-800 font-bold text-base">
                    {unit.grade}
                  </span>
                </div>
                
                {/* Marks and Points - 2 Column Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Marks</p>
                    <p className="text-2xl font-bold text-slate-900">{unit.marks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Points</p>
                    <p className="text-2xl font-bold text-slate-900">{unit.points.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GPA Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-t border-orange-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-600">Total Units: {currentResults.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 mb-1">Semester GPA</p>
                <p className="text-2xl font-bold text-orange-600">{calculateGPA()}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
