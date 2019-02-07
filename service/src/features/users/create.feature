Feature: Create user

  As a potential consumer of the Monarch service,
  I want to be able to create a user,
  so I can interact with the service.

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
        FROM user_account_info AS i
        INNER JOIN user_account AS u ON (i.user_account_id = u.id)
        WHERE i.email = 'testemail@domain.com'
      """
    Then raw query result matches
      """
      [{
        bio: null,
        created_at: _.isDate,
        email: "testemail@domain.com",
        id: _.isUuid,
        password: _.isSize|60,
        updated_at: _.isDate
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
    When "user_account_info" table is dropped
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
