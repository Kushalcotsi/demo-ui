import { create } from 'zustand';

export interface ConfigVersion {
  id: string;
  name: string;
  solutionType: string | null;
  tags: string[];
  answers: Record<string, any>;
  currentStep: number;
  highestStep: number;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  status: string;
  date: string;
}

interface ConfigStore {
  customers: Customer[];
  activeCustomerId: string | null;
  setActiveCustomer: (id: string | null) => void;
  addCustomer: (c: Customer) => void;

  customerName: string;
  setCustomerName: (name: string) => void;
  
  versions: ConfigVersion[];
  activeVersionId: string;
  
  addVersion: () => void;
  setActiveVersion: (id: string) => void;
  deleteVersion: (id: string) => void;
  
  isComparing: boolean;
  setIsComparing: (val: boolean) => void;

  setStep: (step: number) => void;
  setSolutionType: (type: string | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setAnswer: (key: string, value: any) => void;
  
  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;
}

const createNewVersion = (id: string, name: string): ConfigVersion => ({
  id,
  name,
  solutionType: null,
  tags: [],
  answers: {},
  currentStep: 1,
  highestStep: 1,
});

const DEFAULT_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', company: 'Acme Corp', status: 'Active', date: '2026-06-01' },
  { id: 'c2', name: 'Jane Smith', company: 'Global Build Inc', status: 'Pending', date: '2026-06-05' },
];

export const useDemoStore = create<ConfigStore>((set, get) => ({
  customers: DEFAULT_CUSTOMERS,
  activeCustomerId: 'c1',
  setActiveCustomer: (id) => {
    const customer = get().customers.find(c => c.id === id);
    set({ activeCustomerId: id, customerName: customer ? customer.company : '' });
  },
  addCustomer: (c) => set((state) => ({ customers: [...state.customers, c] })),

  customerName: 'Acme Corp',
  setCustomerName: (name) => set({ customerName: name }),

  versions: [createNewVersion('v1', 'Requirement 1')],
  activeVersionId: 'v1',

  addVersion: () => {
    const { versions } = get();
    const newId = `v${Date.now()}`;
    const newVersion = createNewVersion(newId, `Requirement ${versions.length + 1}`);
    set({
      versions: [...versions, newVersion],
      activeVersionId: newId,
      isComparing: false
    });
  },

  setActiveVersion: (id) => set({ activeVersionId: id, isComparing: false }),
  
  deleteVersion: (id) => {
    const { versions, activeVersionId } = get();
    if (versions.length <= 1) return;
    const newVersions = versions.filter(v => v.id !== id);
    set({ 
      versions: newVersions,
      activeVersionId: activeVersionId === id ? newVersions[0].id : activeVersionId 
    });
  },

  isComparing: false,
  setIsComparing: (val) => set({ isComparing: val }),

  setStep: (step) => set((state) => ({
    versions: state.versions.map(v => v.id === state.activeVersionId ? { 
      ...v, 
      currentStep: step,
      highestStep: Math.max(v.highestStep, step)
    } : v)
  })),

  setSolutionType: (type) => set((state) => ({
    versions: state.versions.map(v => v.id === state.activeVersionId ? { ...v, solutionType: type } : v)
  })),

  addTag: (tag) => set((state) => ({
    versions: state.versions.map(v => v.id === state.activeVersionId ? { ...v, tags: Array.from(new Set([...v.tags, tag])) } : v)
  })),
  
  removeTag: (tag) => set((state) => ({
    versions: state.versions.map(v => v.id === state.activeVersionId ? { ...v, tags: v.tags.filter(t => t !== tag) } : v)
  })),

  setAnswer: (key, value) => set((state) => ({
    versions: state.versions.map(v => v.id === state.activeVersionId ? { ...v, answers: { ...v.answers, [key]: value } } : v)
  })),

  isAnalyzing: false,
  setIsAnalyzing: (val) => set({ isAnalyzing: val }),
}));

export const useActiveConfig = () => {
  const store = useDemoStore();
  const activeVersion = store.versions.find(v => v.id === store.activeVersionId) || store.versions[0];
  
  return {
    ...activeVersion,
    setStep: store.setStep,
    setSolutionType: store.setSolutionType,
    addTag: store.addTag,
    removeTag: store.removeTag,
    setAnswer: store.setAnswer,
  };
};
