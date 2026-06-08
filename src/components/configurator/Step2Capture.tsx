'use client';

import React from 'react';
import { useActiveConfig } from '@/store/useDemoStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, Users, Eye, HelpCircle, Hammer, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Step2Capture() {
  const { setStep, answers, setAnswer, addTag, removeTag } = useActiveConfig();

  const handleSelect = (key: string, value: any, tagLabel?: string) => {
    setAnswer(key, value);
    if (tagLabel) {
      if (answers[key]) removeTag(`${tagLabel}: ${answers[key]}`);
      if (value !== '0' && value !== 'No') {
        addTag(`${tagLabel}: ${value}`);
      } else {
        removeTag(`${tagLabel}: ${answers[key]}`);
      }
    }
  };

  const handleMultiSelect = (key: string, value: string) => {
    const current = answers[key] || [];
    const exists = current.includes(value);
    const newValues = exists ? current.filter((v: string) => v !== value) : [...current, value];
    setAnswer(key, newValues);
    
    if (exists) {
      removeTag(`Access: ${value}`);
    } else {
      addTag(`Access: ${value}`);
    }
  };

  const OptionButton = ({ 
    selected, 
    onClick, 
    children 
  }: { 
    selected: boolean, 
    onClick: () => void, 
    children: React.ReactNode 
  }) => (
    <Button
      variant={selected ? "default" : "outline"}
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border h-auto",
        selected 
          ? "bg-blue-600/10 text-blue-800 border-blue-600 ring-1 ring-blue-600 shadow-sm hover:bg-blue-600/15" 
          : "bg-white text-slate-650 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
      )}
    >
      {children}
    </Button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Key Requirements</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Specify core space, capacity, and architectural features. Our AI updates recommendations in real-time.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Section 1: Capacity & Facilities */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Capacity & Facilities</span>
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Meeting Space Seats */}
            <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
              <div className="mb-4">
                <Label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-555" />
                  <span>Private Offices Required</span>
                </Label>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Number of dedicated private offices needed</p>
              </div>
              <div className="relative max-w-[160px]">
                <Input 
                  type="number" 
                  min="0"
                  className="pl-3 pr-24 py-2 rounded-xl border-slate-200 text-slate-800 font-bold focus-visible:ring-blue-600"
                  placeholder="0"
                  value={answers.meetingSeats || ''}
                  onChange={(e) => {
                    if (answers.meetingSeats) {
                      removeTag(`${answers.meetingSeats} Private Offices`);
                    }
                    setAnswer('meetingSeats', e.target.value);
                    if (e.target.value && parseInt(e.target.value) > 0) {
                      addTag(`${e.target.value} Private Offices`);
                    }
                  }}
                />
                <span className="absolute right-9 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">Offices</span>
              </div>
            </Card>

            {/* Restrooms */}
            <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
              <div className="mb-4">
                <Label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-555" />
                  <span>Restrooms in Unit</span>
                </Label>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Internal plumbing & toilet units count</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['0', '1', '2', '3+'].map(val => (
                  <OptionButton 
                    key={val} 
                    selected={answers.restrooms === val} 
                    onClick={() => handleSelect('restrooms', val, 'Restrooms')}
                  >
                    {val === '0' ? 'None' : `${val} Unit`}
                  </OptionButton>
                ))}
              </div>
            </Card>

          </div>
        </div>

        {/* Section 2: Exterior, Elevation & Access */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Architecture & Access</span>
          <div className="grid gap-4">
            
            {/* Access Requirements */}
            <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
              <div className="mb-4">
                <Label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Hammer className="w-3.5 h-3.5 text-slate-555" />
                  <span>Building Access Requirements</span>
                </Label>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Specify compliance requirements for entrances (Select all that apply)</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Ground-level entry', 'ADA ramp required', 'Stairs acceptable', 'Multi-entry points'].map(val => {
                  const isSelected = (answers.accessReqs || []).includes(val);
                  return (
                    <OptionButton 
                      key={val} 
                      selected={isSelected} 
                      onClick={() => handleMultiSelect('accessReqs', val)}
                    >
                      {val}
                    </OptionButton>
                  );
                })}
              </div>
            </Card>



          </div>
        </div>

        {/* Section 3: Engineering & Environmental Specifications */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Environmental Specs</span>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'premiumFinishes', label: 'High Profile / Premium Site?', desc: 'Upgraded facade & fixtures' },
              { id: 'multiStory', label: 'Multi-Story Complex?', desc: 'Stacked multi-levels' },
              { id: 'blastResistant', label: 'Blast Resistant Space?', desc: 'Hardened structure security' },
              { id: 'officeStorage', label: 'Office / Storage Combo?', desc: 'Dual-use floorplan' },
            ].map((q) => (
              <Card key={q.id} className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <Label className="text-xs font-bold text-slate-850 block">{q.label}</Label>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{q.desc}</p>
                </div>
                <div className="flex gap-2">
                  <OptionButton 
                    selected={answers[q.id] === 'Yes'} 
                    onClick={() => handleSelect(q.id, 'Yes', q.label.replace('?', ''))}
                  >
                    Yes
                  </OptionButton>
                  <OptionButton 
                    selected={answers[q.id] === 'No'} 
                    onClick={() => handleSelect(q.id, 'No')}
                  >
                    No
                  </OptionButton>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 4: Manual Requirements */}
        <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
          <div className="mb-4">
            <Label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-555" />
              <span>Other Specific Engineering Requests</span>
            </Label>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">Enter site instructions, specific mechanical requests, or layout directives.</p>
          </div>
          <Textarea 
            placeholder="e.g., Heavy duty floor loading capability, specialized computer lab wiring routing..."
            className="resize-none rounded-xl border-slate-200 text-slate-800 text-xs min-h-[90px] focus-visible:ring-blue-600"
            value={answers.manualEntry || ''}
            onChange={(e) => setAnswer('manualEntry', e.target.value)}
          />
        </Card>

      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline"
          onClick={() => setStep(1)} 
          size="lg" 
          className="text-slate-600 font-bold px-6 border-slate-200 hover:bg-slate-50 rounded-xl"
        >
          Back
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-md shadow-blue-600/10 rounded-xl"
        >
          Configure Floor Plan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}