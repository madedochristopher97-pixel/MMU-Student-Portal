import { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function ClearanceRequisitionPage() {
  const [formData, setFormData] = useState({
    personalEmail: '',
    telephone: '',
    address: '',
    campus: 'Main Campus',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.personalEmail || !formData.telephone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    alert('Clearance requisition submitted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Clearance Requisition</h1>
        <p className="text-slate-600">Final step to complete your academic journey</p>
      </div>

      {/* Clearance Form */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3">
          <h3 className="text-white font-semibold">Clearance Requisition Form</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pre-filled Fields (Display Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Registration No.</Label>
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                SS1-261-155/2023
              </div>
            </div>

            <div className="space-y-2">
              <Label>Name</Label>
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                KIMANJA CHRISTOPHER MADEDO
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Programme</Label>
            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              SS1-261 Bachelor of Arts in Communication and Media
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Personal Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.personalEmail}
                onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                required
                className="bg-slate-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Telephone Number *</Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
                className="bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter your current physical address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="bg-slate-50 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campus">Campus</Label>
            <Select value={formData.campus} onValueChange={(value: string) => setFormData({ ...formData, campus: value })}>
              <SelectTrigger id="campus" className="bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Campus">Main Campus</SelectItem>
                <SelectItem value="City Campus">City Campus</SelectItem>
                <SelectItem value="Mombasa Campus">Mombasa Campus</SelectItem>
                <SelectItem value="Kisumu Campus">Kisumu Campus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Submit Requisition
          </Button>
        </form>
      </Card>

      {/* Information Card */}
      <Card className="bg-amber-50 border-amber-200 p-6">
        <h4 className="text-amber-900 font-semibold mb-3">Clearance Requirements & Process</h4>
        <ul className="space-y-2 text-amber-900 text-sm">
          <li>• Ensure all information provided is accurate and up-to-date</li>
          <li>• Clearance processing typically takes 5-7 working days</li>
          <li>• You will receive email notifications on your clearance status</li>
          <li className="font-bold text-red-700">• You must clear ALL outstanding fees before submitting</li>
        </ul>
      </Card>
    </div>
  );
}
