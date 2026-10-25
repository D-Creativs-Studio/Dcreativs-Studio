import { contactServices } from '@/data/contactForm';

const serviceLabels = [
  'Websites & apps', 'Brand identity', 'UI/UX design', 'Motion & video',
  '3D & visual FX', 'Social & marketing', 'AI & automation', 'Not sure yet',
];

export function ContactEnquiryFields({ data, onChange, errors }) {
  const fieldProps = field => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? 'contact-' + field + '-error' : undefined,
  });
  const error = field => errors[field] && (
    <p id={'contact-' + field + '-error'} className="contact-field-error">{errors[field]}</p>
  );
  return (
    <div className="contact-enquiry-fields">
      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name</label>
          <input {...fieldProps('name')} id="contact-name" name="name" autoComplete="name" required maxLength={200} value={data.name} onChange={event => onChange('name', event.target.value)} />
          {error('name')}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address</label>
          <input {...fieldProps('email')} id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={data.email} onChange={event => onChange('email', event.target.value)} />
          {error('email')}
        </div>
      </div>
      <fieldset className="contact-service-field" {...fieldProps('selectedServices')}>
        <legend>What do you need help with?</legend>
        <div className="contact-service-grid">
          {contactServices.map((service, index) => (
            <label key={service} className="contact-service-choice">
              <input
                {...fieldProps('selectedServices')}
                type="radio"
                name="selectedServices"
                value={service}
                required={index === 0}
                checked={data.selectedServices[0] === service}
                onChange={() => onChange('selectedServices', [service])}
              />
              <span>{serviceLabels[index]}</span>
            </label>
          ))}
        </div>
        {error('selectedServices')}
      </fieldset>
      <div className="contact-field">
        <label htmlFor="contact-message">What would you like to achieve?</label>
        <textarea {...fieldProps('message')} id="contact-message" name="message" required rows={4} maxLength={10000} value={data.message} placeholder="Tell us what you’re building or what you’d like to improve." onChange={event => onChange('message', event.target.value)} />
        {error('message')}
        <p className="contact-field-note">A few sentences are enough. No polished brief needed.</p>
      </div>
      <details className="contact-extra-details">
        <summary>Add extra details <span className="contact-optional">Optional</span></summary>
        <p className="contact-field-note">Budget, timing, and other details can also be discussed when we follow up.</p>
        <div className="contact-field-row">
          <div className="contact-field">
            <label htmlFor="contact-budget">Budget <span className="contact-optional">Optional</span></label>
            <input id="contact-budget" name="budget" value={data.budget} maxLength={200} placeholder="Amount or range, with currency" onChange={event => onChange('budget', event.target.value)} />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-timeline">Preferred timeline <span className="contact-optional">Optional</span></label>
            <input id="contact-timeline" name="timeline" value={data.timeline} maxLength={200} placeholder="A date, timeframe, or not sure yet" onChange={event => onChange('timeline', event.target.value)} />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-company">Company or project <span className="contact-optional">Optional</span></label>
            <input id="contact-company" name="company" autoComplete="organization" value={data.company} maxLength={200} onChange={event => onChange('company', event.target.value)} />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-phone">Phone / WhatsApp <span className="contact-optional">Optional</span></label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={data.phone} maxLength={50} placeholder="Include your country code" onChange={event => onChange('phone', event.target.value)} />
          </div>
        </div>
      </details>
      <input type="text" name="website_trap" value={data.website_trap} onChange={event => onChange('website_trap', event.target.value)} tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
    </div>
  );
}
