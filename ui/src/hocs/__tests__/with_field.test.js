import React from 'react';
import withField from '../with_field.js';

const InputField = withField('input');
const id = 'rusty-shackleford@see-eye-ay.gov';
const label = 'Use your *real* email';
const name = 'Email';
const type = 'email';
const errorId = `Well if it's Jack Ruby's hat, then I have to make sure it's
  his hat... Yeah... Alright, what colors does it come in?`;
let wrappedField;

const input = {name};

describe('withField', function() {
  describe('rendering', function() {
    context('always', function() {
      before(function() {
        wrappedField = mount(
          <InputField
            errorId={errorId}
            id={id}
            input={input}
            label={label}
            type={type} />
        );
      });

      after(function() {
        wrappedField.unmount();
      });

      it('renders a single label with the provided label content and name', function() {
        const labelComponent = wrappedField
          .find({testdatalabel: 'HOC/field-label'});
        expect(labelComponent).to.have.length(1);
        expect(labelComponent.text()).to.equal(label);
        expect(labelComponent.prop('htmlFor')).to.equal(id);
      });

      it('renders the provided component and passes the HOC props', function() {
        expect(wrappedField.find('input').props()).to.eql(
          Object.assign({}, input, {
            'aria-describedby': errorId,
            className: 'input',
            id: id,
            type
          }));
      });
    });

    context('when there is an error', function() {
      const meta = {error: 'Damn it, Bobby'};

      before(function() {
        wrappedField = mount(<InputField
          input={input}
          label={label}
          meta={meta}
          type={type} />
        );
      });

      after(function() {
        wrappedField.unmount();
      });

      it('renders the error message', function() {
        expect(wrappedField.find({testdatalabel: 'HOC/field-error'}).text())
          .to.equal(meta.error);
      });

      it('looks like an error', function() {
        expect(wrappedField.find({testdatalabel: 'HOC/field-wrapper'})
          .hasClass('error')).to.be.true;
      });
    });
  });
});
