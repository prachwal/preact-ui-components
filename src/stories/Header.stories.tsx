import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/preact';

import { Header, type HeaderProps } from './Header';

const meta: Meta<HeaderProps> = {
  title: 'Example/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
