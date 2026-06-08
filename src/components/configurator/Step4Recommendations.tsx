'use client';

import React from 'react';
import { useActiveConfig } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles, Building, Box, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const OPTIONS = [
  { id: 'cost', label: 'Cost Optimized', price: '$850', period: 'mo', desc: 'Essential functional unit meeting baseline capacity standards.', match: '82%', icon: Box, features: ['Standard Facade Trim', 'Basic HVAC Unit', '14-Day Ground Delivery', 'Clean Interior Walls'] },
  { id: 'rec', label: 'Recommended Tier', price: '$1,200', period: 'mo', desc: 'The optimal structural layout containing all specified site features.', match: '98%', icon: Building, features: ['Premium HQ Facade', 'Enhanced HVAC System', '7-Day Priority Shipping', 'ADA Toilet Compliance', 'Reinforced Panel Framing'], highlight: true },
  { id: 'premium', label: 'Premium Class', price: '$1,750', period: 'mo', desc: 'Maximum performance finishes and full turnkey comfort additions.', match: '91%', icon: ShieldCheck, features: ['Architectural Elevation', 'Smart Climate Systems', '3-Day Expedited Setup', 'Premium Acoustic Tiles', 'Turnkey Furnishing Pack'] },
];

export function Step4Recommendations() {
  const { setStep } = useActiveConfig();
  const [selected, setSelected] = React.useState('rec');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Recommended Solutions</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Based on your criteria, our layout intelligence has configured three potential solution paths.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          const CardIcon = opt.icon;

          return (
            <Card 
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`relative cursor-pointer transition-all duration-300 border flex flex-col justify-between overflow-visible rounded-2xl p-6 ${
                isSelected 
                  ? 'border-blue-600 bg-blue-50/10 shadow-lg shadow-blue-600/5 ring-1 ring-blue-600' 
                  : 'border-slate-200 bg-white hover:border-slate-350 hover:shadow-md'
              } ${opt.highlight && !isSelected ? 'border-blue-200/60' : ''}`}
            >
              {opt.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold px-3 py-0.5 rounded-full text-[10px] tracking-wider uppercase border border-blue-700 shadow-md">
                  <Sparkles className="w-3 h-3 mr-1 fill-white" />
                  AI Choice
                </Badge>
              )}
              
              <div>
                <div className="flex justify-between items-start mb-4 mt-1">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600/20 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    <CardIcon className="w-4 h-4" />
                  </div>
                  <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-150 uppercase tracking-wider">
                    {opt.match} Fit
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-base leading-tight">{opt.label}</h3>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900">{opt.price}</span>
                  <span className="text-xs text-slate-400 font-semibold ml-1">/{opt.period}</span>
                </div>

                <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed min-h-[48px]">{opt.desc}</p>
                
                <div className="border-t border-slate-100 my-4" />

                <ul className="space-y-2.5 mb-6">
                  {opt.features.map(f => (
                    <li key={f} className="flex items-start text-xs text-slate-650 font-medium">
                      <Check className="w-3.5 h-3.5 mr-2 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={isSelected ? 'default' : 'outline'} 
                className={`w-full rounded-xl py-2 text-xs font-bold transition-all duration-300 ${
                  isSelected 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/10' 
                    : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isSelected ? 'Selected Package' : 'Select Package'}
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button 
          variant="outline"
          onClick={() => setStep(3)} 
          size="lg" 
          className="text-slate-600 font-bold px-6 border-slate-200 hover:bg-slate-50 rounded-xl"
        >
          Back
        </Button>
        <Button 
          onClick={() => setStep(5)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-xl"
        >
          Review & Export Proposal
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
