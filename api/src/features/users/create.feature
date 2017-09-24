Feature: Create user

  As a consumer of the Monarch API,
  I want to be able to create a user.

  Scenario: Creating a valid user
    When POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    Then response status code is 201
    And response body is empty
    When raw query
      """
        SELECT *
        FROM users
        WHERE email = 'testemail@domain.com'
      """
    And raw query result matches
      """
        [{
          createDate: _.isDate,
          email: "testemail@domain.com",
          id: 1,
          modifyDate: _.isDate,
          password: _.isSize|60
        }]
      """


  Scenario: Creating a user with a missing field
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
        "message": _.isContainerFor|'"email" is required',
        "statusCode": 400,
        "validation": {
          "keys": [
            "email"
          ],
          "source": "payload"
        }
      }
      """


  Scenario: Creating a user with an existing email
    When POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    When POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    Then response status code is 201
    And response body is empty


  Scenario: Creating a user with unexpected error
    When "users" table is dropped
    And POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    Then response status code is 500
    And response body matches
      """
      {
        "error": _.isString,
        "message": "An internal server error occurred",
        "statusCode": 500,
      }
      """
