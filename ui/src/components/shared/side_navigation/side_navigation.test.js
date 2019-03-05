import React from 'react';
import Sinon from 'sinon';
import { SideNavigation, SideNavigationItem } from './index.js';

const sandbox = Sinon.createSandbox();

describe('Side Navigation', function() {
  let nav;

  beforeEach(function() {
    sandbox.resetHistory();
  });

  describe('interaction', function() {
    context('when clicking on a navigation item', function() {
      const onClickSpy = sandbox.spy();

      beforeEach(function() {
        nav = shallow(
          <SideNavigation>
            <SideNavigationItem onClick={onClickSpy} text='CLICKITY CLICK CLICK' />
          </SideNavigation>
        );

        nav.find(SideNavigationItem).simulate('click');
      });

      it('registers the click event', function() {
        expect(onClickSpy).to.be.called;
      });
    });
  });
});
