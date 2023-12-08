# syntax=docker/dockerfile:1

FROM --platform=linux/amd64 denoland/deno

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y python3
RUN apt-get install -y libterm-readkey-perl
RUN apt-get install -y golang-go

WORKDIR /app
COPY . .

