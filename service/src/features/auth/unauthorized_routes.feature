Feature: Unauthorized routes

  As a user of the Monarch service,
  When I don't have a token,
  I want to be denied access to all relevant endpoints.

  Scenario Outline: GET or DELETE Request without token
    When <METHOD> "<URL>"
    Then response status code is 401
    And response body matches
      """
      {
        error: _.isString,
        message: _.isContainerFor|'Missing authentication',
        statusCode: 401
      }
      """

    Examples:
      | METHOD | URL      |
      | GET    | /users/1 |
      | DELETE | /users/1 |


  Scenario Outline: PATCH, POST, or PUT Request without token
    When <METHOD> "<URL>"
      """
      {}
      """
    Then response status code is 401
    And response body matches
      """
      {
        error: _.isString,
        message: _.isContainerFor|'Missing authentication',
        statusCode: 401
      }
      """

    Examples:
      | METHOD | URL      |
      | PATCH  | /users/1 |
