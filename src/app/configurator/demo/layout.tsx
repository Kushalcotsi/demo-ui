import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightPanel } from '@/components/layout/RightPanel';
import { Topbar } from '@/components/layout/Topbar';

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Topbar for Customer and Versioning */}
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Progress */}
        <div className="w-[20%] min-w-[250px] border-r border-slate-200 bg-white">
          <Sidebar />
        </div>

        {/* Center Column - Active Configuration */}
        <div className="flex-1 overflow-y-auto relative bg-slate-50">
          <div className="max-w-3xl mx-auto py-12 px-8 pb-32">
            {children}
          </div>
        </div>

        {/* Right Column - AI Recommendations & Summary */}
        <div className="w-[25%] min-w-[300px] border-l border-slate-200 bg-white z-10">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
