'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Building2, Package2, Stethoscope, GraduationCap, Tent, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SOLUTIONS = [
  { id: 'office', label: 'Office Space', icon: Building2, desc: 'Mobile offices & complexes' },
  { id: 'storage', label: 'Storage', icon: Package2, desc: 'Containers & dry storage' },
  { id: 'healthcare', label: 'Healthcare', icon: Stethoscope, desc: 'Clinics & testing' },
  { id: 'education', label: 'Education', icon: GraduationCap, desc: 'Classrooms & modules' },
  { id: 'custom', label: 'Custom', icon: Compass, desc: 'Tailored solutions' },
];

export function Step1Solution() {
  const { solutionType, setSolutionType, setStep } = useActiveConfig();

  const handleSelect = (id: string) => {
    setSolutionType(id);
    // Auto-advance after small delay for effect
    setTimeout(() => setStep(2), 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Select Solution Type</h2>
        <p className="text-slate-500 mt-2">What kind of space are you looking to configure today?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SOLUTIONS.map((sol) => (
          <Card 
            key={sol.id}
            onClick={() => handleSelect(sol.id)}
            className={cn(
              "p-6 cursor-pointer transition-all duration-200 border-2",
              "hover:shadow-md hover:border-blue-200",
              solutionType === sol.id ? "border-blue-600 bg-blue-50/50" : "border-transparent bg-white"
            )}
          >
            <sol.icon className={cn(
              "w-8 h-8 mb-4",
              solutionType === sol.id ? "text-blue-600" : "text-slate-700"
            )} />
            <h3 className="font-semibold text-slate-900">{sol.label}</h3>
            <p className="text-sm text-slate-500 mt-1">{sol.desc}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
