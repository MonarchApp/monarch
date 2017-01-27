FROM ubuntu:16.04
ENV USER root
ENV HOME /root
COPY rel/trans_sponsor /opt
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
RUN sudo apt-get update
RUN sudo apt-get install esl-erlang
RUN sudo apt-get install elixir
ENV PORT 80
CMD ["/opt/trans_sponsor/bin/trans_sponsor", "foreground"]
