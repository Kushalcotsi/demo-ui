'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function Step3Configuration() {
  const { answers, setAnswer, setStep, addTag, removeTag } = useActiveConfig();

  const handleToggle = (key: string, checked: boolean, tagLabel?: string) => {
    setAnswer(key, checked);
    if (tagLabel) {
      if (checked) addTag(tagLabel);
      else removeTag(tagLabel);
    }
  };

  const handleSelect = (key: string, value: string, oldTag?: string, newTagPrefix?: string) => {
    setAnswer(key, value);
    if (newTagPrefix) {
      if (oldTag && answers[key]) removeTag(`${newTagPrefix}: ${answers[key]}`);
      addTag(`${newTagPrefix}: ${value}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Refine Configuration</h2>
        <p className="text-slate-500 mt-2">Adjust your requirements. Our AI will update its recommendations in real-time.</p>
      </div>

      <div className="space-y-6">
        
        {/* Q1: Restroom */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Include Restroom?</Label>
              <p className="text-sm text-slate-500 mt-1">Add internal restroom facilities to the unit.</p>
            </div>
            <Switch 
              checked={answers.restroom || false} 
              onCheckedChange={(c) => handleToggle('restroom', c, 'Restroom')}
            />
          </div>
        </Card>

        <AnimatePresence>
          {answers.restroom && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-6 bg-slate-50/50 border-blue-100 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-lg" />
                <div className="space-y-4 ml-2">
                  <Label className="text-base font-semibold">Restroom Type</Label>
                  <Select 
                    onValueChange={(v) => handleSelect('restroomType', v, answers.restroomType, 'Restroom')}
                    value={answers.restroomType}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="ADA">ADA Compliant</SelectItem>
                      <SelectItem value="Multi-stall">Multi-stall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Q2: HVAC */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">HVAC System</Label>
              <p className="text-sm text-slate-500 mt-1">Heating, Ventilation, and Air Conditioning.</p>
            </div>
            <Switch 
              checked={answers.hvac || false} 
              onCheckedChange={(c) => handleToggle('hvac', c, 'HVAC Included')}
            />
          </div>
        </Card>

      </div>

      <div className="flex justify-end pt-6 border-t border-slate-200">
        <Button 
          onClick={() => setStep(4)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md"
        >
          View Recommendations
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
