'use client';

import React from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, SplitSquareHorizontal, X, LayoutGrid } from 'lucide-react';
import { WillScotLogo } from '@/components/ui/WillScotLogo';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { 
    versions, 
    activeVersionId, 
    setActiveVersion, 
    addVersion, 
    deleteVersion,
    isComparing,
    setIsComparing
  } = useDemoStore();

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-20 shadow-sm">
      
      {/* Left: Brand Logo */}
      <div className="flex items-center w-[250px]">
        <WillScotLogo className="h-8 w-auto text-blue-900" />
      </div>

      {/* Center: Version Tabs */}
      <div className="flex items-center space-x-2 flex-1 justify-center max-w-xl">
        <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {versions.map(v => (
              <div 
                key={v.id} 
                className={cn(
                  "group relative flex items-center px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200",
                  activeVersionId === v.id && !isComparing
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                )}
                onClick={() => setActiveVersion(v.id)}
              >
                <LayoutGrid className="w-3 h-3 mr-1.5 opacity-60" />
                {v.name}
                {versions.length > 1 && (
                  <Button 
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => { e.stopPropagation(); deleteVersion(v.id); }}
                    className="ml-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-0.5 rounded-md hover:bg-slate-100 h-auto w-auto border-none"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost"
            onClick={addVersion}
            className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all ml-2 border border-dashed border-blue-200 bg-blue-50/20 h-auto"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Requirement
          </Button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <Button 
          variant={isComparing ? "default" : "outline"}
          onClick={() => setIsComparing(!isComparing)}
          className={cn(
            "h-9 text-xs font-bold rounded-lg px-4 transition-all duration-200",
            isComparing 
              ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
              : "text-slate-650 border-slate-250 hover:bg-slate-50 hover:border-slate-350"
          )}
          disabled={versions.length < 2}
        >
          <SplitSquareHorizontal className="w-4 h-4 mr-2" />
          {isComparing ? 'Exit Comparison' : `Compare ${versions.length} Requirements`}
        </Button>
      </div>

    </div>
  );
}
