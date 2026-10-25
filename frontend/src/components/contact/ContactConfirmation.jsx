import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

export function ContactConfirmation({ data, simulated, headingRef }) {
  const firstName = data.name.trim().split(/\s+/)[0];
  return (
    <>
      <div className="contact-receipt-status">
        <span className="contact-receipt-check">
          <Check size={17} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span>{simulated ? 'Enquiry preview' : 'Enquiry received'}</span>
      </div>
      <h2 ref={headingRef} tabIndex={-1}>
        {simulated ? 'Your enquiry is ready.' : `Thanks, ${firstName}.`}
      </h2>
      <p className="contact-receipt-message">
        {simulated
          ? 'Here’s a summary of your project.'
          : 'We have your enquiry. Our team will follow up to discuss your goals.'}
      </p>

      <div className="contact-receipt">
        <div className="contact-receipt-services">
          <h3>Selected services</h3>
          <ul>
            {data.selectedServices.map((service) => (
              <li key={service}>
                <span aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <dl className="contact-receipt-details">
          <div>
            <dt>Budget</dt>
            <dd>{data.budget || 'To discuss'}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{data.timeline || 'To discuss'}</dd>
          </div>
        </dl>
      </div>

      <div className="contact-receipt-next">
        <span className="contact-receipt-next-icon" aria-hidden="true">
          <ArrowRight size={16} />
        </span>
        <div>
          <h3>{simulated ? 'Preview only' : 'What happens next'}</h3>
          <p>
            {simulated ? (
              'No email has been sent.'
            ) : (
              <>
                We’ll review your brief and follow up at{' '}
                <strong>{data.email.trim()}</strong> to discuss the fit and next steps.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="contact-success-actions">
        <Link to="/works" className="contact-primary">
          View our work
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/" className="contact-home-link">
          Back to home
        </Link>
      </div>
    </>
  );
}
