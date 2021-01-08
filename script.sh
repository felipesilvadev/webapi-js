echo '\n - requesting all heroes'
curl localhost:3333/heroes

echo '\n\n - requesting specific hero'
curl localhost:3333/heroes/1

echo '\n\n - requesting with wrong body'
curl --silent -X POST \
  --data-binary '{"invalid": "data"}' \
  localhost:3333/heroes

echo '\n\n - creating Chapolin'
CREATE=$(curl --silent -X POST \
  --data-binary '{"name": "Chapolin", "age": 100, "power": "Strength"}' \
  localhost:3333/heroes)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo '\n\n - requesting Chapolin'
curl --silent localhost:3333/heroes/$ID