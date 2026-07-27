'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const commands = [
    { id: 'home', label: 'Home', section: 'Navigation', icon: '⌂', action: () => scrollTo('hero') },
    { id: 'about', label: 'About', section: 'Navigation', icon: '◎', action: () => scrollTo('about') },
    { id: 'skills', label: 'Skills', section: 'Navigation', icon: '◆', action: () => scrollTo('skills') },
    { id: 'projects', label: 'Projects', section: 'Navigation', icon: '▣', action: () => scrollTo('projects') },
    { id: 'timeline', label: 'Timeline', section: 'Navigation', icon: '◷', action: () => scrollTo('timeline') },
    { id: 'contact', label: 'Contact', section: 'Navigation', icon: '✉', action: () => scrollTo('contact') },
    { id: 'github', label: 'GitHub', section: 'Links', icon: '⬡', action: () => window.open('https://github.com/Devendra2306', '_blank') },
    { id: 'linkedin', label: 'LinkedIn', section: 'Links', icon: '◈', action: () => window.open('https://www.linkedin.com/in/devendra-divakar-9649a32a4', '_blank') },
    { id: 'resume', label: 'Download Resume', section: 'Links', icon: '⬇', action: () => window.open('/resume.pdf', '_blank') },
    { id: 'email', label: 'Copy Email', section: 'Actions', icon: '✦', action: () => { navigator.clipboard.writeText('devdiwakar27@gmail.com'); } },
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Small delay to ensure the modal is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredCommands, selectedIndex, onClose]
  );

  // Group commands by section
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.section]) {
      acc[command.section] = [];
    }
    acc[command.section].push(command);
    return acc;
  }, {} as Record<string, typeof commands>);

  let currentIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg mx-4 bg-[rgba(20,20,25,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                <svg
                  className="w-5 h-5 text-white/40 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-white placeholder-white/40 font-body outline-none"
                />
                <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5 text-[10px] font-mono text-[rgba(255,255,255,0.4)] ml-3 whitespace-nowrap">
                  ESC
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.1)]">
                {Object.entries(groupedCommands).map(([section, items]) => (
                  <div key={section}>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)] px-4 py-2">
                      {section}
                    </div>
                    {items.map((command) => {
                      const isSelected = currentIndex === selectedIndex;
                      const globalIndex = currentIndex++;
                      return (
                        <div
                          key={command.id}
                          className={`px-4 py-2.5 flex items-center gap-3 rounded-lg mx-2 cursor-pointer transition-colors ${
                            isSelected ? 'bg-[rgba(196,145,122,0.08)]' : 'hover:bg-white/5'
                          }`}
                          onClick={() => {
                            command.action();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span
                            className={`w-5 text-center text-[#C4917A] ${
                              isSelected ? 'opacity-100' : 'opacity-60'
                            }`}
                          >
                            {command.icon}
                          </span>
                          <span className="text-sm text-white/80 font-body">
                            {command.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                {filteredCommands.length === 0 && (
                  <div className="px-4 py-8 text-center text-white/40 text-sm font-body">
                    No results found.
                  </div>
                )}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-2.5 flex justify-between">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.3)]">
                    <span className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">↑</span>
                    <span className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">↓</span>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.3)]">
                    <span className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">↵</span>
                    <span>Open</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.3)]">
                    <span className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">esc</span>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
