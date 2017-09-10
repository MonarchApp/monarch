Feature: Users

  As a consumer of the Monarch API,
  I want to be able to interact with
  the user API resource.

  Scenario: Create user
    When POST "/users"
      """
      {
        "email": "testemail@email.com",
        "password": "password"
      }
      """
    Then response status code is 201
    And response body is
      """
      {
        "email": "testemail@email.com",
        "id": 0,
        "password": "password"
      }
      """

  Scenario: Get all users
    When GET "/users"
    Then response status code is 200
    And response body is
      """
      {}
      """

  Scenario: Get user
    When GET "/users/1"
    Then response status code is 200
    And response body is
      """
      {}
      """

  Scenario: Delete user
    When DELETE "/users/1"
    Then response status code is 200
    And response body is
      """
      {}
      """
    When GET "/users"
    Then response status code is 200
    And response body is
      """
      {}
      """
