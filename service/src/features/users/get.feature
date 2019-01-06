Feature: Get user

  As a user of the Monarch service,
  I want to be able to get my information.

  Background:
    Given I seed "user_account"
    And I get a token


  Scenario: Get self
    When GET "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
    Then response status code is 200
    And response body matches
      """
      {
        bio: null,
        createDate: _.isDateString,
        email: "frankjaeger@foxhound.com",
        id: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
        modifyDate: _.isDateString,
        password: _.isSize|60
      }
      """


  Scenario: Get another user
    When GET "/users/3"
    Then response status code is 403
    And response body matches
      """
      {
        error: "Forbidden",
        message: "Forbidden",
        statusCode: 403,
      }
      """


  Scenario: Get a user with unexpected error
    When "user_account" table is dropped
    And GET "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
