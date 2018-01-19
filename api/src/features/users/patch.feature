Feature: Patch user

  As a consumer of the Monarch API,
  I want to be able to update a user from the database.

  Background:
    Given I seed "users"
    And I get a token


  Scenario: Update self
    When PATCH "/users/1"
      """
      {
        newValue: 'More...MORE!!'
      }
      """
    Then response status code is 201
    And response body is undefined
    When raw query
      """
        SELECT *
        FROM users
        WHERE email = 'frankjaeger@foxhound.com'
      """
    Then raw query result matches
      """
      {
        createDate: _.isDateString,
        email: "frankjaeger@foxhound.com",
        id: 1,
        modifyDate: _.isDateString,
        newValue: 'More...MORE!!'
        password: _.isSize|60
      }
      """


  Scenario: Update another user
    When PATCH "/users/1337"
    Then response status code is 403
    And response body matches
      """
      {
        error: "Forbidden",
        message: "This action may only be performed by the same user",
        statusCode: 403,
      }
      """


  Scenario: Update a user with unexpected error
    Given "users" table is dropped
    When PUT "/users/1"
      """
      {}
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
