'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Step5Review() {
  const { solutionType, tags, answers } = useActiveConfig();
  const [generated, setGenerated] = React.useState(false);

  if (generated) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Proposal Generated!</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">Your configuration has been saved and the proposal is ready for download.</p>
        </div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mt-8">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Review & Generate</h2>
        <p className="text-slate-500 mt-2">Please review your final configuration before generating the proposal.</p>
      </div>

      <Card className="p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Project Workspace</h3>
            <p className="text-sm text-slate-500">{solutionType === 'office' ? 'Office Space' : 'Custom Solution'} • Recommended Tier</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">$1,200</div>
            <div className="text-sm text-slate-500">per month</div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Configuration Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-slate-500">Restroom Included</div>
              <div className="text-slate-900 font-medium text-right">{answers.restroom ? 'Yes' : 'No'}</div>
              
              {answers.restroomType && (
                <>
                  <div className="text-slate-500">Restroom Type</div>
                  <div className="text-slate-900 font-medium text-right">{answers.restroomType}</div>
                </>
              )}

              <div className="text-slate-500">HVAC System</div>
              <div className="text-slate-900 font-medium text-right">{answers.hvac ? 'Included' : 'None'}</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-6">
        <Button 
          onClick={() => setGenerated(true)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md w-full sm:w-auto"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Proposal
        </Button>
      </div>
    </motion.div>
  );
}
