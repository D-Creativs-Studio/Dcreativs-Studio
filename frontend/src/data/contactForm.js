export const contactServices = [
  'Website & Web App Development',
  'Brand Identity & Design',
  'UI/UX & Product Design',
  'Motion & Video',
  '3D & Visual FX',
  'Social Media & Marketing',
  'AI & Automations',
  'Not sure yet',
];

export const initialContactForm = {
  name: '', email: '', selectedServices: [], message: '',
  budget: '', timeline: '', company: '', phone: '', website_trap: '',
};

export function getContactErrors(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!data.selectedServices.length || !contactServices.includes(data.selectedServices[0])) {
    errors.selectedServices = 'Please choose a service, or select “Not sure yet”.';
  }
  if (!data.message.trim()) errors.message = 'Please tell us what you want to achieve.';
  return errors;
}
