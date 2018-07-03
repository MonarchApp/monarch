Feature: Unauthorized routes

  As a consumer of the Monarch API,
  I want to be denied access to all relevant endpoints unless I have a token.

  Scenario Outline: Request without token
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
      | GET    | /users   |
      | GET    | /users/1 |
      | DELETE | /users/1 |
