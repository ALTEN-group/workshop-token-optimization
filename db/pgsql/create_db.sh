#!/bin/bash

# Usage: Initial script put in `docker-entrypoint-initdb.d` directory
# Use bash for least error prones caused by shell syntax.

# Immediately exits if any error occurs during the script
# execution. If not set, an error could occur and the
# script would continue its execution.
set -o errexit
set -ex

# Creating an array that defines the environment variables
# that must be set. This can be consumed later via arrray
# variable expansion ${REQUIRED_ENV_VARS[@]}.
readonly REQUIRED_ENV_VARS=(
  "POSTGRES_DBS"
)

# Main execution:
# - verifies if all environment variables are set
# - runs the SQL code to create user and database
main() {
  check_env_vars_set
#   init_user_and_db
}

# Checks if all of the required environment variables are set.
# If one of them isn't, echoes a text explaining which one
# and the name of the ones that need to be.
check_env_vars_set() {
  for required_env_var in "${REQUIRED_ENV_VARS[@]}"; do
    if [[ -z "${!required_env_var}" ]]; then
      echo "Error:
    Environment variable '$required_env_var' not set.
    Make sure you have the following environment variables set:"
      "${REQUIRED_ENV_VARS[@]}"
"Aborting."
      exit 1
    fi
  done
}

# Performs the initialization in the already-started PostgreSQL
# using the preconfigured POSTGRE_USER user.
# init_user_and_db() {
#   psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
#      CREATE USER $DB_USER WITH PASSWORD '$DB_PWDWORD';
#      CREATE DATABASE $DB_DATABASE;
#      GRANT ALL PRIVILEGES ON DATABASE $DB_DATABASE TO $DB_USER;
# EOSQL
# }

function create_db_and_user() {
  local DB_NAME=$1
  local DB_USER="${DB_NAME}_USER"
  local DB_PWD="${DB_NAME}_PWD"

  # To UPPERCASE
  DB_USER=$(echo "$DB_USER" | tr '[:lower:]' '[:upper:]')
  DB_PWD=$(echo "$DB_PWD" | tr '[:lower:]' '[:upper:]')

  DB_USER="${!DB_USER}"
  DB_PWD="${!DB_PWD}"

  echo "Create database '$DB_NAME' and its user : '$DB_USER'"

  if [[ $DB_NAME == 'liquibase' ]]; then
    psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<-EOSQL
            CREATE ROLE $DB_USER WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD '$DB_PWD';
            GRANT SELECT ON ALL TABLES IN SCHEMA public TO $DB_USER;
            GRANT CONNECT ON DATABASE postgres TO $DB_USER;
EOSQL
  else
    # DROP ROLE IF EXISTS "$DB_USER";
    psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<-EOSQL
        CREATE USER $DB_USER WITH PASSWORD '$DB_PWD';
        CREATE DATABASE $DB_NAME OWNER $DB_USER;
        GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER WITH GRANT OPTION;
EOSQL
        # ALTER DATABASE $DB_NAME OWNER TO $DB_USER;
        # ALTER DATABASE $DB_NAME SET TIMEZONE TO 'CET';
  fi

}

echo "User creation requested for $POSTGRES_DBS"
for db in $(echo "$POSTGRES_DBS" | tr ',' ' '); do
    create_db_and_user "$db"
done
echo "User Added"

# Executes the main routine with environment variables
# passed through the command line. We don't use them in
# this script but now you know
main "$@"
