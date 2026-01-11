import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../ui/dialog';
import { HelpCircle, MessageSquare, AlertTriangle, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
    {
        question: "How do I register for units?",
        answer: "Go to the Course Registration page, select your academic year and semester, then choose your units from the available list. Click 'Register' to confirm."
    },
    {
        question: "How can I download my fee structure?",
        answer: "Navigate to the Fee Structure page, select your programme, and click the 'Download PDF' button at the top right."
    },
    {
        question: "Where can I view my exam results?",
        answer: "Your results are available on the 'Provisional Results' page. You can view them by academic year and semester."
    },
    {
        question: "I forgot my password, how do I reset it?",
        answer: "Use the 'Reset Password' link on the login page or go to settings if you are already logged in to change your password."
    },
    {
        question: "How do I apply for accommodation?",
        answer: "Visit the Accommodation page to view available rooms and submit your booking request."
    }
];

export function SupportPage() {
    const [showTaskyModal, setShowTaskyModal] = useState(false);
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');

    const complexIssues = ['missing-marks', 'fee-dispute', 'clearance-issue', 'disciplinary'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if the issue is complex ("Tasky")
        if (complexIssues.includes(issueType) || description.toLowerCase().includes('mistake') || description.toLowerCase().includes('error')) {
            setShowTaskyModal(true);
        } else {
            toast.success("Support ticket submitted! We will contact you shortly.");
            setIssueType('');
            setDescription('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Help & Support</h1>
                <p className="text-lg text-slate-700">Find answers to common questions or contact our support team.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FAQ Section */}
                <div className="space-y-6">
                    <Card className="bg-white border-slate-200 shadow-md p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle className="w-5 h-5 text-orange-600" />
                            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-orange-600">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200 p-6">
                        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Direct Contact
                        </h3>
                        <div className="space-y-2 text-sm text-blue-800">
                            <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> +254 700 000 000</p>
                            <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> student.support@mmu.ac.ke</p>
                            <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Student Center, Ground Floor</p>
                        </div>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                    <Card className="bg-white border-slate-200 shadow-md p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                            <h2 className="text-xl font-bold text-slate-900">Submit a Ticket</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="issue-type">Issue Category</Label>
                                <select
                                    id="issue-type"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                    required
                                >
                                    <option value="">Select a category...</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="technical">Technical Issue</option>
                                    <option value="login">Login/Password Reset</option>
                                    <option value="missing-marks">Missing Marks</option>
                                    <option value="fee-dispute">Fee Dispute/Arrears</option>
                                    <option value="clearance-issue">Clearance Issues</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Brief summary of your issue" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please describe your issue in detail..."
                                    className="min-h-[150px]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                Submit Ticket
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>

            {/* Tasky Case Modal */}
            <Dialog open={showTaskyModal} onOpenChange={setShowTaskyModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-amber-600">
                            <AlertTriangle className="w-6 h-6" />
                            Complex Issue Detected
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-slate-700 text-base">
                            It looks like your situation is kind of <strong>"Tasky"</strong> (complex).
                            <br /><br />
                            For issues regarding missing marks, fee disputes, or clearance, we recommend visiting the physical office for further assistance and immediate resolution.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-amber-50 p-4 rounded-md border border-amber-200 my-2">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-semibold text-amber-800">Visit Us At:</p>
                                <p className="text-amber-700 text-sm">Registrar's Office, Admin Block A, Room 102</p>
                                <p className="text-amber-700 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowTaskyModal(false)} className="w-full sm:w-auto">
                            I Understand, I'll Visit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
