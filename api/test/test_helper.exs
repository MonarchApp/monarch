ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Monarch.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Monarch.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Monarch.Repo)
