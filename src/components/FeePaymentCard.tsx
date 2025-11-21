import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Wallet, CheckCircle, AlertCircle, FileText, Receipt, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function FeePaymentCard() {
  const totalBilled = 203600.00;
  const totalPaid = 221960.00;
  const balance = totalBilled - totalPaid;
  const hasCredit = balance < 0;

  return (
    <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Wallet className="w-5 h-5" />
              Fee Payment
            </CardTitle>
            <CardDescription>Financial summary</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Balance Display */}
        <div 
          className={cn(
            "rounded-lg p-4 border-2 shadow-sm",
            hasCredit 
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300" 
              : "bg-gradient-to-br from-red-50 to-rose-50 border-red-300"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            {hasCredit ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-900">Fee Credit</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-900">Balance Due</span>
              </>
            )}
          </div>
          <div className={cn(
            "mb-1",
            hasCredit ? "text-green-700" : "text-red-700"
          )}>
            Ksh. {Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-700">
            {hasCredit ? "You have a credit balance" : "Payment required"}
          </p>
        </div>

        {/* Financial Details */}
        <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">Total Billed</span>
            <span className="text-slate-900">Ksh. {totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">Total Paid</span>
            <span className="text-green-700">Ksh. {totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            className={cn(
              "w-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
              hasCredit 
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500" 
                : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
            )}
            size="sm"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {hasCredit ? "Already Paid" : "Make Payment"}
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <FileText className="w-4 h-4 mr-2" />
              Statements
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Receipt className="w-4 h-4 mr-2" />
              Receipts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}