import { useState } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

// Sample receipts data
const receiptsData = [
  { id: 1, receiptNo: 'REC-2024-001', date: '20/01/2024', paymentMode: 'MPESA', amount: '50,000.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '20/01/2024' },
  { id: 2, receiptNo: 'REC-2024-002', date: '18/02/2024', paymentMode: 'Bank Transfer', amount: '60,000.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '18/02/2024' },
  { id: 3, receiptNo: 'REC-2024-003', date: '25/02/2024', paymentMode: 'MPESA', amount: '45,000.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '25/02/2024' },
  { id: 4, receiptNo: 'REC-2024-004', date: '15/03/2024', paymentMode: 'Cash', amount: '35,245.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '15/03/2024' },
  { id: 5, receiptNo: 'REC-2024-005', date: '25/03/2024', paymentMode: 'MPESA', amount: '31,220.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '25/03/2024' },
  { id: 6, receiptNo: 'REC-2024-006', date: '05/04/2024', paymentMode: 'Bank Transfer', amount: '25,000.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '05/04/2024' },
  { id: 7, receiptNo: 'REC-2024-007', date: '15/04/2024', paymentMode: 'MPESA', amount: '40,000.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '15/04/2024' },
  { id: 8, receiptNo: 'REC-2024-008', date: '20/04/2024', paymentMode: 'Cash', amount: '15,500.00', paymentBy: 'CHRISTOPHER MADEDO', bankSlipDate: '20/04/2024' },
];

export function ReceiptsPage() {
  const [selectedReceipts, setSelectedReceipts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(receiptsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReceipts = receiptsData.slice(startIndex, endIndex);

  const toggleReceipt = (id: number) => {
    setSelectedReceipts(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const handlePrintSelected = () => {
    if (selectedReceipts.length === 0) {
      alert('Please select at least one receipt to print');
      return;
    }
    alert(`Printing ${selectedReceipts.length} selected receipt(s)`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Receipts</h1>
        <p className="text-slate-600">Click 'Select' to select any Receipt you want to print then click 'Print Selected' to print.</p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handlePrintSelected}
          disabled={selectedReceipts.length === 0}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Selected ({selectedReceipts.length})
        </Button>
      </div>

      {/* Receipts Table */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-slate-900">Select</TableHead>
                <TableHead className="text-slate-900">Receipt No</TableHead>
                <TableHead className="text-slate-900">Date</TableHead>
                <TableHead className="text-slate-900">Payment Mode</TableHead>
                <TableHead className="text-right text-slate-900">Amount</TableHead>
                <TableHead className="text-slate-900">Payment By</TableHead>
                <TableHead className="text-slate-900">Bank Slip Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReceipts.map((receipt) => (
                <TableRow 
                  key={receipt.id}
                  className={selectedReceipts.includes(receipt.id) ? 'bg-orange-50' : ''}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedReceipts.includes(receipt.id)}
                      onCheckedChange={() => toggleReceipt(receipt.id)}
                    />
                  </TableCell>
                  <TableCell className="text-slate-900">{receipt.receiptNo}</TableCell>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>{receipt.paymentMode}</TableCell>
                  <TableCell className="text-right text-green-600">{receipt.amount}</TableCell>
                  <TableCell className="text-slate-600">{receipt.paymentBy}</TableCell>
                  <TableCell>{receipt.bankSlipDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
}
