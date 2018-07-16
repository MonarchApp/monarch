const {When} = require('cucumber');
const jwt = require('jsonwebtoken');

const isTokenActive = token => {
  if (!token) return false;

  const {exp} = jwt.decode(token);
  return (exp * 1000) > (Date.now() - (60 * 1000));
};

When('I get a token', async function() {
  if (isTokenActive(this.token)) return this.token;

  const url = this.utils.getRequestUrl('/login');
  const body = {
    email: 'frankjaeger@foxhound.com',
    password: 'password'
  };

  const result = await this.utils.request({body, method: 'POST', url});
  this.token = result.body.token;
});
