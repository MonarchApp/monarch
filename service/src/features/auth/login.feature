Feature: Login

  As a user of the Monarch service,
  I want to be able to log in,
  So I can use the service.

  Background:
    Given I seed "user_account"


  @StubDate
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
    And returned token lasts for thirty minutes


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


  Scenario Outline: Login with invalid payload
    When POST "/login"
      """
      {
        "email": <EMAIL>,
        "password": <PASSWORD>
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid request payload input'
      }
      """

    Examples:
      | EMAIL                      | PASSWORD   |
      | ""                         | "password" |
      | "frankjaeger@foxhound.com" | ""         |
      | null                       | "password" |
      | "frankjaeger@foxhound.com" | null       |
      | "frankjaeger"              | "password" |


  Scenario: Login with unexpected error
    When "user_account_info" table is dropped
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
