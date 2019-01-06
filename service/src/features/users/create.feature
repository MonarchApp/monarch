Feature: Create user

  As a consumer of the Monarch API,
  I want to be able to create a user.

  Scenario: Create a valid user
    When POST "/users"
      """
      {
        "email": "testemail@domain.com",
        "password": "password"
      }
      """
    Then response status code is 201
    And response body is undefined
    When raw query
      """
        SELECT *
        FROM user_account
        WHERE email = 'testemail@domain.com'
      """
    Then raw query result matches
      """
      [{
        bio: null,
        createDate: _.isDate,
        email: "testemail@domain.com",
        id: _.isUuid,
        modifyDate: _.isDate,
        password: _.isSize|60
        ...
      }]
      """


  Scenario Outline: Create a user with invalid payload
    When POST "/users"
      """
      {
        "email": <EMAIL>,
        "password": <PASSWORD>
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
      | EMAIL                      | PASSWORD   |
      | ""                         | "password" |
      | "spikey_hands23@yahoo.com" | ""         |
      | null                       | "password" |
      | "spikey_hands23@yahoo.com" | null       |
      | "spike"                    | "password" |


  Scenario: Create a user with a password that is too long
    When POST "/users"
      """
      {
        "email": "rough_ravenh8r@msn.com",
        "password": "Apparently this is gonna be the safest damn password the world has ever seen"
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


  Scenario: Create a user with an existing email
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
    And response body is undefined


  Scenario: Create a user with unexpected error
    When "user_account" table is dropped
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
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
