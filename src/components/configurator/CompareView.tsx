'use client';

import React from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompareView() {
  const { versions, customerName, setActiveVersion } = useDemoStore();

  const getAnswerDisplay = (ans: any) => {
    if (ans === true || ans === 'Yes') return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (ans === false || ans === 'No') return <X className="w-5 h-5 text-slate-300 mx-auto" />;
    if (Array.isArray(ans)) return ans.join(', ');
    return ans || '-';
  };

  const attributes = [
    { key: 'meetingSeats', label: 'Meeting Seats' },
    { key: 'restrooms', label: 'Restrooms' },
    { key: 'accessReqs', label: 'Access Reqs' },
    { key: 'buildingStyle', label: 'Style' },
    { key: 'premiumFinishes', label: 'Premium Finishes' },
    { key: 'multiStory', label: 'Multi-Story' },
    { key: 'blastResistant', label: 'Blast Resistant' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Comparing Options for {customerName}</h2>
        <p className="text-slate-500 mt-2">Review your configurations side-by-side.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {versions.map((v) => (
          <Card key={v.id} className="p-6 border-2 border-slate-200">
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{v.name}</h3>
                <p className="text-sm text-slate-500">{v.solutionType === 'office' ? 'Office Space' : v.solutionType || 'Not Selected'}</p>
              </div>
              <button 
                onClick={() => setActiveVersion(v.id)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-md"
              >
                Edit Option
              </button>
            </div>

            <div className="space-y-4">
              {attributes.map(attr => (
                <div key={attr.key} className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm font-medium text-slate-500">{attr.label}</span>
                  <span className="text-sm text-slate-900 font-semibold text-right">
                    {getAnswerDisplay(v.answers[attr.key])}
                  </span>
                </div>
              ))}
              
              <div className="pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Active Tags</span>
                <div className="flex flex-wrap gap-1">
                  {v.tags.length === 0 && <span className="text-xs text-slate-400">None</span>}
                  {v.tags.map(t => (
                    <Badge key={t} variant="secondary" className="bg-slate-100 text-slate-600 text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
