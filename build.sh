#!/bin/bash
set -e
if grep -q XXXXXXXXXX 'web/ldap.properties'; then
  echo "Please configure web/ldap.property first"
  exit 1
fi

export GITREV=`git log -1 --format="%H"`
export VERSION="SNAPSHOT-$GITREV"

npm install
npm run compile
npm run lint
mvn clean install -Dmapstore2.version=$VERSION
