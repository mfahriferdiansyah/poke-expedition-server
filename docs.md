# PokemonExpedition API Documentation

## Endpoints :

List of available endpoints:

- `GET /pub/explorations`
- `POST /pub/explorations`
- `DELETE /pub/explorations/:id`
- `POST /pub/midtrans-get-token`
- `GET /pub/pokemons`
- `POST /pub/pokemons`
- `GET /pub/regions`
- `GET /pub/user`
- `PATCH /pub/user`

&nbsp;

## GET /pub/explorations

Description:
- Get all data of User including, UserPokemons and Explorations

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>"
}
```

_Response (200 - OK)_
```json
{
    "id": 22,
    "username": "admin",
    "email": "admin@test.com",
    "balance": 0,
    "createdAt": "2023-03-08T22:31:24.831Z",
    "updatedAt": "2023-03-08T22:31:24.831Z",
    "UserPokemons": [
        {
            "id": 43,
            "name": "kabutops",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/141.svg",
            "type": "rock",
            "hp": 60,
            "atk": 115,
            "exp": 0,
            "level": 0,
            "UserId": 22,
            "createdAt": "2023-03-08T22:33:24.817Z",
            "updatedAt": "2023-03-08T22:33:24.817Z"
        }
    ],
    "Explorations": [
        {
            "id": 136,
            "isBattle": false,
            "rewardCoin": 40121,
            "time": 20000,
            "UserId": 22,
            "UserPokemonId": 43,
            "EnemyPokemonId": 50,
            "createdAt": "2023-03-08T22:39:59.120Z",
            "updatedAt": "2023-03-08T22:39:59.120Z",
            "RegionId": 2,
            "EnemyPokemon": {
                "id": 50,
                "name": "raikou",
                "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/243.svg",
                "type": "electric",
                "hp": 90,
                "atk": 85,
                "createdAt": "2023-03-08T05:19:38.058Z",
                "updatedAt": "2023-03-08T05:19:38.058Z"
            }
        }
    ]
}
```


&nbsp;

## POST /pub/explorations

Description:
- Send pokemon to expedition/exploration

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>"
}
```
- body
```json
{
    "UserPokemonId": "<integer>",
    "RegionId": "<integer>"
}
```
_Response (201 - Created)_
```json
{
    "message": "Successfully sent pokemon to expedition!",
    "newExploration": {
        "id": 139,
        "isBattle": true,
        "time": 3487069,
        "rewardCoin": 34592,
        "UserId": 24,
        "RegionId": 1,
        "UserPokemonId": 44,
        "EnemyPokemonId": 112,
        "updatedAt": "2023-03-08T23:03:41.265Z",
        "createdAt": "2023-03-08T23:03:41.265Z"
    },
    "enemy": {
        "id": 112,
        "name": "mankey",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/56.svg",
        "type": "fighting",
        "hp": 40,
        "atk": 80,
        "updatedAt": "2023-03-08T23:03:41.257Z",
        "createdAt": "2023-03-08T23:03:41.257Z"
    }
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Pokemon still in expedition"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "You don't have access to this action"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```

&nbsp;

## DELETE /pub/explorations/:id

Description:
- Claim/ended pokemon expedition

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id:UserId": "<integer>"
}
```
- params
```json
{
    "id": "<integer>"
}
```
_Response (200 - OK)_
```json
{
    "message": "Expedition ended",
    "reward": 0
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "You don't have access to this action"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```

&nbsp;

## POST /pub/midtrans-get-token
Description:
- Get midtrans token

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "email": "<string>"
}
```

_Response (201 - Created)_
```json
{
    "token": "d6cf1916-9312-480a-abb1-d45f38fc6df0",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d6cf1916-9312-480a-abb1-d45f38fc6df0"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "<midtranserrormessage"
}
```

&nbsp;

## GET /pub/pokemons
Description:
- Get pokemon data both in expedition and not in expedition

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>"
}
```
_Response (200 - OK)_
```json
{
    "pokemonInExpedition": [
        {
            "id": 140,
            "isBattle": true,
            "rewardCoin": 11557,
            "time": 3206376,
            "UserId": 24,
            "UserPokemonId": 44,
            "EnemyPokemonId": 81,
            "createdAt": "2023-03-08T23:07:15.506Z",
            "updatedAt": "2023-03-08T23:07:15.506Z",
            "RegionId": 1,
            "UserPokemon": {
                "id": 44,
                "name": "pidgey",
                "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg",
                "type": "normal",
                "hp": 40,
                "atk": 45,
                "exp": 0,
                "level": 0,
                "UserId": 24,
                "createdAt": "2023-03-08T23:03:31.106Z",
                "updatedAt": "2023-03-08T23:03:31.106Z"
            }
        }
    ],
    "pokemonNotInExpedition": []
}
```

&nbsp;

## POST /pub/pokemons
Description:
- Gacha pokemon

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>"
}
```
- body
```json
{
    "bannerId":"<integer>"
}
```
_Response (201 - Created)_
```json
{
    "message": "Sweet, you got new pokemon",
    "userPokemon": {
        "id": 45,
        "name": "hoothoot",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/163.svg",
        "type": "normal",
        "hp": 60,
        "atk": 30,
        "exp": 0,
        "level": 0,
        "UserId": 24,
        "updatedAt": "2023-03-08T23:22:22.168Z",
        "createdAt": "2023-03-08T23:22:22.168Z"
    }
}
```
&nbsp;

## GET /pub/regions
Description:
- Get all region list

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "name": "Johto",
        "time": 3600000,
        "coin": 100000,
        "level": 5,
        "chance": 30,
        "createdAt": "2023-03-08T03:54:15.894Z",
        "updatedAt": "2023-03-08T03:54:15.894Z"
    },
    {
        "id": 2,
        "name": "Kanto",
        "time": 20000,
        "coin": 50000,
        "level": 2,
        "chance": 70,
        "createdAt": "2023-03-08T03:54:15.894Z",
        "updatedAt": "2023-03-08T03:54:15.894Z"
    }
]
```

## GET /pub/user
Description:
- Get general data about user

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>",
    "email": "<string>",
    "balance": "<integer>"
}
```
_Response (200 - OK)_
```json
{
    "id": 1,
    "email": "test@pkmns.coms",
    "balance": 0
}
```

## PATCH /pub/user
Description:
- Check and change balance according to price

Request:
- headers
```json
{
  "access_token": "<jsonwebtoken>"
}
```
- user
```json
{
    "id": "<integer>",
    "balance": "<integer>"
}
```
- body
```json
{
    "price": "<integer>"
}
```
_Response (204 - No Content)_
```json
```

_Response (400 - Bad request)_
```json
{
    "message": "Balance not enough"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthenticated)_

```json
{
  "message": "Wrong login credential"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```