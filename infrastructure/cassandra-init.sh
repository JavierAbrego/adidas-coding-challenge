CQL="
CREATE KEYSPACE adidas WITH durable_writes = true AND replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

create table adidas.subscription
(
    id UUID,
    email text,
    first_name text,
    gender text,
    date_of_birth bigint,
    consent boolean,
    subscribed boolean,
    newsletter_id text,
    PRIMARY KEY (id)
);
"

until echo $CQL | cqlsh; do
  echo "cqlsh: Cassandra is unavailable to initialize - will retry later"
  sleep 2
done &

exec /docker-entrypoint.sh "$@"
