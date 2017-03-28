FROM ubuntu:16.04
ENV USER root
ENV HOME /root
ADD rel/monarch /opt/monarch
RUN apt-get update
RUN apt-get -y install wget
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && dpkg -i erlang-solutions_1.0_all.deb
RUN apt-get update
RUN apt-get -y install esl-erlang
RUN apt-get -y install elixir
ENV PORT 80
CMD ["/opt/monarch/bin/monarch", "foreground"]
