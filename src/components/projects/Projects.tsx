'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { projects, Project } from '@/data/projects';
import { GlassPanel } from '@/components/shared/GlassPanel';
import { StatusTag } from '@/components/shared/StatusTag';
import { GlowButton } from '@/components/shared/GlowButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useMousePosition } from '@/hooks/useMousePosition';
import { staggerContainer, fadeUp } from '@/lib/motion-variants';

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { x, y, isInside } = useMousePosition(cardRef);
  const [transform, setTransform] = useState('');
  
  const width = typeof window !== 'undefined' && cardRef.current ? cardRef.current.offsetWidth : 400;
  const height = typeof window !== 'undefined' && cardRef.current ? cardRef.current.offsetHeight : 500;
  
  // Real pixel coordinates for the gradient
  const mouseX = x * width;
  const mouseY = y * height;

  useEffect(() => {
    if (prefersReducedMotion || isTouch || !isInside) {
      setTransform('rotateX(0deg) rotateY(0deg)');
      return;
    }

    // x and y are 0 to 1. Center is 0.5.
    const centerX = x - 0.5; // -0.5 to 0.5
    const centerY = y - 0.5; // -0.5 to 0.5
    
    // Max rotation 8 degrees
    const rotateX = -centerY * 16; 
    const rotateY = centerX * 16;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, [x, y, isInside, isTouch, prefersReducedMotion]);

  return (
    <motion.div variants={prefersReducedMotion ? {} : fadeUp} style={{ perspective: '1000px' }}>
      <GlassPanel
        as="article"
        hoverable={!isTouch && !prefersReducedMotion}
        className={`h-full p-6 flex flex-col justify-between relative overflow-hidden group ${
          isTouch ? 'active:-translate-y-1 active:shadow-[0_0_20px_rgba(0,240,255,0.4)]' : ''
        }`}
      >
        {/* Mouse tracking overlay */}
        <div 
          ref={cardRef as React.RefObject<HTMLDivElement>} 
          className="absolute inset-0 z-0 transition-transform duration-300 ease-[cubic-bezier(0.03,0.98,0.52,0.99)]"
          style={{ 
            transform,
            background: (!prefersReducedMotion && !isTouch && isInside) 
              ? `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0,240,255,0.06), transparent 40%)` 
              : 'transparent'
          }}
        />
        
        {/* Content - Z-index ensures it sits above the tracking gradient */}
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <div>
            <div className="flex justify-between items-center mb-6">
              <StatusTag status={project.status} />
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-off-white)] opacity-50">
                {project.timestamp}
              </span>
            </div>
            
            <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-pure-white)] font-bold mb-3">
              {project.title}
            </h3>
            
            <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-80 mb-6 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8 pointer-events-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,240,255,0.1)] px-2 py-1 rounded-sm font-[family-name:var(--font-mono)] text-xs text-[var(--color-off-white)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pointer-events-auto">
            {project.demoUrl && project.demoUrl !== '#' && (
              <GlowButton variant="primary" href={project.demoUrl} className="w-full sm:w-auto text-center justify-center">
                LIVE DEMO
              </GlowButton>
            )}
            {project.sourceUrl && project.sourceUrl !== '#' && (
              <GlowButton variant="secondary" href={project.sourceUrl} className="w-full sm:w-auto text-center justify-center">
                GITHUB_SRC
              </GlowButton>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function Projects() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );

  return (
    <section id="projects" aria-label="Projects" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-neon-cyan)] mb-4">
          // PROJECTS
        </h3>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl text-[var(--color-pure-white)] font-bold tracking-tight">
          Featured Projects
        </h2>
      </div>

      {prefersReducedMotion ? (
        content
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}
