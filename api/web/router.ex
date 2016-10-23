defmodule TransSponsor.Router do
  use TransSponsor.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TransSponsor do
    pipe_through :api
  end
end
