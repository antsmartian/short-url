#### UrlShortner

Simple API, which just does one thing. Stores the given url and gives it back 
when we give the hash/shortUrl. (Data will stored in the postgres database).

#### Run

Simply run:

```
docker-compose up
```

and the API will be up and running on (we can change the port `.env` if needed):

```
localhost:8080/api/v1/shortener/
```

where 
GET - `/id` - gives back the url info associated with the id
POST - `/`  - Takes the json `{ "url" : "value" }` and gives back the shorten url
GET - `http://localhost:8080/<hash>` - Redirects the user to the actual URL

Once we have the short url, we can hit the same on our browser to see the redirect in 
action

#### Test cases
I ran integration test cases using `jest`. The test cases are in the folder `intergration-test`

Navigate and run 
```
    npm run test
```       

to run our little suite!