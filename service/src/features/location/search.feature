Feature: User can search for a location

  As a user,
  I want a list of location suggestions,
  So Monarch can store my location,
  To enable my access to resources.

  Background:
    Given I seed "users"
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
          locationId: "NT_BI83mpCVa3V9rLDBYDZzIB-D"
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
          "label": "Canada, BC, Victoria, <b>Oakland</b>s",
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
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid request payload input'
      }
      """

  Scenario: Third-party service is down
    Given the third party geocoding service is down
    When POST "/location/search"
    Then response status code is 500
    And response body matches
      """
      {
        error: _.isString,
        message: "An internal server error occurred",
        statusCode: 500,
      }
      """
