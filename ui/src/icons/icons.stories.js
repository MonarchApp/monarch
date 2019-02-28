import React from 'react';
import FullLogo from 'icons/full_logo';
import MarkLogo from 'icons/mark_logo';
import MenuIcon from 'icons/menu_icon';
import {storiesOf} from '@storybook/react';

storiesOf('Theme', module)
  .add('Icons', () =>
    <div className='col-wrap icon-list-wrapper'>
      <div className='col-3'>
        <dl>
          <dt>Full Logo</dt>
          <dd><FullLogo /></dd>
          <dt>Mark Logo</dt>
          <dd><MarkLogo /></dd>
          <dt>Menu Icon</dt>
          <dd><MenuIcon /></dd>
        </dl>
      </div>
    </div>);
