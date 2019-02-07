Feature: Patch user

  As a user of the Monarch service,
  I want to be able to update my information.

  Background:
    Given the database is seeded with "user_account"
    And a valid, authenticated token is obtained


  Scenario: Update self
    Given "10ba038e-48da-487b-96e8-8d3b99b6d18a" user matches
      """
      {
        modifyDate: _.isSetAsMemo|modifyDate,
        ...
      }
      """
    When PATCH "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
      """
      {
        "bio": "More...MORE!!"
      }
      """
    Then response status code is 200
    And response body is undefined
    Then "10ba038e-48da-487b-96e8-8d3b99b6d18a" user matches
      """
      {
        bio: 'More...MORE!!',
        modifyDate: _.isNotEqualToMemo|modifyDate
        ...
      }
      """


  Scenario: Update self with empty object
    Given a comparison of the "10ba038e-48da-487b-96e8-8d3b99b6d18a" user
    When PATCH "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
      """
      {}
      """
    Then response status code is 200
    And "10ba038e-48da-487b-96e8-8d3b99b6d18a" user remains unchanged


  Scenario Outline: Update self with invalid payload
    When PATCH "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
      """
      {
        "<KEY>": <VALUE>
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
    | KEY        | VALUE                                             |
    | createDate | 1998                                              |
    | email      | "A cornered fox is more dangerous than a jackal!" |
    | foobar     | "Only a fool trusts his life to a weapon!"        |
    | id         | 1337                                              |
    | modifyDate | 1999                                              |
    | password   | "Make me feel alive again!"                       |
    | bio        | null                                              |


  Scenario: Update another user
    When PATCH "/users/1337"
      """
      {}
      """
    Then response status code is 403
    And response body matches
      """
      {
        error: "Forbidden",
        message: "Forbidden",
        statusCode: 403,
      }
      """


  Scenario: Update a user with unexpected error
    Given "user_account_info" table is dropped
    When PATCH "/users/10ba038e-48da-487b-96e8-8d3b99b6d18a"
      """
      {
        "bio": "Gray fox! It can't be!"
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
