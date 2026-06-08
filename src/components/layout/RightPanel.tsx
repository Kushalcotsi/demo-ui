'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Package, Zap, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export function RightPanel() {
  const { tags, currentStep } = useActiveConfig();
  const { isAnalyzing } = useDemoStore();

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200">
      {/* Live Requirement Summary */}
      <div className="p-6 border-b border-slate-200 bg-white shadow-sm z-10 shrink-0">
        <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-3.5 flex items-center">
          <Zap className="w-3.5 h-3.5 mr-2 text-blue-500 fill-blue-500" />
          Active Specifications
        </h3>
        
        <div className="max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {tags.length === 0 && !isAnalyzing && (
              <span className="text-xs text-slate-400 font-medium">Define workspace criteria to start...</span>
            )}
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-xs text-blue-600 font-semibold">
                <span className="animate-pulse">AI is parsing project details...</span>
              </div>
            )}
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:border-slate-300 transition-all text-[11px] font-semibold py-0.5 px-2 rounded-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation Area */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0 custom-scrollbar">
        {currentStep >= 3 && tags.length > 0 ? (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-500 fill-blue-500/20" />
                AI Recommendation
              </h3>
            </div>

            <Card className="border-blue-200 bg-gradient-to-b from-blue-50/20 to-white shadow-md rounded-2xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 border border-blue-200 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    98% Fit Rating
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                
                <h4 className="font-bold text-slate-800 text-base">60' x 24' Modular Office</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                  Optimized for administrative workspace, meetings, and common room facilities.
                </p>
                
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 font-medium">Total Area</span>
                    <span className="font-semibold text-slate-800">1,440 Sq Ft</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 font-medium">Estimated Delivery</span>
                    <span className="font-semibold text-slate-800">14 Business Days</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 font-medium">Structure Spec</span>
                    <span className="font-semibold text-slate-800">IBC 2021 Compliant</span>
                  </div>
                </div>
              </div>

              {/* Live AI Insights inside Card */}
              <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Configuration Match Insights</span>
                <div className="space-y-2">
                  <div className="flex items-start text-[11px] text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Layout selected supports meetings workspace demands</span>
                  </div>
                  <div className="flex items-start text-[11px] text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                    <span>ADA restroom & access criteria satisfied</span>
                  </div>
                  <div className="flex items-start text-[11px] text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Industrial/Premium structural code mapped</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Compliance Badge */}
            <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-emerald-800 block">Compliance Guard Active</span>
                <span className="text-[11px] text-emerald-600 mt-0.5 block leading-normal">
                  All chosen features correspond to local zone engineering guidelines.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 mt-28 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Awaiting Blueprint</h4>
            <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed">
              Complete the initial requirements to unlock live AI structure recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
