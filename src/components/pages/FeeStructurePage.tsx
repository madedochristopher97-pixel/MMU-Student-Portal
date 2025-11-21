import { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Download, Printer } from 'lucide-react';
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

// Sample fee structure data with grouping
const feeStructureData = {
  '2024/2025': {
    'SS1-261 Bachelor of Arts in Communication and Media': {
      'Tuition & Related Fees': [
        { category: 'Tuition Fee', amount: '85,000.00' },
        { category: 'Examination Fee', amount: '12,500.00' },
      ],
      'Statutory Fees': [
        { category: 'Statutory Fee', amount: '8,500.00' },
        { category: 'Medical Fee', amount: '3,200.00' },
        { category: 'Caution Fee', amount: '5,000.00' },
      ],
      'Lab & Service Fees': [
        { category: 'Library Fee', amount: '5,000.00' },
        { category: 'Computer Lab Fee', amount: '6,780.00' },
        { category: 'Activity Fee', amount: '4,500.00' },
        { category: 'Sports Fee', amount: '2,000.00' },
        { category: 'Identity Card', amount: '1,500.00' },
      ],
    },
    'SS1-262 Bachelor of Science in Computer Science': {
      'Tuition & Related Fees': [
        { category: 'Tuition Fee', amount: '95,000.00' },
        { category: 'Examination Fee', amount: '12,500.00' },
      ],
      'Statutory Fees': [
        { category: 'Statutory Fee', amount: '8,500.00' },
        { category: 'Medical Fee', amount: '3,200.00' },
        { category: 'Caution Fee', amount: '5,000.00' },
      ],
      'Lab & Service Fees': [
        { category: 'Library Fee', amount: '5,000.00' },
        { category: 'Computer Lab Fee', amount: '8,500.00' },
        { category: 'Activity Fee', amount: '4,500.00' },
        { category: 'Sports Fee', amount: '2,000.00' },
        { category: 'Identity Card', amount: '1,500.00' },
      ],
    },
  },
  '2023/2024': {
    'SS1-261 Bachelor of Arts in Communication and Media': {
      'Tuition & Related Fees': [
        { category: 'Tuition Fee', amount: '80,000.00' },
        { category: 'Examination Fee', amount: '12,000.00' },
      ],
      'Statutory Fees': [
        { category: 'Statutory Fee', amount: '8,000.00' },
        { category: 'Medical Fee', amount: '3,000.00' },
        { category: 'Caution Fee', amount: '5,000.00' },
      ],
      'Lab & Service Fees': [
        { category: 'Library Fee', amount: '4,500.00' },
        { category: 'Computer Lab Fee', amount: '6,500.00' },
        { category: 'Activity Fee', amount: '4,000.00' },
        { category: 'Sports Fee', amount: '2,000.00' },
        { category: 'Identity Card', amount: '1,500.00' },
      ],
    },
  },
};

export function FeeStructurePage() {
  const [selectedYear, setSelectedYear] = useState('2024/2025');
  const [selectedProgramme, setSelectedProgramme] = useState('SS1-261 Bachelor of Arts in Communication and Media');

  const availableYears = Object.keys(feeStructureData);
  const availableProgrammes = Object.keys(feeStructureData[selectedYear as keyof typeof feeStructureData] || {});
  const currentFeeStructure = (feeStructureData[selectedYear as keyof typeof feeStructureData] as any)?.[selectedProgramme] || {};

  const calculateTotal = () => {
    let total = 0;
    Object.values(currentFeeStructure).forEach((group: any) => {
      group.forEach((item: any) => {
        total += parseFloat(item.amount.replace(',', ''));
      });
    });
    return total;
  };

  const totalAmount = calculateTotal();

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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Fee Structure</h1>
        <p className="text-lg text-slate-700 mb-4 font-medium">View the breakdown of fees for your academic programme</p>
        <div className="flex gap-3">
          <Button 
            size="sm" 
            onClick={handlePrint}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Structure
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="text-slate-700 border-slate-300 hover:bg-slate-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card className="bg-white border-slate-200 shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Year Selector */}
          <div className="space-y-2">
            <Label htmlFor="academic-year" className="font-semibold text-slate-700">Academic Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger id="academic-year" className="bg-white border-2 border-slate-300 hover:border-orange-400 transition-colors">
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Programme Selector */}
          <div className="space-y-2">
            <Label htmlFor="programme" className="font-semibold text-slate-700">Programme</Label>
            <Select value={selectedProgramme} onValueChange={setSelectedProgramme}>
              <SelectTrigger id="programme" className="bg-white border-2 border-slate-300 hover:border-orange-400 transition-colors">
                <SelectValue placeholder="Select programme" />
              </SelectTrigger>
              <SelectContent>
                {availableProgrammes.map((programme) => (
                  <SelectItem key={programme} value={programme}>
                    {programme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Fee Structure - Desktop Table View */}
      <Card className="hidden md:block bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-200 border-b-2 border-slate-400">
              <TableRow>
                <TableHead className="text-left text-slate-900 font-extrabold text-base">Fee Category</TableHead>
                <TableHead className="text-right text-slate-900 font-extrabold text-base">Amount (KES)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(currentFeeStructure).map(([groupName, items]: [string, any]) => (
                <>
                  <TableRow key={`${groupName}-header`} className="bg-slate-100 border-t-2 border-slate-300">
                    <TableCell colSpan={2} className="font-bold text-slate-900 py-3 text-base">
                      {groupName}
                    </TableCell>
                  </TableRow>
                  {items.map((item: any, itemIndex: number) => (
                    <TableRow 
                      key={`${groupName}-${itemIndex}`}
                      className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <TableCell className="pl-8">{item.category}</TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
            <TableFooter className="bg-gradient-to-r from-orange-50 to-amber-50 border-t-4 border-orange-400">
              <TableRow>
                <TableCell className="text-slate-900 font-bold text-lg">Total Payable Amount</TableCell>
                <TableCell className="text-right text-orange-600 font-bold text-lg">
                  {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>

      {/* Fee Structure - Mobile Card View */}
      <Card className="md:hidden bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="divide-y divide-slate-200">
          {Object.entries(currentFeeStructure).map(([groupName, items]: [string, any]) => (
            <div key={groupName}>
              {/* Group Header - Full Width Divider */}
              <div className="bg-slate-100 px-4 py-3 border-t-2 border-slate-300">
                <h3 className="font-bold text-slate-900 text-base">{groupName}</h3>
              </div>
              
              {/* Group Items - Key-Value Pairs */}
              {items.map((item: any, itemIndex: number) => (
                <div 
                  key={itemIndex}
                  className={`px-4 py-3 flex justify-between items-center ${
                    itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <span className="text-slate-700 text-sm pr-2">{item.category}</span>
                  <span className="text-slate-900 font-semibold text-sm whitespace-nowrap">{item.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Total - Full Width Highlight */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-t-4 border-orange-400 px-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-900 font-bold text-base">Total Payable Amount</span>
            <span className="text-orange-600 font-bold text-xl">
              {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
