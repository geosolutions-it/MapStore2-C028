#!/bin/bash
set -e
if grep -q XXXXXXXXXX 'web/ldap.properties'; then
  echo "Please configure web/ldap.property first"
  exit 1
fi

npm install
npm run compile
npm run lint
mvn clean install
