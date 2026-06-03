'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Step2Capture() {
  const { setStep, answers, setAnswer, addTag, removeTag } = useActiveConfig();

  const handleSelect = (key: string, value: any, tagLabel?: string) => {
    // For single select (radio behavior)
    setAnswer(key, value);
    if (tagLabel) {
      // Remove old tag if exists
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
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
        selected 
          ? "bg-slate-900 text-white border-slate-900 shadow-md" 
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Key Requirements</h2>
        <p className="text-slate-500 mt-2">Select your primary needs. You can add manual requirements at the bottom.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Meeting Space Seats */}
        <Card className="p-5 border-slate-200 shadow-sm">
          <div className="mb-4">
            <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">Meeting Space Seats</Label>
            <p className="text-xs text-slate-400 mt-1">Conference / Collaboration seating in common area</p>
          </div>
          <Input 
            type="number" 
            min="0"
            className="w-32"
            placeholder="0"
            value={answers.meetingSeats || ''}
            onChange={(e) => {
              setAnswer('meetingSeats', e.target.value);
              if (e.target.value && parseInt(e.target.value) > 0) {
                addTag(`${e.target.value} Meeting Seats`);
              }
            }}
          />
        </Card>

        {/* Restrooms */}
        <Card className="p-5 border-slate-200 shadow-sm">
          <div className="mb-4">
            <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">Restrooms in Unit</Label>
            <p className="text-xs text-slate-400 mt-1">Private restrooms inside the unit</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['0', '1', '2', '3+'].map(val => (
              <OptionButton 
                key={val} 
                selected={answers.restrooms === val} 
                onClick={() => handleSelect('restrooms', val, 'Restrooms')}
              >
                {val}
              </OptionButton>
            ))}
          </div>
        </Card>

        {/* Access Requirements */}
        <Card className="p-5 border-slate-200 shadow-sm md:col-span-2">
          <div className="mb-4">
            <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">Building Access Requirements</Label>
            <p className="text-xs text-slate-400 mt-1">How occupants and visitors enter (Select all that apply)</p>
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

        {/* Style / Elevation */}
        <Card className="p-5 border-slate-200 shadow-sm md:col-span-2">
          <div className="mb-4">
            <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">Building Style / Elevation</Label>
            <p className="text-xs text-slate-400 mt-1">Visual and architectural preference</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Standard', 'HQ / Premium', 'Industrial', 'No preference'].map(val => (
              <OptionButton 
                key={val} 
                selected={answers.buildingStyle === val} 
                onClick={() => handleSelect('buildingStyle', val, 'Style')}
              >
                {val}
              </OptionButton>
            ))}
          </div>
        </Card>

        {/* Binary Questions */}
        {[
          { id: 'spaceConstrained', label: 'Space-Constrained Site?', desc: 'Limited site area restricting unit placement' },
          { id: 'premiumFinishes', label: 'Premium Finishes Required?', desc: 'Upgraded interior materials & fixtures' },
          { id: 'multiStory', label: 'Multi-Story Required?', desc: 'Stacked or multi-level configuration' },
          { id: 'blastResistant', label: 'Blast Resistant Space?', desc: 'Hardened structure for security environments' },
          { id: 'officeStorage', label: 'Office / Storage Combo?', desc: 'Unit with integrated storage space' },
        ].map((q) => (
          <Card key={q.id} className="p-5 border-slate-200 shadow-sm">
            <div className="mb-4">
              <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">{q.label}</Label>
              <p className="text-xs text-slate-400 mt-1">{q.desc}</p>
            </div>
            <div className="flex gap-2">
              <OptionButton 
                selected={answers[q.id] === 'Yes'} 
                onClick={() => handleSelect(q.id, 'Yes', q.label.replace('?', ''))}
              >
                YES
              </OptionButton>
              <OptionButton 
                selected={answers[q.id] === 'No'} 
                onClick={() => handleSelect(q.id, 'No')}
              >
                NO
              </OptionButton>
            </div>
          </Card>
        ))}

        {/* Manual Entry */}
        <Card className="p-5 border-slate-200 shadow-sm md:col-span-2">
          <div className="mb-4">
            <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">Other Specific Requirements</Label>
            <p className="text-xs text-slate-400 mt-1">Anything else we should know? (Custom layouts, special equipment, etc.)</p>
          </div>
          <Textarea 
            placeholder="e.g., We need a reinforced floor for heavy machinery..."
            className="resize-none"
            value={answers.manualEntry || ''}
            onChange={(e) => setAnswer('manualEntry', e.target.value)}
          />
        </Card>

      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={() => setStep(3)} 
          size="lg" 
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-md"
        >
          Get My Unit Recommendation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
