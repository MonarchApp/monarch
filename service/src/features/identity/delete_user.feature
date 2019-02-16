Feature: Delete user

  As a user of the Monarch service,
  I want to be able to delete my account,
  Because I no longer want to use the service.

  Background:
    Given the database is seeded with "user_account"
    And a valid, authenticated token is obtained


  Scenario: Delete self and personal information
    When DELETE "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
    Then response status code is 204
    And response body is undefined
    When raw query
      """
        SELECT *
        FROM user_account
        WHERE id = '10ba038e-48da-487b-96e8-8d3b99b6d18a'
      """
    Then raw query result matches
      """
      []
      """
    When raw query
      """
        SELECT *
        FROM user_account_info
        WHERE user_account_id = '10ba038e-48da-487b-96e8-8d3b99b6d18a'
      """
    Then raw query result matches
      """
      []
      """


  Scenario: Delete another user
    When DELETE "/users/1337"
    Then response status code is 403
    And response body matches
      """
      {
        error: "Forbidden",
        message: "Forbidden",
        statusCode: 403,
      }
      """


  Scenario: Delete user with unexpected error
    Given "user_account" table is dropped
    When DELETE "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
