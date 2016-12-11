defmodule TransSponsor.Router do
  @moduledoc false
  use TransSponsor.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TransSponsor do
    pipe_through :browser

    get "/", PageController, :index
    resources "/users", UserController
  end
end
