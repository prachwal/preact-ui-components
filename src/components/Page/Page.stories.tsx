import type { Meta, StoryObj } from '@storybook/preact';
import { userEvent, within } from 'storybook/test';

import { Page, StorybookContent } from './index';

const meta: Meta = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const LoggedOut: Story = {};

export const WithStorybookContent: Story = {
  args: {
    children: <StorybookContent />,
  },
};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};
