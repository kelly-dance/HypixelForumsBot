# Hypixel Forums Bot

## Commands

### create #channel ...tags

Create a webhook in a channel that will alert of posts from those tags. If the webhook already exists it will union the tags.

Ex: `hf.create #alerts pit skyblock`

### delete #channel [...tags]

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

### tags

List the valid tags.
