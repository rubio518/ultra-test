# Ultra test

This test was made using NestJs as the framework and typescript as the language.

To run this test you need to execute the following command:
```
docker-compose up
```

the routes included in the project are:


```bash
POST    /games
GET     /games
GET     /games/:id
PUT     /games/:id
DELETE  /games/:id
GET     /games/:id/publisher  # this gets the publisher of a game
POST    /tasks/update_games   # this executes the process of deleting and making discounts on games
```

an exaple of a request to create a game is:
```bash
curl --location --request POST 'localhost:3000/games' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "postmandeleted",
    "price": 12.366,
    "releaseDate": "2020-10-17",
    "publisher":{"id":1}
}'
```

to be able to insert a game you first need to insert a publisher directly into the database with the following code
```sql
insert into publisher (name, siret, phone) values ('publisher1',12, '+555111222');
```