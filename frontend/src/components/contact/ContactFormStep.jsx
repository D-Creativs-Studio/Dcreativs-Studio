import { Check } from 'lucide-react';
import {
  contactBudgets,
  contactServices,
  contactTimelines,
} from '@/data/contactForm';

export function ContactFormStep({ step, data, onChange, error }) {
  const describedBy = `contact-step-description${error ? ' contact-error' : ''}`;
  const fieldProps = {
    'aria-describedby': describedBy,
    'aria-invalid': Boolean(error),
  };

  if (step === 1 || step === 2) {
    const isName = step === 1;
    const field = isName ? 'name' : 'company';
    return (
      <div className="contact-field">
        <label htmlFor={`contact-${field}`}>
          {isName ? 'Your full name' : 'Company or project name'}
          {!isName && <span className="contact-optional">Optional</span>}
        </label>
        <input
          {...fieldProps}
          id={`contact-${field}`}
          name={field}
          type="text"
          autoComplete={isName ? 'name' : 'organization'}
          required={isName}
          value={data[field]}
          maxLength={200}
          placeholder={
            isName
              ? 'e.g. Alex Morgan'
              : 'Your company, brand, or next big idea'
          }
          onChange={(event) => onChange(field, event.target.value)}
          data-step-focus
        />
        <p className="contact-field-note">
          {isName
            ? 'Nice to meet you. Let’s make something worth noticing.'
            : 'Working independently? You can leave this blank.'}
        </p>
      </div>
    );
  }

  if (step >= 3 && step <= 5) {
    const isServices = step === 3;
    const options = isServices
      ? contactServices
      : step === 4
        ? contactBudgets
        : contactTimelines;
    const field = isServices
      ? 'selectedServices'
      : step === 4
        ? 'budget'
        : 'timeline';
    const legend = isServices
      ? 'Select services'
      : step === 4
        ? 'Select a budget range'
        : 'Select a timeline';
    return (
      <fieldset
        className="contact-options"
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
      >
        <legend className="contact-sr-only">{legend}</legend>
        {options.map((option, index) => {
          const selected = isServices
            ? data.selectedServices.includes(option.value)
            : data[field] === option.value;
          return (
            <label
              key={option.value}
              className={`contact-option${selected ? ' is-selected' : ''}`}
            >
              <input
                type={isServices ? 'checkbox' : 'radio'}
                name={field}
                value={option.value}
                checked={selected}
                data-step-focus={index === 0 ? '' : undefined}
                onChange={() =>
                  onChange(
                    field,
                    isServices
                      ? selected
                        ? data.selectedServices.filter(
                            (service) => service !== option.value
                          )
                        : [...data.selectedServices, option.value]
                      : option.value
                  )
                }
              />
              <span className="contact-option-copy">
                <span className="contact-option-title">{option.value}</span>
                <span className="contact-option-hint">{option.hint}</span>
              </span>
              <span
                className={`contact-option-indicator${isServices ? ' is-checkbox' : ''}`}
                aria-hidden="true"
              >
                {selected && <Check size={12} strokeWidth={2.7} />}
              </span>
            </label>
          );
        })}
      </fieldset>
    );
  }

  if (step === 6)
    return (
      <div className="contact-field">
        <label htmlFor="contact-message">Your project, in a few words</label>
        <textarea
          {...fieldProps}
          id="contact-message"
          name="message"
          required
          rows={5}
          value={data.message}
          maxLength={10000}
          data-step-focus
          placeholder="We’re looking to build…"
          onChange={(event) => onChange('message', event.target.value)}
        />
        <p className="contact-field-note">
          No polished brief needed. An idea is a great place to start.
        </p>
      </div>
    );

  return (
    <div className="contact-details-fields">
      <div className="contact-field">
        <label htmlFor="contact-email">Email address</label>
        <input
          {...fieldProps}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={data.email}
          maxLength={254}
          data-step-focus
          placeholder="you@company.com"
          onChange={(event) => onChange('email', event.target.value)}
        />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-phone">
          Phone / WhatsApp<span className="contact-optional">Optional</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          maxLength={50}
          placeholder="Include your country code"
          onChange={(event) => onChange('phone', event.target.value)}
        />
      </div>
      <input
        type="text"
        name="website_trap"
        value={data.website_trap}
        onChange={(event) => onChange('website_trap', event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        hidden
        aria-hidden="true"
      />
      <p className="contact-field-note">
        We’ll use these details to get in touch about your project.
      </p>
    </div>
  );
}
