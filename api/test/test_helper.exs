ExUnit.start

Mix.Task.run "ecto.create", ~w(-r TransSponsor.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r TransSponsor.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(TransSponsor.Repo)
