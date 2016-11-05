# config/dogmas.exs
use Mix.Config
alias Dogma.Rule

config :dogma,

  rule_set: Dogma.RuleSet.All,
  exclude: [
    ~r(\Alib/vendor/),
  ],
  override: [
    %Rule.LineLength{max_length: 120},
  ]
