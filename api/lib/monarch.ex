defmodule Monarch do
  @moduledoc """
  This module is responsible for bootstrapping the entire application.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(Monarch.Endpoint, []),
      supervisor(Monarch.Repo, []),
    ]

    opts = [strategy: :one_for_one, name: Monarch.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    Monarch.Endpoint.config_change(changed, removed)
    :ok
  end
end
