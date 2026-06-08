'use client';

import React from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Users, Plus, Search, ChevronRight, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WillScotLogo } from '@/components/ui/WillScotLogo';

export default function CustomersPage() {
  const { customers, setActiveCustomer, addCustomer } = useDemoStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    const newId = `c${Date.now()}`;
    addCustomer({
      id: newId,
      name: 'New Client Contact',
      company: 'New Company Corp',
      status: 'Active',
      date: new Date().toISOString().split('T')[0],
    });
    setActiveCustomer(newId);
    router.push('/configurator/demo');
  };

  const handleSelectCustomer = (id: string) => {
    setActiveCustomer(id);
    router.push('/configurator/demo');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-slate-900 text-white h-16 flex items-center px-8 shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <WillScotLogo className="h-10 w-auto text-white" />
        </div>
      </div>

      <div className="flex-1 p-10 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Client Directory</h2>
            <p className="text-slate-500 mt-2 text-sm">Manage workspace configurations for your client portfolio.</p>
          </div>
          <Button onClick={handleAddCustomer} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-xl font-bold">
            <Plus className="w-4 h-4 mr-2" />
            New Customer Config
          </Button>
        </div>

        <Card className="bg-white rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50/50">
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clients..." 
                className="pl-9 bg-white border-slate-200 h-9 text-sm focus-visible:ring-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Primary Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map(customer => (
                  <tr 
                    key={customer.id} 
                    onClick={() => handleSelectCustomer(customer.id)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Building className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{customer.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        customer.status === 'Active' 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(customer.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50 hover:text-blue-700">
                        Configure <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                      No clients found. Click "New Customer Config" to start.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
