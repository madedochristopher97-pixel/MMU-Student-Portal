import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChevronDown, ChevronRight, GraduationCap, BookOpen } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
} from '../ui/collapsible';

// Function to generate random grade
const getRandomGrade = () => {
  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  return grades[Math.floor(Math.random() * grades.length)];
};

// Function to generate data for 4 years
const generateAcademicMatrix = () => {
  const years = [1, 2, 3, 4];
  const semesters = [1, 2];

  const matrix: Record<string, any> = {};

  years.forEach(year => {
    matrix[`Year ${year}`] = {};
    semesters.forEach(sem => {
      matrix[`Year ${year}`][`Semester ${year}.${sem}`] = Array(5).fill(null).map((_, i) => ({
        code: `UNIT ${year}${sem}0${i + 1}`,
        name: `Academic Unit ${year}.${sem}.${i + 1}`,
        marks: Math.floor(Math.random() * (100 - 60) + 60),
        grade: getRandomGrade(),
        points: (Math.random() * (5 - 3) + 3).toFixed(1)
      }));
    });
  });

  return matrix;
};

const academicData = generateAcademicMatrix();

export function ProvisionalResultsPage() {
  const [openYears, setOpenYears] = useState<Record<string, boolean>>({ 'Year 1': true, 'Year 2': true, 'Year 3': false, 'Year 4': false });

  const toggleYear = (year: string) => {
    setOpenYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Academic Matrix</h1>
        <p className="text-lg text-slate-700">Comprehensive view of your 4-year academic performance.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Object.entries(academicData).map(([year, semesters]) => (
          <Card key={year} className="bg-white border-slate-200 shadow-md overflow-hidden">
            <div
              className="bg-slate-100 p-4 flex items-center justify-between cursor-pointer hover:bg-slate-200 transition-colors"
              onClick={() => toggleYear(year)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{year}</h2>
              </div>
              {openYears[year] ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
            </div>

            <Collapsible open={openYears[year]}>
              <CollapsibleContent>
                <div className="p-4 space-y-6">
                  {Object.entries(semesters).map(([semesterName, units]: [string, any]) => (
                    <div key={semesterName} className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          {semesterName}
                        </h3>
                        <Badge variant="outline" className="bg-white text-slate-600">
                          GPA: {(units.reduce((acc: number, curr: any) => acc + parseFloat(curr.points), 0) / units.length).toFixed(2)}
                        </Badge>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {units.map((unit: any, index: number) => (
                          <div key={index} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="min-w-0 flex-1 mr-4">
                              <p className="text-sm font-semibold text-slate-900 truncate">{unit.name}</p>
                              <p className="text-xs text-slate-500 font-mono">{unit.code}</p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <div className="hidden sm:block">
                                <p className="text-xs text-slate-400 uppercase">Points</p>
                                <p className="text-sm font-bold text-slate-700">{unit.points}</p>
                              </div>
                              <div className="w-12 text-center">
                                <Badge className={`${unit.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                                  unit.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {unit.grade}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}
