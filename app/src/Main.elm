module Main exposing (..)

import Html exposing (..)
import Html.CssHelpers exposing (..)
import Html.Attributes exposing (..)
import Json.Encode as Encode

main : Html a
main =
    div [ class "container" ]
        [
            header []
                [
                    nav [ class "navigation" ] <| navElems ++ [ span [ class "nav-link highlight" ] [ text "BUY TICKETS" ] ]
                ]
        ,
            div [class "flexible"]
                [
                    img [ class "fill-width", src "http://media3.giphy.com/media/TWszQ81GTtQje/200.gif" ] []
                ,
                    img [ class "fill-width", src "http://media3.giphy.com/media/TWszQ81GTtQje/200.gif" ] []
                ,
                    img [ class "fill-width", src "http://media3.giphy.com/media/TWszQ81GTtQje/200.gif" ] []
                ,
                    img [ class "fill-width", src "http://media3.giphy.com/media/TWszQ81GTtQje/200.gif" ] []
                ]
        ]

navElems : List (Html msg)
navElems =
    [ "SPEAKERS", "SCHEDULE", "WORKSHOPS", "VENUE", "BLOG", "CONTACT" ]
        |> List.map (\name -> span [ class "nav-link" ] [ text name ])
