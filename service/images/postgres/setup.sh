#!/usr/bin/bash
set -e

POSTGRES="psql --username=${POSTGRES_USER}"

for db in $POSTGRES_DBS; do
  $POSTGRES <<EOF
CREATE DATABASE ${db} OWNER ${POSTGRES_USER} TEMPLATE template_postgis;
EOF
done
