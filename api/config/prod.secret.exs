use Mix.Config

config :monarch, Monarch.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "username_placeholder",
  password: "password_placeholder",
  database: "database_placeholder",
  hostname: "dbhost_placeholder",
  size: 20
