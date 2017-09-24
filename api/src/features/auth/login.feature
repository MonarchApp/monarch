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

  Scenario: Login with missing field
    When POST "/login"
      """
      {
        "email": "frankjaeger@foxhound"
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        error: _.isString,
        message: _.isContainerFor|'"password" is required',
        statusCode: 400,
        validation: {
          keys: ["password"],
          source: "payload"
        }
      }
      """
