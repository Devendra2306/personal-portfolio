'use client';

import { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { CommandPalette } from '@/components/shared/CommandPalette';

export function PremiumShell() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
