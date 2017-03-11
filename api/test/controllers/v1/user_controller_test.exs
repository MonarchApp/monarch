defmodule Monarch.V1.UserControllerTest do
  use Monarch.ConnCase

  alias Monarch.User
  @valid_attrs %{
    email: "jackburton@theporkchopexpress.com",
    encrypted_password: "itsallinthereflexes",
    name: "Jack Burton"
  }
  @invalid_attrs %{
    email: "wangchi@dragonoftheblackpool.com",
    name: "Wang Chi"
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, v1_user_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = get conn, v1_user_path(conn, :show, user)
    assert json_response(conn, 200)["data"] == %{"id" => user.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, v1_user_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, v1_user_path(conn, :create), user: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(User, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, v1_user_path(conn, :create), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = put conn, v1_user_path(conn, :update, user), user: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(User, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = put conn, v1_user_path(conn, :update, user), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = delete conn, v1_user_path(conn, :delete, user)
    assert response(conn, 204)
    refute Repo.get(User, user.id)
  end
end
