psql postgres -c "CREATE DATABASE ecommerce
                      WITH
                      OWNER = postgres
                      ENCODING = 'UTF8'
                      CONNECTION LIMIT = -1;"