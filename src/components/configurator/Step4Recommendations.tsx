'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OPTIONS = [
  { id: 'cost', label: 'Cost Optimized', price: '$850/mo', desc: 'Basic functional space without premium features.', match: '82%', features: ['Standard Finishes', 'Basic HVAC', 'Standard Delivery'] },
  { id: 'rec', label: 'Recommended', price: '$1,200/mo', desc: 'The perfect balance of comfort and utility based on your needs.', match: '98%', features: ['Premium Layout', 'Enhanced HVAC', 'Priority Delivery', 'ADA Support'], highlight: true },
  { id: 'premium', label: 'Premium', price: '$1,750/mo', desc: 'Top-tier finishes and maximum comfort for your team.', match: '91%', features: ['Luxury Finishes', 'Smart Climate Control', 'Next-Day Delivery', 'Full Turnkey'] },
];

export function Step4Recommendations() {
  const { setStep } = useActiveConfig();
  const [selected, setSelected] = React.useState('rec');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Recommended Solutions</h2>
        <p className="text-slate-500 mt-2">Based on your requirements, we have curated the best options for your project.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {OPTIONS.map((opt) => (
          <Card 
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`relative p-6 cursor-pointer transition-all duration-200 border-2 flex flex-col ${
              selected === opt.id ? 'border-blue-600 shadow-md ring-1 ring-blue-600' : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            {opt.highlight && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white shadow-sm">
                AI Top Pick
              </Badge>
            )}
            
            <div className="text-center mb-6 mt-2">
              <h3 className="font-semibold text-slate-900">{opt.label}</h3>
              <div className="text-sm font-medium text-emerald-600 mt-1">{opt.match} Match</div>
              <div className="mt-4 text-2xl font-bold text-slate-900">{opt.price}</div>
            </div>

            <p className="text-sm text-slate-500 text-center mb-6">{opt.desc}</p>

            <ul className="space-y-3 mt-auto mb-6">
              {opt.features.map(f => (
                <li key={f} className="flex items-start text-sm text-slate-700">
                  <Check className="w-4 h-4 mr-2 text-blue-600 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button 
              variant={selected === opt.id ? 'default' : 'outline'} 
              className={selected === opt.id ? 'bg-blue-600 hover:bg-blue-700 text-white w-full' : 'w-full'}
            >
              {selected === opt.id ? 'Selected' : 'Select Option'}
            </Button>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-200">
        <Button 
          onClick={() => setStep(5)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md"
        >
          Review & Finalize
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
