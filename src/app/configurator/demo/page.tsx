'use client';

import React from 'react';
import { useDemoStore, useActiveConfig } from '@/store/useDemoStore';
import { Step1Solution } from '@/components/configurator/Step1Solution';
import { Step2Capture } from '@/components/configurator/Step2Capture';
import { Step3Configuration } from '@/components/configurator/Step3Configuration';
import { Step4Recommendations } from '@/components/configurator/Step4Recommendations';
import { Step5Review } from '@/components/configurator/Step5Review';
import { CompareView } from '@/components/configurator/CompareView';
import { AnimatePresence } from 'framer-motion';

export default function ConfiguratorDemoPage() {
  const { isComparing } = useDemoStore();
  const { currentStep } = useActiveConfig();

  if (isComparing) {
    return <CompareView />;
  }

  return (
    <AnimatePresence mode="wait">
      {currentStep === 1 && <Step1Solution key="step1" />}
      {currentStep === 2 && <Step2Capture key="step2" />}
      {currentStep === 3 && <Step3Configuration key="step3" />}
      {currentStep === 4 && <Step4Recommendations key="step4" />}
      {currentStep === 5 && <Step5Review key="step5" />}
    </AnimatePresence>
  );
}
