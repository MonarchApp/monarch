Feature: Delete user

  As a consumer of the Monarch API,
  I want to be able to delete a user.

  Background:
    Given I seed "user_account"
    And I get a token


  Scenario: Delete self
    When DELETE "/users/1"
    Then response status code is 204
    And response body is undefined


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
    When DELETE "/users/1"
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
