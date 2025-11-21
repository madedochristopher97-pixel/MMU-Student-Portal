import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Mail, Phone, MapPin, Hash, Calendar as CalendarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function ProfileCard() {
  const studentInfo = {
    name: 'Jeff Hopkins',
    admissionNo: 'SST-251-1**/2024',
    idPassport: '******',
    gender: 'Male',
    dateOfBirth: '8/2/2005',
    email: 'example@gmail.com',
    phone: '0792*******',
    city: 'Nairobi',
    postalAddress: '0100 Embakasi',
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-slate-700" />
          Profile Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-4">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarImage src="" />
            <AvatarFallback className="bg-orange-600 text-white text-xl">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-slate-900 mb-1">{studentInfo.name}</h3>
          <p className="text-sm text-slate-500">{studentInfo.admissionNo}</p>
        </div>

        <Separator />

        {/* Basic Information */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Hash className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">ID/Passport</p>
              <p className="text-sm text-slate-900">{studentInfo.idPassport}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarIcon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">Date of Birth</p>
              <p className="text-sm text-slate-900">{studentInfo.dateOfBirth} ({calculateAge(studentInfo.dateOfBirth)} years)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm text-slate-900 break-all">{studentInfo.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">Phone</p>
              <p className="text-sm text-slate-900">{studentInfo.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm text-slate-900">{studentInfo.city}</p>
              <p className="text-xs text-slate-500 mt-0.5">{studentInfo.postalAddress}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Button */}
        <Button variant="outline" className="w-full">
          Update Information
        </Button>
      </CardContent>
    </Card>
  );
}

function calculateAge(dateOfBirth: string): number {
  const [month, day, year] = dateOfBirth.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}