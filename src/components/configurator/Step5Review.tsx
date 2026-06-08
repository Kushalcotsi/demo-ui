'use client';

import React from 'react';
import { useActiveConfig } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, CheckCircle2, Building, Calendar, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Step5Review() {
  const { solutionType, tags, answers, setStep } = useActiveConfig();
  const [generated, setGenerated] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Your PDF proposal has been downloaded successfully.');
    }, 1500);
  };

  const getSolutionLabel = () => {
    switch (solutionType) {
      case 'office': return 'Modular Office Workspace';
      case 'storage': return 'Secure Storage Solution';
      case 'healthcare': return 'Modular Healthcare Unit';
      case 'education': return 'Educational Classroom Module';
      default: return 'Custom Engineered Solution';
    }
  };

  if (generated) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center py-16 space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-in zoom-in duration-300" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Proposal Generated!</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Your custom workspace design specifications have been locked. The official quotation is ready for review.
          </p>
        </div>

        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 w-full max-w-sm text-left flex justify-between items-center text-xs text-slate-600 font-semibold shadow-inner">
          <span className="flex items-center"><ClipboardCheck className="w-4 h-4 mr-2 text-slate-500" /> Ref ID: WS-2026-894C</span>
          <span className="text-[10px] bg-slate-200 text-slate-805 px-2 py-0.5 rounded">Status: Locked</span>
        </div>

        <Button 
          size="lg" 
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-lg shadow-blue-600/10 rounded-xl"
        >
          <Download className={`w-4 h-4 mr-2 ${downloading ? 'animate-bounce' : ''}`} />
          {downloading ? 'Compiling PDF...' : 'Download PDF Proposal'}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Review & Generate</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Verify configuration blueprints, architectural specifications, and estimated rates.
        </p>
      </div>

      <Card className="border-slate-200 bg-white rounded-2xl overflow-hidden shadow-md">
        {/* Quote Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">WillScot Workspace Quote</span>
            <h3 className="text-lg font-bold tracking-tight">{getSolutionLabel()}</h3>
            <div className="flex items-center text-[10px] text-slate-400 font-semibold mt-1">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Quote Date: June 5, 2026</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-blue-400">$1,200</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Monthly Rent</div>
          </div>
        </div>

        <div className="p-6 space-y-6 text-sm">
          
          {/* Section 1: Active Specs */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Captured Specifications</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => (
                <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-650 border border-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Section 2: Interior Breakdown */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Facility Specifications</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-semibold">Plumbed Restroom Block</span>
                <span className="text-slate-800 font-bold">{answers.restroom ? 'Included' : 'Not Added'}</span>
              </div>
              
              {answers.restroom && answers.restroomType && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-semibold">Restroom Class</span>
                  <span className="text-slate-800 font-bold">{answers.restroomType} Compliant</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-semibold">HVAC Climate Package</span>
                <span className="text-slate-800 font-bold">{answers.hvac ? 'Active Climate Pack' : 'Standard Ventilation Only'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-semibold">Structure Fit Rating</span>
                <span className="text-emerald-700 font-extrabold">98% (Compliant)</span>
              </div>
            </div>
          </div>

        </div>
      </Card>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button 
          variant="outline"
          onClick={() => setStep(4)} 
          size="lg" 
          className="text-slate-600 font-bold px-6 border-slate-200 hover:bg-slate-50 rounded-xl"
        >
          Back
        </Button>
        <Button 
          onClick={() => setGenerated(true)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 shadow-md rounded-xl"
        >
          <FileText className="w-4 h-4 mr-2" />
          Lock Design & Lock Quote
        </Button>
      </div>
    </motion.div>
  );
}
