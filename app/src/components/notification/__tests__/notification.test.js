import Notification from '../';
import React from 'react';
import Sinon from 'sinon';

const sandbox = Sinon.createSandbox();

describe('Notification', function() {
  let component;
  const onClose = sandbox.spy();

  const props = {
    message: 'message',
    onClose,
    type: 'info'
  };

  beforeEach(function() {
    sandbox.resetHistory();
  });

  describe('rendering', function() {
    beforeEach(function() {
      component = shallow(<Notification {...props} />);
    });

    it('passes the type prop to the wrapper as a class', function() {
      expect(component.prop('className')).to.contain(props.type);
    });

    it('displays the message', function() {
      expect(component.find('.message').text()).to.eql(props.message);
    });
  });

  describe('interaction', function() {
    beforeEach(function() {
      component = shallow(<Notification {...props} />);
      component.find('.icon-close').simulate('click');
    });

    context('when closing the notification', function() {
      it('calls the onClose prop', function() {
        expect(onClose).to.be.called;
      });
    });
  });
});
