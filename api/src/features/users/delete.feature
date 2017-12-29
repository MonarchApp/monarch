Feature: Delete user

  As a consumer of the Monarch API,
  I want to be able to delete a user.

  Background:
    Given I seed "users"
    And I get a token


  Scenario: Delete user
    When DELETE "/users/1"
    Then response status code is 201
    And response body is undefined


  Scenario: Delete nonexisting user
    When DELETE "/users/1337"
    Then response status code is 404
    And response body matches
      """
      {
        error: "Not found",
        message: "User with id "1" does not exist",
        statusCode: 404,
      }
      """


  Scenario: Delete user with unexpected error
    Given "users" table is dropped
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
