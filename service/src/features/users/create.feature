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
        FROM users
        WHERE email = 'testemail@domain.com'
      """
    Then raw query result matches
      """
      [{
        bio: null,
        createDate: _.isDate,
        email: "testemail@domain.com",
        id: 1,
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
        error: "Bad Request",
        message: _.isContainerFor|'<MESSAGE>',
        statusCode: 400,
        validation: {keys: [<KEYS>], source: "payload"}
      }
      """

  Examples:
      | EMAIL                      | PASSWORD   | MESSAGE                               | KEYS       |
      | ""                         | "password" | "email" is not allowed to be empty    | "email"    |
      | "spikey_hands23@yahoo.com" | ""         | "password" is not allowed to be empty | "password" |
      | null                       | "password" | "email" must be a string              | "email"    |
      | "spikey_hands23@yahoo.com" | null       | "password" must be a string           | "password" |
      | "spike"                    | "password" | "email" must be a valid email         | "email"    |


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
        error: _.isString,
        message: _.isContainerFor|'"password" length must be less than or equal to 72 characters long',
        statusCode: 400,
        validation: {keys: ["password"], source: "payload"}
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
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
