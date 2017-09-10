Feature: Create user

  As a consumer of the Monarch API,
  I want to be able to create a user.

  Scenario: Create user
    When POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    Then response status code is 200
    And response body matches
      """
      {
        "email": "testemail@domain.com",
        "id": 0,
        "password": _.isOmitted
      }
      """


  Scenario: Creating a user without an email
    When POST "/users"
      """
      {
        "password": "password"
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        "error": _.isString,
        "message": _.isString,
        "statusCode": 400,
        "validation": {
          "keys": [
            "email"
          ],
          "source": "payload"
        }
      }
      """


  Scenario: Creating a user without a password
    When POST "/users"
      """
      {
        "email": "testemail@domain.com"
      }
      """
    Then response status code is 400
    And response body matches
      """
      {
        "error": _.isString,
        "message": _.isString,
        "statusCode": 400,
        "validation": {
          "keys": [
            "password"
          ],
          "source": "payload"
        }
      }
      """
