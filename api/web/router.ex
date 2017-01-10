defmodule TransSponsor.Router do
  @moduledoc false
  use TransSponsor.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TransSponsor do
    pipe_through :api

    scope "/v1", V1, as: :v1 do
      resources "/users", UserController, except: [:new, :edit]
    end
  end
end
