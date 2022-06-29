/* eslint-disable @typescript-eslint/consistent-type-assertions */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeSetup } from '@app/containers/ThemeSetup';
import { HeaderLayout } from './index';

export default {
  title: 'views/HeaderLayout',
  component: HeaderLayout,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof HeaderLayout>;

const Template: ComponentStory<typeof HeaderLayout> = (args) => (
  <ThemeSetup>
    <BrowserRouter>
      <HeaderLayout {...args} />
    </BrowserRouter>
  </ThemeSetup>
);

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isUserLoggedIn: true,
  user: {
    id: '0',
    email: 'romel@app.com',
    displayName: 'Romel Perez',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1393135?v=4',
    createdAt: '2022-01-01T00:00:00.000000+00:00',
    updatedAt: '2022-01-01T00:00:00.000000+00:00'
  }
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  isUserLoggedIn: false
};
