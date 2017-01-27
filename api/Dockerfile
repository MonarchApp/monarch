FROM ubuntu:16.04
ENV USER root
ENV HOME /root
COPY rel/trans_sponsor /opt
RUN apt-get update
RUN apt-get install -f wget
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
RUN apt-get update
RUN apt-get install -f esl-erlang
RUN apt-get install -f elixir
ENV PORT 80
CMD ["/opt/trans_sponsor/bin/trans_sponsor", "foreground"]
