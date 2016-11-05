defmodule TransSponsor do
  @moduledoc """
  This module is responsible for bootstrapping the entire application.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(TransSponsor.Endpoint, []),
      supervisor(TransSponsor.Repo, []),
    ]

    opts = [strategy: :one_for_one, name: TransSponsor.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    TransSponsor.Endpoint.config_change(changed, removed)
    :ok
  end
end
