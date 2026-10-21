export const contactSteps = [
  {
    label: 'Introduction',
    title: 'First, what should we call you?',
    description: 'Every good collaboration starts with a hello.',
  },
  {
    label: 'Your brand',
    title: 'Tell us who you’re building for.',
    description: 'A company, a new venture, or something entirely your own.',
  },
  {
    label: 'Services',
    title: 'Where can we make a difference?',
    description:
      'Choose the services you have in mind. You can select more than one.',
  },
  {
    label: 'Investment',
    title: 'What budget are you working with?',
    description:
      'A rough range helps us find the right approach for your project.',
  },
  {
    label: 'Timeline',
    title: 'When would you like to launch?',
    description: 'Let us know the timeframe you’re considering.',
  },
  {
    label: 'The idea',
    title: 'Give us the bigger picture.',
    description:
      'Tell us about your goals, the challenge, and what success looks like.',
  },
  {
    label: 'Your details',
    title: 'Where can we reach you?',
    description: 'Leave your details so we can pick up the conversation.',
  },
];

export const contactServices = [
  {
    value: 'Brand Identity & Strategy',
    hint: 'Logos, visual systems & brand worlds',
  },
  {
    value: 'Web & Platform Engineering',
    hint: 'Websites, web apps & platforms',
  },
  {
    value: 'UI/UX & Product Design',
    hint: 'Interfaces, experiences & design systems',
  },
  {
    value: 'AI & Automations',
    hint: 'Intelligent tools & connected workflows',
  },
  {
    value: '3D Motion & Visual Graphics',
    hint: '3D, animation & motion graphics',
  },
  {
    value: 'Mobile App Development',
    hint: 'iOS, Android & cross-platform apps',
  },
  {
    value: 'Creative Direction & Advisory',
    hint: 'Art direction, concepts & digital strategy',
  },
];
export const contactBudgets = [
  { value: '< $3,000', hint: 'Scoped sprint / initial phase' },
  { value: '$3,000 – $7,500', hint: 'Standard product or brand build' },
  { value: '$7,500 – $15,000', hint: 'Comprehensive digital flagship' },
  { value: '$15,000+', hint: 'Enterprise / complex platform' },
  { value: 'Flexible / Undecided', hint: 'Let’s work out the scope together' },
];
export const contactTimelines = [
  { value: 'Immediate (< 1 month)', hint: 'Fast-tracked kickoff' },
  { value: '1 – 3 months', hint: 'Standard production sprint' },
  { value: '3+ months', hint: 'Planned future release' },
  { value: 'Exploratory stage', hint: 'Early scoping & feasibility' },
];
export const initialContactForm = {
  name: '',
  company: '',
  selectedServices: ['Web & Platform Engineering'],
  budget: '',
  timeline: '',
  message: '',
  email: '',
  phone: '',
  website_trap: '',
};
export function getContactStepError(step, data) {
  switch (step) {
    case 1:
      return data.name.trim() ? '' : 'Please enter your name to continue.';
    case 3:
      return data.selectedServices.length
        ? ''
        : 'Please select at least one service.';
    case 4:
      return data.budget ? '' : 'Please select a budget range.';
    case 5:
      return data.timeline ? '' : 'Please select a target timeline.';
    case 6:
      return data.message.trim()
        ? ''
        : 'Please tell us a little about your project.';
    case 7:
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
        ? ''
        : 'Please enter a valid email address.';
    default:
      return '';
  }
}
