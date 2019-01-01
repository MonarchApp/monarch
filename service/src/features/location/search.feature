Feature: User can search for a location

  As a user,
  I want a list of location suggestions,
  So Monarch can store my location,
  To enable my access to resources.

  Background:
    Given I seed "user_account"
    And I get a token

  Scenario: Find a location
    When POST "/location/search"
      """
      {
        "value": "Oakland"
      }
      """
    Then response status code is 200
    And response body matches
      """
      [
        {
          label: "United States, MI, Oakland",
          locationId: "NT_QGc7BMU.aSXiFEE7B-CdhC"
        },
        {
          label: "United States, CA, Oakland",
          locationId: "NT_GZjy33o37B9sEpW0Qo2O-D"
        },
        {
          label: "Australia, VIC, Oaklands Junction",
          locationId: "NT_BI83mpCVa3V9rLDBYDZzIB"
        },
        {
          label: "Australia, VIC, Oaklands Junction, Oaklands Rd",
          locationId: "NT_udwRS962hbzrU455xcnOcD"
        },
        {
          "label": "Canada, BC, Victoria, Oaklands",
          "locationId": "NT_NSy0yH7AxPB.dff6u.URDA",
        }
      ]
      """

  Scenario: Find a location without a value
    When POST "/location/search"
      """
      {}
      """
    Then response status code is 400
    And response body matches
      """
      {
        error: 'Bad Request',
        message: 'Invalid request payload input',
        statusCode: 400
      }
      """

  @Only
  Scenario: Third-party geocoding API is down
    Given the third party geocoding API is down
    When POST "/location/search"
      """
      {
        "value": "Derp"
      }
      """
    Then response status code is 503
    And response body matches
      """
      {
        error: 'Service Unavailable',
        message: 'Service Unavailable',
        statusCode: 503,
      }
      """
