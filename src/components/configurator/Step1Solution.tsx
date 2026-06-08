'use client';

import React from 'react';
import { useActiveConfig } from '@/store/useDemoStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Package2, Stethoscope, GraduationCap, Compass, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SOLUTIONS = [
  { id: 'office', label: 'Office Space', icon: Building2, desc: 'Mobile offices & multi-unit complexes' },
  { id: 'storage', label: 'Storage Space', icon: Package2, desc: 'Secure containers & dry storage' },
  { id: 'healthcare', label: 'Healthcare Facilities', icon: Stethoscope, desc: 'Compliant clinics & testing units' },
  { id: 'education', label: 'Education & Classrooms', icon: GraduationCap, desc: 'Modern classrooms & learning spaces' },
  { id: 'custom', label: 'Custom Engineered', icon: Compass, desc: 'Bespoke administrative designs' },
];

export function Step1Solution() {
  const { solutionType, setSolutionType, setStep } = useActiveConfig();
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSolutionType(id);
    // Auto-advance after small delay for effect
    setTimeout(() => setStep(2), 350);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Select Solution Type</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Choose a primary workspace category. This configures the layout engine for optimal matching.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOLUTIONS.map((sol) => {
          const isSelected = solutionType === sol.id;
          const IconComponent = sol.icon;

          return (
            <Card 
              key={sol.id}
              onClick={() => handleSelect(sol.id)}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 border relative overflow-hidden group rounded-2xl flex flex-col justify-between min-h-[160px]",
                isSelected 
                  ? "border-blue-600 bg-blue-50/15 shadow-md shadow-blue-600/5 ring-1 ring-blue-600" 
                  : "border-slate-200 bg-white hover:border-slate-350 hover:shadow-lg hover:shadow-slate-100"
              )}
            >
              {/* Selected Checkmark Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              )}

              <div className="space-y-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isSelected 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-100 text-slate-650 group-hover:bg-blue-600/15 group-hover:text-blue-700"
                )}>
                  <IconComponent className="w-5.5 h-5.5" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-tight">{sol.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">{sol.desc}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-start pt-6 mt-4">
        <Button 
          variant="ghost"
          onClick={() => router.push('/customers')} 
          className="text-slate-500 font-bold px-4 hover:bg-slate-100 hover:text-slate-800 rounded-xl"
        >
          ← Back to Directory
        </Button>
      </div>
    </motion.div>
  );
}
