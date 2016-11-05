defmodule TransSponsor.Router do
  @moduledoc false
  use TransSponsor.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TransSponsor do
    pipe_through :api
  end
end
