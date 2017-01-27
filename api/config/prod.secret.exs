use Mix.Config 

config :trans_sponsor, TransSponsor.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "username_placeholder",
  password: "password_placeholder",
  database: "database_placeholder",
  hostname: "dbhost_placeholder",
  size: 20
