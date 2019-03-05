import * as rtl from 'react-testing-library';
import Header from './index.js';
import React from 'react';
import { MemoryRouter } from 'react-router';

const toggleMenu = component =>
  rtl.fireEvent.click(
    component.container.querySelector('#header-user-navigation-button')
  );

describe('Header', function() {
  let header;

  context('when clicking on the user avatar', function() {
    before(function() {
      header = rtl.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );

      toggleMenu(header);
    });

    after(function() {
      rtl.cleanup();
    });

    it('opens the user menu', function() {
      expect(header.getByLabelText('User menu')).to.exist;
    });
  });

  context('when the user menu is open', function() {
    context('and something outside the user menu is clicked', function() {
      before(function() {
        const text = 'Other Thing';
        const OtherThing = () => <span>{text}</span>;

        header = rtl.render(
          <MemoryRouter>
            <React.Fragment>
              <Header />
              <OtherThing />
            </React.Fragment>
          </MemoryRouter>
        );

        toggleMenu(header);
        rtl.fireEvent.click(header.getByText(text));
      });

      after(function() {
        rtl.cleanup();
      });

      it('closes the user menu', function() {
        expect(header.queryByLabelText('User menu')).to.be.null;
      });
    });

    context('and a user menu item is selected', function() {
      before(function() {
        header = rtl.render(
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        );

        toggleMenu(header);
        rtl.fireEvent.click(header.getByText('Log Out'));
      });

      after(function() {
        rtl.cleanup();
      });

      it('closes the menu', function() {
        expect(header.queryByLabelText('User menu')).to.be.null;
      });
    });
  });
});
