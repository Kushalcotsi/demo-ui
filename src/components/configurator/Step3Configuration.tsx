'use client';

import React from 'react';
import { useActiveConfig } from '@/store/useDemoStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Sliders, Layout, Map, Wind, Eye, DoorClosed, Grid, Package } from 'lucide-react';

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Refine Configuration</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Customize interior fittings and system amenities. Our blueprint engine maps placements instantly.
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        
        {/* Left Column / Controls */}
        <div className="space-y-4">
          
          {/* Restroom Toggle Card */}
          <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <Layout className="w-4 h-4 text-slate-600" />
                  <span>Include Plumbed Restroom</span>
                </Label>
                <p className="text-[11px] text-slate-400 leading-normal">Integrate a private internal washroom facility inside the unit.</p>
              </div>
              <Switch 
                checked={answers.restroom || false} 
                onCheckedChange={(c) => handleToggle('restroom', c, 'Restroom')}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </Card>

          {/* Restroom Select Sub-card */}
          <AnimatePresence>
            {answers.restroom && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <Card className="p-5 bg-slate-50/40 border-blue-200 relative rounded-2xl">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-2xl" />
                  <div className="space-y-3.5 ml-2">
                    <Label className="text-xs font-bold text-slate-800">Select Restroom Standard</Label>
                    <Select 
                      onValueChange={(v) => handleSelect('restroomType', v, answers.restroomType, 'Restroom')}
                      value={answers.restroomType || "Standard"}
                    >
                      <SelectTrigger className="bg-white rounded-xl border-slate-200 text-xs font-bold focus:ring-blue-600">
                        <SelectValue placeholder="Select restroom type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard Facility</SelectItem>
                        <SelectItem value="ADA">ADA Compliant (Wheelchair accessible)</SelectItem>
                        <SelectItem value="Multi-stall">Multi-stall Complex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HVAC Toggle Card */}
          <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-slate-600" />
                  <span>HVAC Climate Control</span>
                </Label>
                <p className="text-[11px] text-slate-400 leading-normal">Smart heating, ventilation, and air conditioning package.</p>
              </div>
              <Switch 
                checked={answers.hvac || false} 
                onCheckedChange={(c) => handleToggle('hvac', c, 'HVAC Included')}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </Card>

        </div>

        {/* Blueprint Floorplan Mockup Card */}
        <Card className="border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <Label className="text-xs font-bold text-slate-850 flex items-center space-x-2">
                <Map className="w-4 h-4 text-slate-600" />
                <span>Interactive Floorplan Blueprint</span>
              </Label>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">Real-time placement schema mapping.</p>
            </div>
            <div className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
              <Eye className="w-3 h-3" />
              <span>Live Schema Preview</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-200 bg-slate-50/60 rounded-2xl h-80 relative overflow-hidden flex flex-col justify-center items-center py-12 px-8">
            
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Layout Box - The building perimeter */}
            <div className="w-full h-44 border-2 border-slate-400 bg-white rounded-lg relative flex items-stretch shadow-inner overflow-visible">
              
              {/* Main Entrance Door & Access */}
              <div className="absolute bottom-0 left-[15%] flex flex-col items-center translate-y-[100%] z-30">
                <div className="w-10 h-1.5 bg-slate-100 border-x-2 border-slate-400 flex items-center justify-center translate-y-[-100%]" title="Main Entrance">
                  <div className="w-full h-px bg-slate-300" />
                </div>
                
                {/* Access Visualizers */}
                {(answers.accessReqs || []).includes('ADA ramp required') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 40 }} 
                    className="w-12 border-x-2 border-b-2 border-slate-300 bg-slate-100/80 relative flex items-center justify-center"
                  >
                    <div className="w-0.5 h-full bg-blue-300/50 mx-auto" />
                    <span className="absolute text-[6px] font-bold text-slate-500 uppercase rotate-90 tracking-widest">ADA RAMP</span>
                  </motion.div>
                )}
                {(answers.accessReqs || []).includes('Stairs acceptable') && !(answers.accessReqs || []).includes('ADA ramp required') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 16 }} 
                    className="w-10 flex flex-col"
                  >
                    <div className="h-1 border-x border-b border-slate-300 bg-slate-200" />
                    <div className="h-1 border-x border-b border-slate-300 bg-slate-200" />
                    <div className="h-1 border-x border-b border-slate-300 bg-slate-200" />
                    <div className="h-1 border-x border-b border-slate-300 bg-slate-200" />
                  </motion.div>
                )}
              </div>

              {/* Windows (Static) */}
              <div className="absolute top-0 right-[20%] w-8 h-1 bg-sky-200 border-x border-slate-400 z-30" title="Window" />
              <div className="absolute top-0 left-[40%] w-8 h-1 bg-sky-200 border-x border-slate-400 z-30" title="Window" />

              {/* External HVAC Unit */}
              {answers.hvac && (
                <div className="absolute -top-7 right-[5%] bg-slate-800 text-white px-3 py-1.5 rounded-t-lg text-[9px] font-extrabold uppercase shadow-md animate-in slide-in-from-bottom-2 z-20 flex flex-col items-center justify-center border-x border-t border-slate-700">
                  <Wind className="w-3.5 h-3.5 opacity-90 mb-1 text-sky-300" />
                  <span>HVAC PACK</span>
                </div>
              )}

              {/* Restroom Block */}
              <AnimatePresence>
                {answers.restroom && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: answers.restroomType === 'ADA' ? '30%' : answers.restroomType === 'Multi-stall' ? '35%' : '22%' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="border-r-2 border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-2 text-center relative z-10 shadow-[inset_-4px_0_12px_rgba(0,0,0,0.02)] overflow-hidden"
                  >
                    {/* Restroom Door Cutout */}
                    <div className="absolute right-[-2px] top-[40%] w-1.5 h-8 bg-white border-y border-slate-300 z-20" />
                    
                    <Layout className="w-4 h-4 text-blue-500 mb-1 opacity-70" />
                    <span className="text-[10px] font-bold text-slate-800 leading-none">Restroom</span>
                    <span className="text-[8px] text-blue-600 mt-1 uppercase font-semibold">
                      {answers.restroomType || 'Standard'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Private Offices Visualizer */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-2 z-10 px-4 relative overflow-hidden">
                <div className="flex items-center space-x-1.5 text-slate-400 mb-1 opacity-60">
                  <Grid className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Workspace Core</span>
                </div>
                
                <span className="text-[12px] text-slate-700 font-bold text-center leading-tight max-w-[200px]">
                  {answers.meetingSeats ? `${answers.meetingSeats} Private Offices Configured` : 'Open Plan / Unassigned Area'}
                </span>
                
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {Array.from({ length: Math.min(8, parseInt(answers.meetingSeats || 0)) }).map((_, i) => (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className="w-5 h-5 rounded-sm bg-blue-50 border border-blue-200 shadow-sm" 
                    />
                  ))}
                  {parseInt(answers.meetingSeats || 0) > 8 && (
                    <span className="text-[10px] font-extrabold text-blue-600 flex items-center justify-center h-5">+{parseInt(answers.meetingSeats) - 8}</span>
                  )}
                </div>
              </div>

              {/* Storage Bay Divider */}
              <AnimatePresence>
                {answers.officeStorage === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '35%' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="border-l-4 border-double border-slate-400 bg-slate-100/50 flex flex-col items-center justify-center p-2 text-center relative z-10"
                  >
                    {/* Roll-up Door Cutout */}
                    <div className="absolute right-0 bottom-[-2px] w-12 h-1.5 bg-slate-300 border-x border-slate-500 z-30 shadow-inner flex flex-col justify-evenly px-0.5">
                      <div className="h-px bg-slate-400 w-full" />
                      <div className="h-px bg-slate-400 w-full" />
                    </div>
                    
                    <Package className="w-4 h-4 text-slate-500 mb-1 opacity-70" />
                    <span className="text-[10px] font-bold text-slate-600 leading-none tracking-widest uppercase">Storage Bay</span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase font-semibold">Roll-Up Access</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Outer Dimensions text */}
              <div className="absolute right-2 bottom-2 text-[8px] font-extrabold text-slate-400 tracking-wider z-20 bg-white/90 px-1.5 py-0.5 rounded border border-slate-100 shadow-sm">
                60' x 24' UNIT
              </div>

            </div>

            {/* Scale indicator */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold w-full px-2 absolute bottom-3 z-10">
              <span>0' (Wall A)</span>
              <div className="flex-1 border-t border-dashed border-slate-300 mx-4 relative">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-2 py-0.5 text-[9px] text-slate-400 font-bold rounded shadow-sm border border-slate-200">1,440 SQ FT AREA</span>
              </div>
              <span>60' (Wall B)</span>
            </div>

          </div>
        </Card>

      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button 
          variant="outline"
          onClick={() => setStep(2)} 
          size="lg" 
          className="text-slate-600 font-bold px-6 border-slate-200 hover:bg-slate-50 rounded-xl"
        >
          Back
        </Button>
        <Button 
          onClick={() => setStep(4)} 
          size="lg" 
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-xl font-bold"
        >
          Submit to AI Intelligence
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
