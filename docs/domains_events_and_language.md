# Ubiquitous Language

### User
A member of the Monarch community.
Users can request a sidekick and remove a sidekick.

*Rationale* - Terrible, but clear for now.

*Alternatives* -
  * Member (Sounds too exclusive even though it is.)


### Sidekick
A designated user that supports another user through conversations.
A sidekick is meant to provide advice, resource information, and moral support to another user.
Users are ideally paired with a sidekick within 50 miles. If there are no sidekicks within 50 miles,
then sidekicks within 100 miles is good and beyond 100 miles is acceptable.
Sidekicks are manually vetted initially.

*Rationale* - Has no power connotations. Evokes silly, but also a bit of badass.

*Alternatives* -
  * Companion (Doesn't evoke romance and suggests someone who is at your side,
    but not obvious that this is a companion meant for helping someone.)
  * Advocate (Too connotative of politics or folks who represent you.)
  * Booster (Too plain or vague.)


### Conversation
A dialog opened between two users that facilitates the sending
and receiving of messages.


### Message
An individual statement sent from one user to another user.


### Notification
An email, push notification, or something similar that is sent to a user
to notify them of a pending sidekick request or something similar. This
also includes sign-up confirmation.


### Connect
The process of finding resources (Sidekicks, maybe support groups) for users
and providing a means to request access to those resources.


### Report
The act of a user flagging another user or entity for behavior that violates
the code of conduct. When another user is flagged, they are immediately banned,
but given an appeals process for wrongful banning.



# Events
* User signs up
* User logs in
* User signs out
* User deletes account
* User updates account
* User is connected with a sidekick
* User leaves sidekick
+ Sidekick leaves user
* User reports another user
* User sends a message
* User receives a message



# Domains

## Identity
*Type* - Core

*Subdomains* -
  * Authentication (Generic)
  * Profile (Supporting)

## Location
*Type* - Core

*Subdomains* -
  * Connect (Core)
  * Geocode (Generic)

## Conversation
*Type* - Supporting

## Notification
*Type* - Generic

## Reporting
*Type* - Generic
