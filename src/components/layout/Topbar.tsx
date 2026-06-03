'use client';

import React from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, SplitSquareHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { 
    customerName, 
    setCustomerName, 
    versions, 
    activeVersionId, 
    setActiveVersion, 
    addVersion, 
    deleteVersion,
    isComparing,
    setIsComparing
  } = useDemoStore();

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
      
      {/* Left: Customer Info */}
      <div className="flex items-center space-x-4">
        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Customer</div>
        <Input 
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="h-8 w-48 bg-slate-50 border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-600"
          placeholder="Enter Customer Name"
        />
      </div>

      {/* Center: Version Tabs */}
      <div className="flex items-center space-x-2 flex-1 justify-center">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {versions.map(v => (
            <div 
              key={v.id} 
              className={cn(
                "group relative flex items-center px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200",
                activeVersionId === v.id && !isComparing
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
              onClick={() => setActiveVersion(v.id)}
            >
              {v.name}
              {versions.length > 1 && activeVersionId === v.id && (
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteVersion(v.id); }}
                  className="ml-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          
          <button 
            onClick={addVersion}
            className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-1"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Option
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <Button 
          variant={isComparing ? "default" : "outline"}
          onClick={() => setIsComparing(!isComparing)}
          className={cn(
            "h-8 text-sm",
            isComparing ? "bg-blue-600 text-white" : "text-slate-600"
          )}
          disabled={versions.length < 2}
        >
          <SplitSquareHorizontal className="w-4 h-4 mr-2" />
          {isComparing ? 'Exit Compare' : 'Compare Options'}
        </Button>
      </div>

    </div>
  );
}
