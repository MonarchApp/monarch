Feature: Get user

  As a consumer of the Monarch API,
  I want to be able to get a user from the database.

  Background:
    Given I seed "users"
    And I get a token


  Scenario: Get a valid user
    When GET "/users/1"
    Then response status code is 200
    And response body matches
      """
      {
        createDate: _.isDateString,
        email: "frankjaeger@foxhound.com",
        id: 1,
        modifyDate: _.isDateString,
        password: _.isSize|60
      }
      """


  Scenario: Get a nonexistant user
    When GET "/users/75"
    Then response status code is 200
    And response body is empty


  Scenario: Get a user with unexpected error
    When "users" table is dropped
    And GET "/users/1"
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
