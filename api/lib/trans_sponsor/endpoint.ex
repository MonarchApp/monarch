defmodule TransSponsor.Endpoint do
  @moduledoc false
  use Phoenix.Endpoint, otp_app: :trans_sponsor

  socket "/socket", TransSponsor.UserSocket

  plug Plug.Static,
    at: "/", from: :trans_sponsor, gzip: false,
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
    key: "_trans_sponsor_key",
    signing_salt: "TEfB7CSU"

  plug TransSponsor.Router
end
