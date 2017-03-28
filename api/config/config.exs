# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Project config
config :monarch,
  ecto_repos: [Monarch.Repo]

# Configures the endpoint
config :monarch, Monarch.Endpoint,
  pubsub: [name: Monarch.PubSub,
           adapter: Phoenix.PubSub.PG2],
  render_errors: [accepts: ~w(json)],
  root: Path.dirname(__DIR__),
  secret_key_base: "4JMOAnIlu37jSdw/YMJilOk1MHbKS2ohBc4iHUxdA3w1jLl949yqfCZE2ywV/vVs",
  url: [host: "localhost"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
