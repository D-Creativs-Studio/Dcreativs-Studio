import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, LoaderCircle, Mail } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { ContactEnquiryFields } from '@/components/contact/ContactEnquiryFields';
import { ContactConfirmation } from '@/components/contact/ContactConfirmation';
import { getContactErrors, initialContactForm } from '@/data/contactForm';
import { sendContactEnquiry } from '@/lib/contactSubmission';
import './contact-page.css';

function ContactDirectLink() {
  return (
    <div className="contact-direct">
      <span>Prefer email?</span>
      <a href="mailto:dcreativs.studio@gmail.com">dcreativs.studio@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  );
}

export function ContactPage() {
  const { search } = useLocation();
  const previewConfirmation = import.meta.env.DEV && new URLSearchParams(search).get('preview') === 'confirmation';
  const [formData, setFormData] = useState(() => ({ ...initialContactForm, selectedServices: [] }));
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const submittingRef = useRef(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const showingConfirmation = isSubmitted || previewConfirmation;
  const confirmationData = previewConfirmation
    ? { ...initialContactForm, name: 'Alex', email: 'alex@example.com', selectedServices: ['Website & Web App Development'] }
    : formData;

  const updateField = (field, value) => {
    setFormData(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setErrorMsg('');
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (submittingRef.current) return;
    const nextErrors = getContactErrors(formData);
    setErrors(nextErrors);
    setErrorMsg('');
    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      formRef.current?.querySelector('[name="' + firstInvalidField + '"]')?.focus();
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const result = await sendContactEnquiry(formData);
      setIsSimulated(result.mode === 'dev_simulated');
      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg(error.message || 'We couldn’t send your enquiry. Please try again or email us directly.');
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page contact-page-enquiry">
      <SEO title="Discuss Your Website, Brand or Automation Project" description="Send a short enquiry to D’Creativs Studio. Tell us your goals, and we’ll discuss the scope and next steps before you commit." />
      <div className="contact-ambient" aria-hidden="true" />
      <div className="contact-layout">
        <section className="contact-intro" aria-labelledby="contact-title">
          <h1 id="contact-title">Let’s plan your next <span>website, brand, or automation.</span></h1>
          <p className="contact-intro-copy">Tell us what you want to achieve. We’ll discuss the fit, scope, and next steps before you commit.</p>
          <div className="contact-next-steps">
            <Link to="/works/web-development">Explore website projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <ContactDirectLink />
        </section>
        <section className="contact-console" aria-label="Project enquiry">
          <div className="contact-console-topline">
            <span>{showingConfirmation ? 'YOUR ENQUIRY' : 'LET’S TALK ABOUT YOUR PROJECT'}</span>
            <span><ArrowUpRight size={13} aria-hidden="true" /></span>
          </div>
          <AnimatePresence mode="wait">
            {showingConfirmation ? (
              <motion.div key="success" className="contact-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} onAnimationComplete={() => successRef.current?.focus({ preventScroll: true })}>
                <ContactConfirmation data={confirmationData} simulated={isSimulated || previewConfirmation} headingRef={successRef} />
              </motion.div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading" aria-busy={isSubmitting}>
                <div className="contact-step-heading">
                  <h2 id="contact-form-heading">Tell us a little about your project.</h2>
                  <p>Just the essentials to start. Budget and timing can come later.</p>
                </div>
                <fieldset className="contact-fields" disabled={isSubmitting}>
                  <legend className="contact-sr-only">Your enquiry</legend>
                  <ContactEnquiryFields data={formData} onChange={updateField} errors={errors} />
                </fieldset>
                {Object.values(errors).some(Boolean) && <p className="contact-error" role="alert">Please check the highlighted fields.</p>}
                {errorMsg && <p className="contact-error" role="alert">{errorMsg}</p>}
                <p className="contact-field-note">We’ll use these details to respond to your enquiry.</p>
                <div className="contact-form-actions">
                  <button className="contact-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <>Sending <LoaderCircle size={17} className="contact-spinner" aria-hidden="true" /></> : <>Send enquiry <ArrowRight size={17} aria-hidden="true" /></>}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
          {!showingConfirmation && <div className="contact-console-note"><Mail size={14} aria-hidden="true" /><span>No commitment to a project. Just a conversation.</span></div>}
        </section>
      </div>
      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} D’Creativs Studio</span>
        <span>Built to be noticed. <ArrowUpRight size={13} aria-hidden="true" /></span>
      </footer>
    </div>
  );
}
export default ContactPage;
