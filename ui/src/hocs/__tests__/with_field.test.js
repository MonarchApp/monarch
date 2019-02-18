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

const inputProvidedByReduxForm = {name};

describe('withField', function() {
  describe('rendering', function() {
    context('always', function() {
      before(function() {
        wrappedField = mount(
          <InputField
            errorId={errorId}
            id={id}
            input={inputProvidedByReduxForm}
            label={label}
            type={type} />
        );
      });

      after(function() {
        wrappedField.unmount();
      });

      it('renders a single label with the provided label content and name', function() {
        const labelComponent = wrappedField
          .find({'test-label': 'HOC/field-label'});
        expect(labelComponent).to.have.length(1);
        expect(labelComponent.text()).to.equal(label);
        expect(labelComponent.prop('htmlFor')).to.equal(id);
      });

      it('renders the provided component and passes the HOC props', function() {
        expect(wrappedField.find('input').props()).to.eql(
          Object.assign({}, inputProvidedByReduxForm, {
            'aria-describedby': errorId,
            'aria-invalid': undefined,
            autoFocus: undefined,
            className: 'input',
            id: id,
            required: undefined,
            type
          })
        );
      });
    });

    context('when there is an error', function() {
      const metaProvidedByReduxForm = {error: 'Damn it, Bobby'};

      before(function() {
        wrappedField = mount(<InputField
          input={inputProvidedByReduxForm}
          label={label}
          meta={metaProvidedByReduxForm}
          type={type} />
        );
      });

      after(function() {
        wrappedField.unmount();
      });

      it('renders the error message', function() {
        expect(wrappedField.find({'test-label': 'HOC/field-error'}).text())
          .to.equal(metaProvidedByReduxForm.error);
      });

      it('marks the input as invalid', function() {
        expect(wrappedField.find('input').prop('aria-invalid')).to.be.true;
      });
    });

    context('when the field is required', function() {
      before(function() {
        wrappedField = mount(<InputField
          input={inputProvidedByReduxForm}
          label={label}
          required={true}
          type={type} />
        );
      });

      after(function() {
        wrappedField.unmount();
      });

      it('marks the input as required', function() {
        expect(wrappedField.find('input').prop('required')).to.be.true;
      });
    });
  });
});
