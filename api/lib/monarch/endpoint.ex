defmodule Monarch.Endpoint do
  @moduledoc false
  use Phoenix.Endpoint, otp_app: :monarch

  socket "/socket", Monarch.UserSocket

  plug Plug.Static,
    at: "/", from: :monarch, gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)

  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_monarch_key",
    signing_salt: "TEfB7CSU"

  plug Monarch.Router
end
