@Disabled
Feature: Connect users with sidekicks within a radius

  As a user,
  I want to be able to find a sidekick,
  So I can have someone to help provide me with advice,
  resource information, and moral support.

  Background:
    Given I get a token


  Scenario: Match a user with a sidekick within 50 miles
    Given sidekicks within 50 miles and in the state
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Jeren"
    And "Jeren" is notified


  Scenario: Match a user with a sidekick within 100 miles
    Given no sidekicks within 50 miles, but sidekicks within 100 miles
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Guadalupe"
    And "Aadhya" is notified


  Scenario: Match any user
    Given no sidekicks within 100 miles
    When POST "/match"
    Then response status code is 201
    And response is the closest user, "Ibrahim"
    And "Ibrahim" is notified


  Scenario: No user is available
    When POST "/match"
    Then response is not found
