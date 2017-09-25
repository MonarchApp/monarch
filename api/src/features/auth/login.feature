Feature: Login

  As a consumer of the Monarch API,
  I want to be able to log in using a username and password.

  Background:
    Given I seed "users"

  Scenario: Login with valid credentials
    When POST "/login"
      """
      {
        "email": "frankjaeger@foxhound.com",
        "password": "password"
      }
      """
    Then response status code is 200
    And response body matches
      """
      {
        token: _.isString
      }
      """

  Scenario: Login with nonexistent user
    When POST "/login"
      """
      {
        "email": "bigboss@foxhound.com",
        "password": "password"
      }
      """
    Then response is delayed
    And response status code is 401
    And response body matches
      """
      {
        error: 'Unauthorized',
        statusCode: 401,
        message: 'invalid username or password',
        attributes: {error: 'invalid username or password'}}
      """

  Scenario: Login with incorrect password
    When POST "/login"
      """
      {
        "email": "frankjaeger@foxhound.com",
        "password": "incorrectpassword"
      }
      """
    Then response is delayed
    And response status code is 401
    And response body matches
      """
      {
        error: 'Unauthorized',
        statusCode: 401,
        message: 'invalid username or password',
        attributes: {error: 'invalid username or password'}}
      """

  Scenario Outline: Login with invalid payload
    When POST "/login"
      """
      {
        "email": "<EMAIL>",
        "password": "<PASSWORD>"
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        error: _.isString,
        message: _.isContainerFor|'<MESSAGE>',
        statusCode: 400,
        validation: {keys: [<KEYS>], source: "payload"}
      }
      """

    Examples:
      | EMAIL                    | PASSWORD | MESSAGE                               | KEYS       |
      |                          | password | "email" is not allowed to be empty    | "email"    |
      | frankjaeger@foxhound.com |          | "password" is not allowed to be empty | "password" |
      | frankjaeger              | password | "email" must be a valid email         | "email"    |
