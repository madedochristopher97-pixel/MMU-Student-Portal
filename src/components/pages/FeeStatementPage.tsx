import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

// Sample data for fee statement
const feeStatementData = [
  { date: '15/01/2024', ref: 'TF001234', description: 'Tuition Fee - Semester 1', debit: '85,000.00', credit: '0.00' },
  { date: '15/01/2024', ref: 'LF001234', description: 'Library Fee', debit: '5,000.00', credit: '0.00' },
  { date: '15/01/2024', ref: 'SF001234', description: 'Statutory Fee', debit: '8,500.00', credit: '0.00' },
  { date: '20/01/2024', ref: 'PY001234', description: 'Payment - MPESA', debit: '0.00', credit: '50,000.00' },
  { date: '22/01/2024', ref: 'MF001234', description: 'Medical Fee', debit: '3,200.00', credit: '0.00' },
  { date: '15/02/2024', ref: 'TF001235', description: 'Tuition Fee - Semester 2', debit: '85,000.00', credit: '0.00' },
  { date: '18/02/2024', ref: 'PY001235', description: 'Payment - Bank Transfer', debit: '0.00', credit: '60,000.00' },
  { date: '20/02/2024', ref: 'AF001235', description: 'Activity Fee', debit: '4,500.00', credit: '0.00' },
  { date: '25/02/2024', ref: 'PY001236', description: 'Payment - MPESA', debit: '0.00', credit: '45,000.00' },
  { date: '10/03/2024', ref: 'EF001236', description: 'Examination Fee', debit: '12,500.00', credit: '0.00' },
  { date: '15/03/2024', ref: 'PY001237', description: 'Payment - Cash', debit: '0.00', credit: '35,245.00' },
  { date: '20/03/2024', ref: 'CF001237', description: 'Computer Lab Fee', debit: '6,780.00', credit: '0.00' },
  { date: '25/03/2024', ref: 'PY001238', description: 'Payment - MPESA', debit: '0.00', credit: '31,220.00' },
];

// Calculate totals
const totalDebit = feeStatementData.reduce((sum, item) => sum + parseFloat(item.debit.replace(',', '')), 0);
const totalCredit = feeStatementData.reduce((sum, item) => sum + parseFloat(item.credit.replace(',', '')), 0);
const balance = totalCredit - totalDebit;

export function FeeStatementPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Fee Statement</h1>
          <p className="text-slate-600">View your complete fee transaction history</p>
        </div>
        <Button onClick={handlePrint} className="bg-orange-600 hover:bg-orange-700">
          <Printer className="w-4 h-4 mr-2" />
          Print Fee Statement
        </Button>
      </div>

      {/* Fee Statement Table */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-50 z-10">
              <TableRow>
                <TableHead className="text-slate-900 font-bold">Date</TableHead>
                <TableHead className="text-slate-900 font-bold">Ref #</TableHead>
                <TableHead className="text-slate-900 font-bold">Description</TableHead>
                <TableHead className="text-right text-slate-900 font-bold">Charges / Fees (KES)</TableHead>
                <TableHead className="text-right text-slate-900 font-bold">Payments (KES)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStatementData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-slate-600">{item.ref}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {item.debit !== '0.00' && <span className="text-red-600">{item.debit}</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.credit !== '0.00' && <span className="text-green-600">{item.credit}</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Sticky Footer Summary */}
        <div className="sticky bottom-0 bg-slate-50 border-t-2 border-slate-300 px-6 py-4">
          <div className="flex justify-end gap-12">
            <div className="text-center">
              <p className="text-slate-700 text-sm font-semibold mb-1">Total Fees Charged</p>
              <p className="text-red-600 font-bold text-lg">{totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-700 text-sm font-semibold mb-1">Total Payments Made</p>
              <p className="text-green-600 font-bold text-lg">{totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-700 text-sm font-semibold mb-1">Balance</p>
              <p className={`font-bold text-lg ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
