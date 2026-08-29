import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sparkles, Download, Plus, Trash2, Wand2, Loader2, Save, Copy, FileText, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

type Experience = { id: string; defaultCompany: string; defaultRole: string; description: string };

export default function BuilderPage() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer specializing in scalable frontend architectures and modern web technologies. Passionate about AI-driven user experiences and building robust applications.',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      defaultCompany: 'Tech Solutions Inc.',
      defaultRole: 'Lead Frontend Developer',
      description: '• Led a team of 5 engineers to migrate legacy React app to Next.js.\n• Improved Core Web Vitals by 40%.\n• Implemented automated testing suite.',
    }
  ]);

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const addExperience = () => {
    setExperiences([...experiences, { id: crypto.randomUUID(), defaultCompany: '', defaultRole: '', description: '' }]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };
  
  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleAiImprove = async (textToImprove: string, type: 'summary' | 'experience', id?: string) => {
    if (!textToImprove.trim()) {
      toast.error('Please enter some text first.');
      return;
    }
    
    setIsEnhancing(true);
    try {
      const instruction = type === 'summary' 
        ? 'rewrite this professional summary to be highly impactful, concise, and ATS-friendly'
        : 'rewrite these bullet points to use strong action verbs, highlight measurable achievements, and be highly ATS-friendly';

      const response = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToImprove, instruction }),
      });

      if (!response.ok) {
        throw new Error('Failed to improve text');
      }

      const data = await response.json();
      
      if (type === 'summary') {
        setPersonalInfo(prev => ({ ...prev, summary: data.improvedText }));
      } else if (id) {
        updateExperience(id, 'description', data.improvedText);
      }
      
      toast.success('Text improved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to connect to AI Assistant. Ensure server is running and API key is set.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const ResumePreviewContent = () => (
    <>
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Executive Template</span>
        <div className="flex gap-2 lg:gap-4">
          <Button variant="outline" className="hidden lg:flex px-4 py-2 text-sm font-semibold border-slate-200 rounded-lg hover:bg-slate-50">Preview PDF</Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button className="gap-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-indigo-200 px-4 py-2 font-semibold" />}>
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download Resume</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem className="cursor-pointer" onClick={() => toast.success('Exporting as PDF...')}>
                Export as PDF (.pdf)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => toast.success('Exporting as Word...')}>
                Export as Word (.docx)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => toast.success('Exporting as Text...')}>
                Export as Text (.txt)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* The Resume Document - A4 Aspect Ratio Appox */}
      <div className="w-full max-w-[800px] lg:aspect-[1/1.414] min-h-[800px] flex-shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-6 lg:p-10 font-serif overflow-y-auto shadow-sm">
        <div className="max-w-[400px] mx-auto text-slate-800">
          {/* Resume Header */}
          <h2 className="text-3xl font-bold text-center border-b-2 border-slate-800 pb-2 mb-4 uppercase">{personalInfo.fullName || 'Your Name'}</h2>
          <p className="text-center text-xs tracking-widest uppercase mb-6">
            {personalInfo.jobTitle || 'Your Title'} {personalInfo.location && `• ${personalInfo.location}`}
          </p>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase border-b border-slate-300 mb-2">Professional Summary</h3>
              <p className="text-[10px] leading-relaxed text-slate-600 italic whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase border-b border-slate-300 mb-2">Experience</h3>
            {experiences.map(exp => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-[11px] font-bold uppercase">{exp.defaultRole || 'Role'} @ {exp.defaultCompany || 'Company'}</span>
                </div>
                <div className="text-[9px] list-disc list-inside text-slate-600 space-y-1 whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] w-full bg-[#F8FAFC] p-2 md:p-4 lg:p-8 gap-5 overflow-hidden flex-col lg:flex-row relative">
      {/* Mobile Floating Action Button for Preview */}
      <div className="lg:hidden absolute bottom-6 right-6 z-10">
        <Sheet>
          <SheetTrigger render={<Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700" />}>
            <FileText className="h-6 w-6 text-white" />
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] p-0 flex flex-col bg-slate-100 rounded-t-3xl pt-8">
             <SheetHeader className="px-6 pb-2">
              <SheetTitle className="sr-only">Resume Preview</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-8 flex flex-col items-center">
              <ResumePreviewContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Editor Panel */}
      <div className="w-full lg:w-[45%] flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 overflow-y-auto flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
            <p className="text-slate-500 text-sm">Welcome back. Your resume is 92% optimized.</p>
          </div>
          <Button onClick={() => toast.success('Draft saved successfully')} variant="outline" size="sm" className="gap-2 font-semibold border-slate-200 rounded-lg hover:bg-slate-50 w-full sm:w-auto">
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-8 shrink-0">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6 flex-1">
            <Card className="rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" value={personalInfo.jobTitle} onChange={e => setPersonalInfo({...personalInfo, jobTitle: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={personalInfo.location} onChange={e => setPersonalInfo({...personalInfo, location: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4 pb-2">
                <div>
                  <CardTitle className="text-lg">Professional Summary</CardTitle>
                  <CardDescription className="text-xs">A brief overview of your background.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-2 text-slate-500 hover:bg-slate-100 rounded-lg font-bold"
                    onClick={() => {
                      navigator.clipboard.writeText(personalInfo.summary);
                      toast.success('Copied to clipboard');
                    }}
                  >
                    <Copy className="w-4 h-4" /> <span className="sr-only">Copy</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-bold whitespace-nowrap"
                    onClick={() => handleAiImprove(personalInfo.summary, 'summary')}
                    disabled={isEnhancing}
                  >
                    {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    AI Enhance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea 
                  className="min-h-[120px]" 
                  value={personalInfo.summary}
                  onChange={e => setPersonalInfo({...personalInfo, summary: e.target.value})}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Button onClick={addExperience} size="sm" variant="outline" className="gap-2 border-slate-200">
                <Plus className="w-4 h-4" /> Add Role
              </Button>
            </div>
            
            {experiences.map((exp, index) => (
              <Card key={exp.id} className="relative rounded-2xl border border-slate-200 shadow-sm">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-slate-400 hover:text-destructive hover:bg-red-50"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <CardHeader>
                  <CardTitle className="text-base text-slate-900">Experience {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input value={exp.defaultCompany} onChange={e => updateExperience(exp.id, 'defaultCompany', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Role</Label>
                      <Input value={exp.defaultRole} onChange={e => updateExperience(exp.id, 'defaultRole', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <Label>Achievements (Bullet Points)</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 gap-1.5 text-slate-500 font-bold hover:bg-slate-100 rounded-lg"
                          onClick={() => {
                            navigator.clipboard.writeText(exp.description);
                            toast.success('Copied to clipboard');
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 gap-1.5 text-indigo-700 font-bold hover:bg-indigo-50 rounded-lg"
                          onClick={() => handleAiImprove(exp.description, 'experience', exp.id)}
                          disabled={isEnhancing}
                        >
                          {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                          Rewrite
                        </Button>
                      </div>
                    </div>
                    <Textarea 
                      className="min-h-[120px]" 
                      value={exp.description}
                      onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        {/* Placeholder for spacer so FAB doesn't cover content on mobile */}
        <div className="h-20 lg:hidden shrink-0" />
      </div>

      {/* Desktop Preview Panel */}
      <div className="hidden lg:flex flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex-col items-center overflow-y-auto relative">
        <ResumePreviewContent />
      </div>
    </div>
  );
}
