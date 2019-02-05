# HOCs

HOCs is shorthand for higher-order components. In other words, these
are functions that allow us to decorate our components.

## withField
This wraps a form element with field boilerplate for use with redux-form.
This includes labels, errors, and maintaining a11y compliance where possible.
We use an HOC here instead of a normal component in order to ensure a singular
point of integration for redux-form as well as making the implementation of
fields for redux-form simpler.
