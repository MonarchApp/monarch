import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Theme', module)
  .add('Typography', () =>
    <div className='col-wrap'>
      <div className='col-4'>
        <h1>h1 title</h1>
        <h2>h2 title</h2>
        <h3>h3 title</h3>
        <h4>h4 title</h4>
        <div>
          <a href='#text-link'>Text link</a>
        </div>
      </div>
      <p className='col-4'>
        Chocolate jelly croissant lemon drops croissant chocolate bar pie. Bear
        claw candy halvah wafer ice cream. Sweet fruitcake tart donut jujubes
        jujubes marshmallow. Bear claw brownie biscuit gummi bears. Pie topping
        candy canes gummies cupcake pudding gummies chupa chups. Carrot cake cake
        danish fruitcake pastry. Powder icing jelly-o pudding lollipop lollipop
        tiramisu apple pie.
      </p>
    </div>);
