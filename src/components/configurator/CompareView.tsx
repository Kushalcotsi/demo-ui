'use client';

import React from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Edit, Sliders, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

export function CompareView() {
  const { versions, customerName, setActiveVersion } = useDemoStore();

  const getAnswerDisplay = (ans: any) => {
    if (ans === true || ans === 'Yes') {
      return (
        <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150">
          <Check className="w-3.5 h-3.5 mr-1" /> Yes
        </span>
      );
    }
    if (ans === false || ans === 'No') {
      return (
        <span className="inline-flex items-center text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
          <X className="w-3.5 h-3.5 mr-1" /> No
        </span>
      );
    }
    if (Array.isArray(ans)) {
      return (
        <div className="flex flex-wrap gap-1 justify-end">
          {ans.map(val => (
            <Badge key={val} variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0">
              {val}
            </Badge>
          ))}
        </div>
      );
    }
    return ans ? <span className="font-bold text-slate-800">{ans}</span> : <span className="text-slate-400">-</span>;
  };

  const attributes = [
    { key: 'meetingSeats', label: 'Meeting Space Seats' },
    { key: 'restrooms', label: 'Restrooms Plumbed' },
    { key: 'accessReqs', label: 'Entrance Access Requirements' },
    { key: 'buildingStyle', label: 'Elevation style' },
    { key: 'premiumFinishes', label: 'Premium Finishes' },
    { key: 'multiStory', label: 'Multi-Story Complex' },
    { key: 'blastResistant', label: 'Blast Resistant Hardening' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Comparing Options for {customerName}</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Side-by-side analysis of space parameters, engineering standards, and amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {versions.map((v) => (
          <Card key={v.id} className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-md">
            
            {/* Header */}
            <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">WillScot Option</span>
                <h3 className="text-base font-bold tracking-tight">{v.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {v.solutionType === 'office' ? 'Modular Office Space' : v.solutionType === 'storage' ? 'Secure Storage' : 'Custom Configured'}
                </p>
              </div>
              <Button 
                onClick={() => setActiveVersion(v.id)}
                size="sm"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-slate-800 hover:bg-slate-750 px-3.5 py-1.5 rounded-lg flex items-center transition-colors h-auto border-none shadow-none"
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Configure
              </Button>
            </div>

            {/* Spec Table */}
            <div className="p-6 space-y-4">
              
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">blueprints specs</span>
                {attributes.map(attr => (
                  <div key={attr.key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-550">{attr.label}</span>
                    <span className="text-xs text-right">
                      {getAnswerDisplay(v.answers[attr.key])}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Tags section */}
              <div className="pt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Active spec tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {v.tags.length === 0 ? (
                    <span className="text-xs text-slate-450 italic">No tags defined</span>
                  ) : (
                    v.tags.map(t => (
                      <Badge key={t} variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-semibold py-0.5 px-2">
                        {t}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
