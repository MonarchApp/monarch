@Disabled
Feature: Match users within a radius

  As a user,
  I want to be able to find a mentor,
  So I can have someone to lean on in this fucked up world.

  Background:
    Given I get a token


  Scenario: Match a user within 50 miles
    Given users within 50 miles and in the state
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Jeren"
    And "Jeren" is notified


  Scenario: Match a user within state
    Given no users within 50 miles, but users in the state
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Guadalupe"
    And "Guadalupe" is notified


  Scenario: Match a user within 200 miles
    Given no users within the state, but users within 200 miles
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Aadhya"
    And "Aadhya" is notified


  Scenario: Match any user
    Given no user within 200 miles
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Ibrahim"
    And "Ibrahim" is notified


  Scenario: No user is available
    When POST "/match"
    Then response is not found
