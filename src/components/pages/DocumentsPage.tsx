import { FileText, Download, Eye, FileCheck, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Sample documents data
const documentsData = [
  {
    id: 1,
    name: 'Student ID Card',
    category: 'ID Document',
    date: '15/01/2024',
    size: '1.2 MB',
    status: 'Available',
    type: 'id'
  },
  {
    id: 2,
    name: 'Admission Letter',
    category: 'Academic',
    date: '10/01/2024',
    size: '856 KB',
    status: 'Available',
    type: 'academic'
  },
  {
    id: 3,
    name: 'Fee Statement - Semester 1 2024',
    category: 'Financial',
    date: '20/03/2024',
    size: '654 KB',
    status: 'Available',
    type: 'financial'
  },
  {
    id: 4,
    name: 'Course Registration Confirmation',
    category: 'Academic',
    date: '25/01/2024',
    size: '432 KB',
    status: 'Available',
    type: 'academic'
  },
  {
    id: 5,
    name: 'Transcript Request',
    category: 'Academic',
    date: 'Pending',
    size: '-',
    status: 'Processing',
    type: 'academic'
  },
];

export function DocumentsPage() {
  const totalDocuments = documentsData.length;
  const availableDocuments = documentsData.filter(doc => doc.status === 'Available').length;
  const processingDocuments = documentsData.filter(doc => doc.status === 'Processing').length;

  const handleView = (docName: string) => {
    alert(`Viewing: ${docName}`);
  };

  const handleDownload = (docName: string) => {
    alert(`Downloading: ${docName}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Documents</h1>
        <p className="text-base text-slate-600">Access and download your student documents</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Documents */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Documents</p>
              <p className="text-3xl font-bold text-slate-900">{totalDocuments}</p>
            </div>
          </div>
        </Card>

        {/* Available */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Available</p>
              <p className="text-3xl font-bold text-slate-900">{availableDocuments}</p>
            </div>
          </div>
        </Card>

        {/* Processing */}
        <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Processing</p>
              <p className="text-3xl font-bold text-slate-900">{processingDocuments}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Documents List */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Documents</h2>
        <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
          <div className="divide-y divide-slate-200">
            {documentsData.map((doc, index) => (
              <div
                key={doc.id}
                className={`p-6 hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Document Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">{doc.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        {doc.size !== '-' && (
                          <>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center gap-3">
                    {doc.status === 'Available' ? (
                      <>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                          Available
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(doc.name)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(doc.name)}
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200 p-6">
        <h4 className="text-blue-900 font-semibold mb-3">Document Information</h4>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• All official documents are digitally signed and verified</li>
          <li>• Documents can be downloaded multiple times at no extra cost</li>
          <li>• Processing requests typically take 3-5 working days</li>
          <li>• For physical copies, visit the Registry Office</li>
        </ul>
      </Card>
    </div>
  );
}
