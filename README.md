# Hypixel Forums Bot

## Setup

Two `.env` files must be created. `bot/.env` and `listener/.env`.

 In `bot/.env` you need 3 and optionally a fourth value. `PREFIX`, `DISCORD_TOKEN`, `ADMINS`, and optionally `ERROR_WEBHOOK`.
 First two are self explainatory, the third should be user ids separated by commas. The fourth is the webhook id and token seperated by a comma which will be used to alert of errors.
 
 In `listener/.env` you will just have that same `ERROR_WEBHOOK` value.
 
 To run use `docker compose up`. Used `-d` to run it detatched mode (in the background).
 
 To help with debugging in the database use `docker-compose run redis redis-cli -h redis` to open a redis cli instance connected to the database.

## Commands

### create \[#channel] [...tags]

Create a webhook in a channel that will alert of posts from those tags. If the webhook already exists it will union the tags.

Ex: `hf.create #alerts pit skyblock`

### delete \[#channel] [...tags]

Delete alerts in a channel all together.

Ex: `hf.delete #alerts`

OR 

Deletes tags from an existing webhook for a channel.

Ex: `hf.delete #alerts pit`

### inspect [#channel]

List what channels have webhooks.

Ex: `hf.inspect`

OR

See what tags a channel is listening for.

Ex: `hf.inspect #channel`

### tags [tag]

List the valid tags.

### help [command]

Get info about commands or a specific command.
