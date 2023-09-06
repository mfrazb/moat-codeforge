#!/bin/bash

# Import variables from .env
source .env
echo "Connecting to DB: $PG_URI"
echo "Dropping tables..."
psql ${PG_URI} -f ./server/db/dropTables.sql
echo "Done dropping tables"

echo "Building tables..."
psql ${PG_URI} -f ./server/db/buildDB.sql
echo "Done building tables"

echo "Add test data..."
node ./server/db/insertTestData.js
echo "Done adding test data"