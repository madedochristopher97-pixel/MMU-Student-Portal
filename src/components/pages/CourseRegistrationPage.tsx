import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

// Sample course registration data
const registeredUnits = [
  { 
    code: 'COM 201', 
    unitName: 'Digital Media',
    creditHours: 3,
    lecturer: 'Dr. Jane Mwangi',
    status: 'Registered',
    semester: 'Semester 1'
  },
  { 
    code: 'COM 202', 
    unitName: 'Public Relations',
    creditHours: 3,
    lecturer: 'Prof. John Kamau',
    status: 'Registered',
    semester: 'Semester 1'
  },
  { 
    code: 'JRN 201', 
    unitName: 'Broadcast Journalism',
    creditHours: 4,
    lecturer: 'Dr. Sarah Omondi',
    status: 'Registered',
    semester: 'Semester 1'
  },
  { 
    code: 'ADV 201', 
    unitName: 'Advertising Principles',
    creditHours: 3,
    lecturer: 'Mr. Peter Wanjiru',
    status: 'Registered',
    semester: 'Semester 1'
  },
  { 
    code: 'COM 203', 
    unitName: 'Communication Research',
    creditHours: 4,
    lecturer: 'Dr. Mary Njeri',
    status: 'Registered',
    semester: 'Semester 1'
  },
];

export function CourseRegistrationPage() {
  const totalCreditHours = registeredUnits.reduce((sum, unit) => sum + unit.creditHours, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Course Registration List</h1>
        <p className="text-slate-600">View your registered units and course details</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <p className="text-slate-600 mb-2">Total Units</p>
          <p className="text-orange-600">{registeredUnits.length}</p>
        </Card>
        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <p className="text-slate-600 mb-2">Total Credit Hours</p>
          <p className="text-orange-600">{totalCreditHours}</p>
        </Card>
        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <p className="text-slate-600 mb-2">Academic Year</p>
          <p className="text-slate-900">2024/2025</p>
        </Card>
      </div>

      {/* Registered Units Table */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-3 border-b border-slate-200">
          <h3 className="text-slate-900">Registered Units - Year 2 Semester 1</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-slate-900">Unit Code</TableHead>
                <TableHead className="text-slate-900">Unit Name</TableHead>
                <TableHead className="text-center text-slate-900">Credit Hours</TableHead>
                <TableHead className="text-slate-900">Lecturer</TableHead>
                <TableHead className="text-slate-900">Semester</TableHead>
                <TableHead className="text-center text-slate-900">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredUnits.map((unit, index) => (
                <TableRow key={index}>
                  <TableCell className="text-slate-900">{unit.code}</TableCell>
                  <TableCell>{unit.unitName}</TableCell>
                  <TableCell className="text-center">{unit.creditHours}</TableCell>
                  <TableCell className="text-slate-600">{unit.lecturer}</TableCell>
                  <TableCell>{unit.semester}</TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {unit.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Summary */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <p className="text-slate-600">Total Credit Hours for this Semester</p>
            <p className="text-orange-600">{totalCreditHours} Credit Hours</p>
          </div>
        </div>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200 p-6">
        <h4 className="text-blue-900 mb-2">Registration Information</h4>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Unit registration is confirmed for the current academic year</li>
          <li>• Contact your academic advisor for any changes to your registration</li>
          <li>• Ensure all fees are paid to avoid deregistration</li>
          <li>• Attendance is mandatory for all registered units</li>
        </ul>
      </Card>
    </div>
  );
}
