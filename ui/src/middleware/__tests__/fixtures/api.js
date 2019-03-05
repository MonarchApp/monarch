const JOI_ERROR_RESPONSE = new Response(JSON.stringify({
  statusCode: 400,
  error: 'Bad Request',
  message: 'child "billy" fails because ["billy" has stinky breath]',
  validation: {
    source: 'payload',
    keys: ['billy']
  }
}), { status: 400 });

const JOI_SUBMISSION_ERRORS = {
  errors: {
    _error: '"billy" has stinky breath',
    billy: true
  }
};

export default { JOI_ERROR_RESPONSE, JOI_SUBMISSION_ERRORS };
