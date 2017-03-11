defmodule Monarch.ErrorViewTest do
  use Monarch.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders 404.json" do
    assert render(Monarch.ErrorView, "404.json", []) ==
           %{errors: %{detail: "Page not found"}}
  end

  test "render 500.json" do
    assert render(Monarch.ErrorView, "500.json", []) ==
           %{errors: %{detail: "Server internal error"}}
  end

  test "render any other" do
    assert render(Monarch.ErrorView, "505.json", []) ==
           %{errors: %{detail: "Server internal error"}}
  end
end
