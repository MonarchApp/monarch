import Html exposing (div, h1, h2, section, text)
import Html.Attributes exposing (class)


main =
  div [class "app-wrapper"]
    [ section []
      [ h1 [] [text "Hello World"]
      ]
    , section []
      [ h2 [] [text "This is really important."]
      ]
    ]
