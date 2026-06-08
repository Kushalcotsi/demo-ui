'use client';

import React from 'react';
import { useActiveConfig, useDemoStore } from '@/store/useDemoStore';
import { Check, Compass, Layers, Sliders, Sparkles, FileCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  { id: 1, label: 'Solution Selection', desc: 'Choose unit category', icon: Compass },
  { id: 2, label: 'Key Requirements', desc: 'Define capacity & constraints', icon: Layers },
  { id: 3, label: 'Interior Options', desc: 'HVAC & restroom setup', icon: Sliders },
  { id: 4, label: 'Recommendations', desc: 'AI-curated workspace models', icon: Sparkles },
  { id: 5, label: 'Review & Proposal', desc: 'Export configuration quote', icon: FileCheck },
];

export function Sidebar() {
  const { currentStep, highestStep, setStep } = useActiveConfig();
  const { customerName, setCustomerName } = useDemoStore();

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 py-8 px-6 border-r border-slate-200">
      {/* Customer Header */}
      <div className="mb-10 flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 text-slate-600">
          <User className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Client Workspace</span>
          <Input 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="h-7 w-full bg-transparent border-none p-0 focus-visible:ring-0 font-bold text-slate-900 text-base shadow-none placeholder-slate-400 mt-0.5"
            placeholder="Enter Customer Name"
          />
        </div>
      </div>

      {/* Navigation Stepper using Shadcn ScrollArea */}
      <ScrollArea className="flex-1 -mx-2 px-2">
        <nav className="relative">
          <ol className="space-y-6 pr-3">
            {STEPS.map((step, index) => {
              const isActive = step.id === currentStep;
              const isUnlocked = step.id <= highestStep;
              const isCompleted = isUnlocked && !isActive;
              const StepIcon = step.icon;

              return (
                <li key={step.id} className="relative pb-6">
                  {/* Connecting Line using Shadcn Separator */}
                  {index !== STEPS.length - 1 && (
                    <Separator 
                      orientation="vertical" 
                      className={cn(
                        "absolute left-5.5 top-12 bottom-0 w-[2px] transition-colors duration-300",
                        isCompleted ? "bg-blue-600" : "bg-slate-200"
                      )} 
                    />
                  )}
                  
                  {/* Trigger using Shadcn Button */}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (isUnlocked) setStep(step.id);
                    }}
                    disabled={!isUnlocked}
                    className={cn(
                      "w-full justify-start items-start h-auto p-0 hover:bg-transparent text-left focus-visible:ring-blue-600/20 select-none group",
                      !isUnlocked && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-start">
                      {/* Indicator Icon badge */}
                      <div className={cn(
                        "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border relative z-10",
                        isCompleted 
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : isActive 
                            ? "bg-white border-blue-600 text-blue-600 shadow-md shadow-blue-600/5 ring-1 ring-blue-600/10" 
                            : "bg-slate-100 border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-500 group-hover:bg-slate-50"
                      )}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" strokeWidth={3} />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>

                      {/* Labels */}
                      <div className="ml-4 flex-1">
                        <span className={cn(
                          "text-sm font-semibold transition-colors duration-200 block leading-tight",
                          isActive ? "text-blue-600 font-bold" : isCompleted ? "text-slate-800 font-bold" : "text-slate-500 group-hover:text-slate-700"
                        )}>
                          {step.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  </Button>
                </li>
              );
            })}
          </ol>
        </nav>
      </ScrollArea>

      {/* Footer Info using Shadcn Badge */}
      <div className="mt-auto border-t border-slate-200 pt-6">
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Workspace AI
            </span>
          </div>
          <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-slate-200 text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md">
            v3.4.1
          </Badge>
        </div>
      </div>
    </div>
  );
}
