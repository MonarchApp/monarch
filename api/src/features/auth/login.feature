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
        attributes: {error: 'invalid username or password'}
      }
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
        attributes: {error: 'invalid username or password'}
      }
      """


  Scenario: Login with unexpected error
    When "users" table is dropped
    And POST "/login"
      """
      {
        "email": "frankjaeger@foxhound.com",
        "password": "password"
      }
      """
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
