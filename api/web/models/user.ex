defmodule Monarch.User do
  @moduledoc false
  use Monarch.Web, :model

  schema "users" do
    field :email, :string
    field :encrypted_password, :string
    field :name, :string

    timestamps()
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:email, :encrypted_password, :name])
    |> validate_required([:email, :encrypted_password, :name])
  end
end
