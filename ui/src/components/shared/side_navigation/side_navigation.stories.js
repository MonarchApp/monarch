import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {SideNavigation, SideNavigationItem} from './index.js';

const onItemClick = action('Navigation Item clicked');

storiesOf('Components/Shared', module)
  .add('Side Navigation', () =>
    <SideNavigation>
      <SideNavigationItem onClick={onItemClick} text='Change Password' />
      <SideNavigationItem
        active={true}
        onClick={onItemClick}
        text='Edit Butt' />
      <SideNavigationItem onClick={onItemClick} text='View Butts' />
    </SideNavigation>
  );
