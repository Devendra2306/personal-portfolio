'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '@/data/personal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type FormState = 'idle' | 'sending' | 'success';

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  const handleBlur = useCallback(
    (field: string, value: string) => {
      setFocusedField(null);
      setFilledFields((prev) => {
        const next = new Set(prev);
        if (value.trim()) next.add(field);
        else next.delete(field);
        return next;
      });
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const subject = `Portfolio Contact from ${name}`;
    const body = `From: ${name}\nEmail: ${email}\n\n${message}`;

    // Simulate brief delay for animation, then open mailto
    setTimeout(() => {
      window.open(
        `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      );
      setFormState('success');

      // Reset after 3 seconds
      setTimeout(() => {
        setFormState('idle');
        formRef.current?.reset();
        setFilledFields(new Set());
      }, 3000);
    }, 800);
  };

  const isLabelFloating = (field: string) =>
    focusedField === field || filledFields.has(field);

  const fields = [
    { name: 'name', label: 'Your Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
  ];

  return (
    <div className="contact-form-wrapper">
      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            className="contact-form-success"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {/* Checkmark */}
            <div className="contact-success-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M8 16 L14 22 L24 10"
                  initial={prefersReducedMotion ? {} : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </svg>
            </div>
            <p className="contact-success-text">Message ready to send!</p>
            <p className="contact-success-subtext">Your mail client should be open.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {fields.map((field, i) => (
              <div key={field.name} className="contact-field">
                <label
                  htmlFor={`contact-${field.name}`}
                  className={`contact-label ${isLabelFloating(field.name) ? 'is-floating' : ''}`}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={`contact-${field.name}`}
                  name={field.name}
                  required
                  disabled={formState === 'sending'}
                  autoComplete={field.name === 'email' ? 'email' : 'name'}
                  className="contact-input"
                  onFocus={() => handleFocus(field.name)}
                  onBlur={(e) => handleBlur(field.name, e.target.value)}
                />
                <span className="contact-input-line" />
              </div>
            ))}

            {/* Message textarea */}
            <div className="contact-field contact-field--textarea">
              <label
                htmlFor="contact-message"
                className={`contact-label ${isLabelFloating('message') ? 'is-floating' : ''}`}
              >
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                disabled={formState === 'sending'}
                className="contact-input contact-textarea"
                onFocus={() => handleFocus('message')}
                onBlur={(e) => handleBlur('message', e.target.value)}
              />
              <span className="contact-input-line" />
            </div>

            {/* Submit */}
            <div className="contact-form-footer">
              <button
                type="submit"
                disabled={formState === 'sending'}
                className="contact-submit"
              >
                {formState === 'sending' ? (
                  <span className="contact-submit-sending">
                    <span className="contact-dot" />
                    <span className="contact-dot" />
                    <span className="contact-dot" />
                  </span>
                ) : (
                  <>
                    Send Message
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="contact-submit-arrow"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
