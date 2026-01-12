import { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Download, Printer, BookOpen, User as UserIcon } from 'lucide-react';
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
  TableFooter,
} from '../ui/table';

// Faculty Data with Units, Lecturers, and Fees
const facultyData = {
  'Faculty of Computing & Information Technology': {
    feePerSemester: 55000,
    units: [
      { code: 'CIT-101', name: 'Introduction to Programming', lecturer: 'Dr. Silas Kamau', cost: 20000 },
      { code: 'CIT-102', name: 'Database Management Systems', lecturer: 'Prof. Jane Mutua', cost: 18000 },
      { code: 'CIT-103', name: 'Data Communication & Networking', lecturer: 'Mr. Kevin Omollo', cost: 17000 },
    ]
  },
  'Faculty of Engineering & Technology': {
    feePerSemester: 70000,
    units: [
      { code: 'ENG-201', name: 'Engineering Mathematics I', lecturer: 'Dr. Anthony Mwangi', cost: 25000 },
      { code: 'ENG-202', name: 'Fluid Mechanics', lecturer: 'Eng. Sarah Teresia', cost: 23000 },
      { code: 'ENG-203', name: 'Circuit Theory', lecturer: 'Prof. David Omondi', cost: 22000 },
    ]
  },
  'Faculty of Media & Communication': {
    feePerSemester: 48000,
    units: [
      { code: 'MED-301', name: 'Digital Photography & Editing', lecturer: 'Ms. Brenda Wanja', cost: 16000 },
      { code: 'MED-302', name: 'Mass Media Law & Ethics', lecturer: 'Mr. Robert Gichuru', cost: 15000 },
      { code: 'MED-303', name: 'Public Relations Strategy', lecturer: 'Dr. Emily Nekesa', cost: 17000 },
    ]
  },
  'Faculty of Science & Technology': {
    feePerSemester: 52000,
    units: [
      { code: 'SCI-401', name: 'Organic Chemistry', lecturer: 'Dr. Peter Karanja', cost: 18000 },
      { code: 'SCI-402', name: 'Microbiology', lecturer: 'Prof. Alice Wambui', cost: 19000 },
      { code: 'SCI-403', name: 'General Physics II', lecturer: 'Mr. James Lekolool', cost: 15000 },
    ]
  },
  'Faculty of Social Science and Technology': {
    feePerSemester: 42000,
    units: [
      { code: 'SST-501', name: 'Development Studies', lecturer: 'Dr. Mercy Chepngetich', cost: 14000 },
      { code: 'SST-502', name: 'Introduction to Psychology', lecturer: 'Mr. Victor Otieno', cost: 14000 },
      { code: 'SST-503', name: 'Social Research Methods', lecturer: 'Ms. Faith Kyalo', cost: 14000 },
    ]
  }
};

export function FeeStructurePage() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('Faculty of Computing & Information Technology');
  const [selectedSemester, setSelectedSemester] = useState('Y1S1');

  const currentFacultyData = facultyData[selectedFaculty as keyof typeof facultyData];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Fee structure PDF download will be available soon!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Fee Structure</h1>
        <p className="text-lg text-slate-700 font-medium">Breakdown of fees per faculty and unit.</p>
      </div>

      {/* Filter Section */}
      <Card className="bg-white border-slate-200 shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="faculty-select" className="font-semibold text-slate-700">Select Faculty</Label>
            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
              <SelectTrigger id="faculty-select" className="bg-white border-2 border-slate-300 hover:border-orange-400 focus:ring-orange-500">
                <SelectValue placeholder="Select Faculty" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(facultyData).map((faculty) => (
                  <SelectItem key={faculty} value={faculty}>
                    {faculty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester-select" className="font-semibold text-slate-700">Semester</Label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger id="semester-select" className="bg-white border-2 border-slate-300 hover:border-orange-400 focus:ring-orange-500">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y1S1">Year 1 - Semester 1</SelectItem>
                <SelectItem value="Y1S2">Year 1 - Semester 2</SelectItem>
                <SelectItem value="Y2S1">Year 2 - Semester 1</SelectItem>
                <SelectItem value="Y2S2">Year 2 - Semester 2</SelectItem>
                <SelectItem value="Y3S1">Year 3 - Semester 1</SelectItem>
                <SelectItem value="Y3S2">Year 3 - Semester 2</SelectItem>
                <SelectItem value="Y4S1">Year 4 - Semester 1</SelectItem>
                <SelectItem value="Y4S2">Year 4 - Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Fee Table */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{selectedFaculty}</h2>
            <p className="text-sm text-slate-500">Fee Breakdown for {selectedSemester}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="w-[100px] font-bold text-slate-900">Unit Code</TableHead>
                <TableHead className="font-bold text-slate-900">Unit Name</TableHead>
                <TableHead className="font-bold text-slate-900">Lecturer</TableHead>
                <TableHead className="text-right font-bold text-slate-900">Cost (KES)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFacultyData.units.map((unit) => (
                <TableRow key={unit.code}>
                  <TableCell className="font-mono text-slate-600 font-medium">{unit.code}</TableCell>
                  <TableCell className="font-medium text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    {unit.name}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-3 h-3 text-slate-400" />
                      {unit.lecturer}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-slate-700">
                    {unit.cost.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-orange-50/50">
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold text-lg text-slate-900">Total Tuition Fee</TableCell>
                <TableCell className="text-right font-bold text-lg text-orange-600">
                  KES {currentFacultyData.feePerSemester.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>

      <div className="text-sm text-slate-500 text-center italic">
        * Additional statutory fees may apply. Contact student finance for a comprehensive statement.
      </div>
    </div>
  );
}
