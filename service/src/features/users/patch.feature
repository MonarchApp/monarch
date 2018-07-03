Feature: Patch user

  As a consumer of the Monarch API,
  I want to be able to update a user from the database.

  Background:
    Given I seed "users"
    And I get a token


  Scenario: Update self
    Given 1st user matches
      """
      {
        modifyDate: _.isSetAsMemo|modifyDate,
        ...
      }
      """
    When PATCH "/users/1"
      """
      {
        "bio": "More...MORE!!"
      }
      """
    Then response status code is 200
    And response body is undefined
    Then 1st user matches
      """
      {
        bio: 'More...MORE!!',
        modifyDate: _.isNotEqualToMemo|modifyDate
        ...
      }
      """


  Scenario: Update self with empty object
    Given I store the 1st user
    When PATCH "/users/1"
      """
      {}
      """
    Then response status code is 200
    And 1st user remains unchanged


  Scenario Outline: Update self with invalid payload
    When PATCH "/users/1"
      """
      {
        "<KEY>": <VALUE>
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        error: "Bad Request",
        message: _.isContainerFor|'<MESSAGE>',
        statusCode: 400,
        validation: {keys: ["<KEY>"], source: "payload",}
      }
      """


  Examples:
    | KEY        | VALUE                                             | MESSAGE                     |
    | createDate | 1998                                              | "createDate" is not allowed |
    | email      | "A cornered fox is more dangerous than a jackal!" | "email" is not allowed      |
    | foobar     | "Only a fool trusts his life to a weapon!"        | "foobar" is not allowed     |
    | id         | 1337                                              | "id" is not allowed         |
    | modifyDate | 1999                                              | "modifyDate" is not allowed |
    | password   | "Make me feel alive again!"                       | "password" is not allowed   |
    | bio        | null                                              | "bio" must be a string      |


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
        message: "This action may only be performed by the same user",
        statusCode: 403,
      }
      """


  Scenario: Update a user with unexpected error
    Given "users" table is dropped
    When PATCH "/users/1"
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
