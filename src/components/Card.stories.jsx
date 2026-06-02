import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    badge: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    primaryLabel: { control: 'text' },
    ghostLabel: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    onPrimary: { action: 'primary clicked' },
    onGhost: { action: 'ghost clicked' },
  },
};

export const Default = {
  args: {
    badge: 'Available',
    title: 'Verdhana Design System',
    description: 'A clean, accessible component library built for speed and consistency across every screen size.',
    primaryLabel: 'Get Started',
    ghostLabel: 'Learn More',
  },
};

export const NoBadge = {
  args: {
    ...Default.args,
    badge: '',
  },
};

export const WithImage = {
  args: {
    ...Default.args,
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=720&q=80',
    imageAlt: 'Abstract gradient artwork',
  },
};

export const LongContent = {
  args: {
    ...Default.args,
    title: 'A Very Long Card Title That Tests Text Wrapping Behavior',
    description:
      'This description is intentionally verbose to verify that the card layout holds up under real-world content conditions without breaking spacing or overflow constraints.',
  },
};

export const CustomActions = {
  args: {
    ...Default.args,
    primaryLabel: 'Download Now',
    ghostLabel: 'View Docs',
  },
};
