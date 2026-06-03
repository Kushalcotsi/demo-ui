'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, label: 'Solution Selection' },
  { id: 2, label: 'Key Requirements' },
  { id: 3, label: 'Interior Options' },
  { id: 4, label: 'Recommendations' },
  { id: 5, label: 'Review & Proposal' },
];

export function Sidebar() {
  const { currentStep, setStep } = useActiveConfig();

  return (
    <div className="flex flex-col h-full py-8 px-6">
      <div className="mb-12">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">WillScot</h1>
        <p className="text-sm text-slate-500">Workspace Configurator</p>
      </div>

      <nav className="flex-1">
        <ol className="space-y-6">
          {STEPS.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <li key={step.id} className="relative">
                {/* Connecting line */}
                {index !== STEPS.length - 1 && (
                  <div className={cn(
                    "absolute left-3 top-8 w-[2px] h-10 -ml-[1px]",
                    isCompleted ? "bg-blue-600" : "bg-slate-200"
                  )} />
                )}
                
                <button
                  onClick={() => {
                    // Allow navigating backwards
                    if (isCompleted) setStep(step.id);
                  }}
                  disabled={!isCompleted && !isActive}
                  className="flex items-center group w-full text-left focus:outline-none"
                >
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    isCompleted ? "bg-blue-600 text-white" : 
                    isActive ? "border-2 border-blue-600 text-blue-600" : 
                    "border-2 border-slate-300 text-slate-400"
                  )}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : 
                     isActive ? <Circle className="w-2.5 h-2.5 fill-current" /> : 
                     <span className="text-xs font-medium">{step.id}</span>}
                  </div>
                  <span className={cn(
                    "ml-3 text-sm font-medium transition-colors",
                    isCompleted ? "text-slate-900" :
                    isActive ? "text-blue-600" : "text-slate-500"
                  )}>
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
