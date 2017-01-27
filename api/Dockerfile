FROM ubuntu:16.04
ENV USER root
ENV HOME /root
COPY rel/ /opt/trans-sponsor
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
RUN sudo apt-get update
RUN sudo apt-get install esl-erlang
RUN sudo apt-get install elixir
WORKDIR /opt/trans-sponsor
RUN PORT=80 MIX_ENV=prod mix phoenix.server
