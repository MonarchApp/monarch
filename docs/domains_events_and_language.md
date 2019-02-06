# Ubiquitous Language

### User Account
A digital representation of a member of the Monarch community.
A user can request a sidekick and remove a sidekick.

*Synonyms* - Users
*Rationale* - Not the greatest title, but clear for now.

### User Account Profile
A series of optional, data fields that describe a user account. This may include things
such as the person's name, their pronoun, their gender identity, or a biography.


### Sidekick
A designated user that supports another user through conversations.
A sidekick is meant to provide advice, resource information, and moral support to another user.
Users are ideally paired with a sidekick within 50 miles. If there are no sidekicks within 50 miles,
then sidekicks within 100 miles is good and beyond 100 miles is acceptable.
Sidekicks are manually vetted initially.

*Rationale* - Has no power connotations. Evokes silly, but also a bit of badass.


### Resource
A person, asset, article, support group, or other miscellaneous entity that can
benefit a user.


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


### Complaint
A message sent to Monarch by a user or a sidekick flagging another user or sidekick
for behavior that violates the code of conduct.

When a user receives a complaint, they are immediately banned,
but given an appeals process for wrongful banning.

After initial rollout, when a sidekick receives a complaint, their complaint will
be reviewed by three other sidekicks to determine action.


# Domains
## Identity (Supporting)
Stores and authenticates personally identifiable information,
passwords, or other user account information.

## Connect (Core)
Connects a user with a sidekick, enables conversations, or stores
someone's location to facilitate proper connections.

## Notification (Generic)
Sends emails or push notifications to notify user accounts of recent activity,
confirm email address changes, or confirm user account sign ups.

## Complaints (Generic)
Enables the filing, sending, refutation, or acceptance of complaints
between users.


# Events
* User signs up
* User logs in
* User signs out
* User edits profile
* User changes password
* User changes email
* User deletes user account
* User updates user account
* User is connected with a sidekick
* User leaves sidekick
* Sidekick leaves user
* User sends a message
* User receives a message
* Sidekick files complaint against a user
* User files complaint against sidekick
