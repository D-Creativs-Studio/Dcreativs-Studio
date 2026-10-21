import { useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CornerDownLeft,
  LoaderCircle,
  Mail,
} from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { ContactFormStep } from '@/components/contact/ContactFormStep';
import { ContactConfirmation } from '@/components/contact/ContactConfirmation';
import { LogoModelBackground } from '@/components/ui/logo-model-background';
import {
  contactSteps,
  getContactStepError,
  initialContactForm,
} from '@/data/contactForm';
import './contact-page.css';

const artworkQuery =
  '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const subscribeArtwork = (callback) => {
  const query = window.matchMedia(artworkQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const getArtworkSnapshot = () => window.matchMedia(artworkQuery).matches;
const getServerArtworkSnapshot = () => false;

function ContactIntroCopy() {
  return (
    <p className="contact-intro-copy">
      An ambitious idea. A fresh perspective.
      <br className="contact-desktop-break" /> Whatever’s next, let’s make it
      happen.
    </p>
  );
}

function ContactDirectLink() {
  return (
    <div className="contact-direct">
      <span>Prefer to write to us?</span>
      <a href="mailto:dcreativs.studio@gmail.com">
        dcreativs.studio@gmail.com
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

export function ContactPage() {
  const { search } = useLocation();
  const previewConfirmation =
    import.meta.env.DEV &&
    new URLSearchParams(search).get('preview') === 'confirmation';
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState(() => ({
    ...initialContactForm,
    selectedServices: [...initialContactForm.selectedServices],
  }));
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const submittingRef = useRef(false);
  const stepRef = useRef(null);
  const successRef = useRef(null);
  const shouldFocusStep = useRef(false);
  const reducedMotion = useReducedMotion();
  const showArtwork = useSyncExternalStore(
    subscribeArtwork,
    getArtworkSnapshot,
    getServerArtworkSnapshot
  );
  const totalSteps = contactSteps.length;
  const step = contactSteps[currentStep - 1];
  const showingConfirmation = isSubmitted || previewConfirmation;
  const confirmationData = previewConfirmation
    ? {
        name: 'Alex',
        email: 'alex@example.com',
        selectedServices: [
          'Web & Platform Engineering',
          'UI/UX & Product Design',
        ],
        budget: '$7,500 – $15,000',
        timeline: '1 – 3 months',
      }
    : formData;

  const updateField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrorMsg('');
  };
  const focusStep = () => {
    if (!shouldFocusStep.current) return;
    stepRef.current
      ?.querySelector('[data-step-focus]')
      ?.focus({ preventScroll: true });
    shouldFocusStep.current = false;
  };
  const changeStep = (nextStep) => {
    if (submittingRef.current) return;
    setDirection(nextStep > currentStep ? 1 : -1);
    setErrorMsg('');
    shouldFocusStep.current = true;
    setCurrentStep(nextStep);
  };
  const handleNext = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const error = getContactStepError(currentStep, formData);
    setErrorMsg(error);
    if (error) {
      stepRef.current
        ?.querySelector('[data-step-focus]')
        ?.focus({ preventScroll: true });
      return;
    }
    if (currentStep < totalSteps) {
      changeStep(currentStep + 1);
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true)
        throw new Error(
          result.error || 'We couldn’t send your brief. Please try again.'
        );
      setIsSimulated(result.mode === 'dev_simulated');
      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg(
        error.message ||
          'Something went wrong. Please try again or email us directly.'
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };
  const variants = {
    enter: (travel) => ({ opacity: 0, y: reducedMotion ? 0 : travel * 12 }),
    visible: { opacity: 1, y: 0 },
    exit: (travel) => ({ opacity: 0, y: reducedMotion ? 0 : travel * -8 }),
  };

  return (
    <div className="contact-page">
      <SEO
        title="Start a Project"
        description="Have something in mind? Tell D’Creativs Studio about your next brand, digital product, or creative project."
      />
      <div className="contact-ambient" aria-hidden="true" />
      <div className="contact-layout">
        <section className="contact-intro" aria-labelledby="contact-title">
          <h1 id="contact-title">
            Great things
            <br /> start with
            <br />
            <span>a hello.</span>
          </h1>
          <ContactIntroCopy />
          <div className="contact-artwork" aria-hidden="true">
            <div className="contact-artwork-orbit" />
            <div className="contact-artwork-orbit contact-artwork-orbit-inner" />
            <span className="contact-artwork-cross contact-artwork-cross-one">
              +
            </span>
            <span className="contact-artwork-cross contact-artwork-cross-two">
              +
            </span>
            <div className="contact-artwork-model">
              {showArtwork ? (
                <LogoModelBackground className="opacity-85" scale={1.85} />
              ) : (
                <img src="/android-chrome-512x512.png" alt="" />
              )}
            </div>
            <span className="contact-artwork-caption">
              IDEAS INTO SOMETHING REAL
            </span>
          </div>
          <ContactDirectLink />
        </section>

        <section className="contact-console" aria-label="Project enquiry">
          <div className="contact-console-topline">
            <span>
              {showingConfirmation
                ? 'YOUR PROJECT BRIEF'
                : 'LET’S BUILD SOMETHING'}
            </span>
            <span>
              {showingConfirmation ? 'SUMMARY' : 'PROJECT ENQUIRY'}
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </div>
          {!showingConfirmation && (
            <div className="contact-progress">
              <div className="contact-progress-meta">
                <span>Your project brief</span>
                <span>
                  Step <strong>{currentStep}</strong> of {totalSteps}
                </span>
              </div>
              <ol
                className="contact-progress-track"
                aria-label="Enquiry progress"
              >
                {contactSteps.map((item, index) => (
                  <li
                    key={item.label}
                    className={index + 1 <= currentStep ? 'is-active' : ''}
                    aria-current={
                      index + 1 === currentStep ? 'step' : undefined
                    }
                  >
                    <span className="contact-sr-only">
                      {item.label}
                      {index + 1 < currentStep
                        ? ': completed'
                        : index + 1 === currentStep
                          ? ': current step'
                          : ': upcoming'}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <AnimatePresence mode="wait" custom={direction}>
            {showingConfirmation ? (
              <motion.div
                key="success"
                className="contact-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
                onAnimationComplete={() =>
                  successRef.current?.focus({ preventScroll: true })
                }
              >
                <ContactConfirmation
                  data={confirmationData}
                  simulated={isSimulated || previewConfirmation}
                  headingRef={successRef}
                />
              </motion.div>
            ) : (
              <motion.form
                key={currentStep}
                ref={stepRef}
                className="contact-form"
                onSubmit={handleNext}
                noValidate
                custom={direction}
                variants={variants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{
                  duration: reducedMotion ? 0 : 0.2,
                  ease: 'easeOut',
                }}
                onAnimationComplete={(definition) => {
                  if (definition === 'visible') focusStep();
                }}
                aria-labelledby="contact-step-title"
                aria-busy={isSubmitting}
                onKeyDown={(event) => {
                  if (
                    event.target.tagName === 'TEXTAREA' &&
                    event.key === 'Enter' &&
                    (event.ctrlKey || event.metaKey)
                  )
                    handleNext(event);
                }}
              >
                <div className="contact-step-heading">
                  <p className="contact-step-eyebrow">
                    <span>{String(currentStep).padStart(2, '0')}</span>
                    <span aria-hidden="true">/</span>
                    {step.label}
                  </p>
                  <h2 id="contact-step-title">
                    {currentStep === 2 && formData.name.trim()
                      ? `Good to meet you, ${formData.name.trim().split(/\s+/)[0]}.`
                      : step.title}
                  </h2>
                  <p id="contact-step-description">
                    {currentStep === 2
                      ? 'What is your company, brand, or project called?'
                      : step.description}
                  </p>
                </div>
                <fieldset className="contact-fields" disabled={isSubmitting}>
                  <legend className="contact-sr-only">{step.label}</legend>
                  <ContactFormStep
                    step={currentStep}
                    data={formData}
                    onChange={updateField}
                    error={errorMsg}
                  />
                </fieldset>
                {errorMsg && (
                  <p id="contact-error" className="contact-error" role="alert">
                    {errorMsg}
                  </p>
                )}
                <div className="contact-form-actions">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      className="contact-back"
                      onClick={() => changeStep(currentStep - 1)}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <span className="contact-start-note">
                      <Check size={14} aria-hidden="true" />A little about you,
                      then your idea.
                    </span>
                  )}
                  <div className="contact-continue-wrap">
                    <button
                      className="contact-primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          Sending
                          <LoaderCircle
                            size={17}
                            className="contact-spinner"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        <>
                          {currentStep === totalSteps
                            ? 'Send project brief'
                            : 'Continue'}
                          <ArrowRight size={17} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    {(currentStep <= 2 || currentStep >= 6) && (
                      <span className="contact-keyboard-hint">
                        {currentStep === 6 ? 'Ctrl / ⌘ + Enter' : 'press Enter'}
                        <CornerDownLeft size={11} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
          {!showingConfirmation && (
            <div className="contact-console-note">
              <Mail size={14} aria-hidden="true" />
              <span>A thoughtful reply. Within 24 hours.</span>
            </div>
          )}
        </section>
        <div className="contact-mobile-followup">
          <ContactIntroCopy />
          <ContactDirectLink />
        </div>
      </div>
      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} D’Creativs Studio</span>
        <span>
          Built to be noticed.
          <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </footer>
    </div>
  );
}
export default ContactPage;
