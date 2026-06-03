'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Package, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function RightPanel() {
  const { tags, currentStep } = useActiveConfig();
  const { isAnalyzing } = useDemoStore();

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200">
      {/* Live Requirement Summary */}
      <div className="p-6 border-b border-slate-200 bg-white shadow-sm z-10">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
          <Zap className="w-4 h-4 mr-2 text-blue-600" />
          Active Requirements
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 && !isAnalyzing && (
            <span className="text-sm text-slate-400">No requirements captured yet.</span>
          )}
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <span className="animate-pulse">AI is extracting...</span>
            </div>
          )}
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Recommendation Area */}
      <ScrollArea className="flex-1 p-6">
        {currentStep >= 3 && tags.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
              AI Recommendation
            </h3>

            <Card className="p-4 border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded">
                  98% Match
                </div>
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              
              <h4 className="font-semibold text-slate-900">60x24 Modular Office</h4>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                Based on your requirement for 50 people with a conference room.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Sq Ft</span>
                  <span className="font-medium text-slate-900">1,440</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Delivery</span>
                  <span className="font-medium text-slate-900">14 Days</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentStep < 3 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 mt-20 px-4">
            <Package className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">Recommendations will appear here as you build your configuration.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
