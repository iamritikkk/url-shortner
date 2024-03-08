# url shor.ner
> a simple url shortner api built in nodejs

## usages
### create shortner
```http
POST /link
```
payload:
```json
{
  "url": "https://github.com/test"
}
```

response:
```json
{
   "type" : "success"
   "message": "https://api.example.com/test"
}
```

## deployment

1. clone the project
```sh
git clone https://github.com/iamritikkk/url-shortner.git -b main && cd url-shortner
```

2. up the docker compose
```sh
docker compose up -d
```
