defmodule TransSponsor.ErrorViewTest do
  use TransSponsor.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders 404.json" do
    assert render(TransSponsor.ErrorView, "404.json", []) ==
           %{errors: %{detail: "Page not found"}}
  end

  test "render 500.json" do
    assert render(TransSponsor.ErrorView, "500.json", []) ==
           %{errors: %{detail: "Server internal error"}}
  end

  test "render any other" do
    assert render(TransSponsor.ErrorView, "505.json", []) ==
           %{errors: %{detail: "Server internal error"}}
  end
end
