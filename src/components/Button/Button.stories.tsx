import type { Meta, StoryObj } from '@storybook/preact';
import { fn } from 'storybook/test';
import { type ButtonProps, Button } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonProps> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    onClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    onClick: fn(),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
    onClick: fn(),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
    onClick: fn(),
  },
};
