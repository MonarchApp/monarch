import React from 'react';
import withField from '../with_field.js';

const InputField = withField('input');
const id = 'rusty-shackleford@see-eye-ay.gov';
const label = 'Use your *real* email';
const name = 'Email';
const type = 'email';
let wrappedField;

const input = {name};

describe.only('withField', function() {
  describe('rendering', function() {
    context('always', function() {
      beforeEach(function() {
        wrappedField = shallow(<InputField id={id} input={input} label={label} type={type} />);
      });


      it('renders a single label with the provided label content and name', function() {
        const labelComponent = wrappedField.find('.field');
        expect(labelComponent).to.have.length(1);
        expect(labelComponent.text()).to.equal(label);
        expect(labelComponent.prop('htmlFor')).to.equal(name);
      });

      it('renders the provided component and passes the HOC props', function() {
        expect(wrappedField.find('input').props()).to.eql(Object.assign({}, input, {type}));
      });
    });

    context('when there is a warning', function() {
      const meta = {warning: "I'm gonna KICK. YOUR. ASS!", fromHankHill: true};

      beforeEach(function() {
        wrappedField = shallow(<InputField input={input} label={label} meta={meta} />);
      });

      it('renders the error message', function() {
        expect(wrappedField.find('.warning-message').text()).to.equal(meta.warning);
      });

      it('adds the warning class', function() {
        expect(wrappedField.hasClass('warning')).to.be.true;
      });
    });

    context('when there is an error', function() {
      const meta = {error: 'Damn it, Bobby'};

      beforeEach(function() {
        wrappedField = shallow(<InputField input={input} label={label} meta={meta} />);
      });

      it('renders the error message', function() {
        expect(wrappedField.find('.error-message').text()).to.equal(meta.error);
      });

      it('adds the error class', function() {
        expect(wrappedField.hasClass('error')).to.be.true;
      });
    });
  });
});
