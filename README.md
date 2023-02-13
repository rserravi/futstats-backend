# STATOS Ticket System API

This is the API for statos, the Soccer Statistics manager.

## How to use

- run 'git clone ...'
- run 'npm start'

Note: Make sure you have nodemon is installed in your system otherwise you can install as a dev dependencies in the project

### (*) Open **rest.http** to see examples of *team*, *player* and *club* objects and any Api call :+1

## .
## .

# API resources

### User API Resources

All the user API router follows '/v1/user/'

| #     | Routers                          | Verbs  | Progress | Is Private | Description                                      |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/user/login'                 | POST   | DONE     | No         | Verify user authentication (login, password) and return JWT        |
| 2     | '/v1/user/google-login'          | POST   | DONE     | No         | Verify user authentication (from "credential", google JWT) and return JWT        |
| 3     | '/v1/user/google-registration'   | POST   | DONE     | No         | Create user extracting data from "credential" (google JWT)        |
| 4     | '/v1/user/reset-password'        | POST   | DONE     | No         | Verify email and email pin to reset the password, (from "email") |
| 5     | '/v1/user/reset-password'        | PATCH  | DONE     | No         | Replace with new password.   /(from "email", "pin", and "password")                    |
| 6     | '/v1/user/logout'                | DELETE | DONE     | Yes        | Delete user accessJWT.  From "authorization" in headers and "_id" in body              |
| 7     | '/v1/user/'                      | PATCH  | DONE     | Yes        | Patch user by Id.                           |
| 8     | '/v1/user/'                      | GET    | DONE     | Yes        | Get user info. Gets Id from middleware                                   |
| 9     | '/v1/user/'                      | POST   | DONE     | No         | Create an user (firstname, lastname, email, password)                                    |
| 10    | '/v1/user/verify'                | PATCH  | DONE     | No         | Check verification link, from "email", "randomUrl")                                    |

### CLUB api resources

All the club API router follows '/v1/club/'

| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/club'                       | POST   | DONE     |Yes (n/i)   | Create new Club (clubname, shield, slogan, address, phones, social, emails, venues, managers)           |
| 2     | '/v1/club'                       | GET    | DONE     |Yes (n/i)   | Get club details by _id                             |
| 3     | '/v1/club'                       | DELETE | TODO     |Yes (n/i)   | Delete club  by _id                             |
| 4     | '/v1/club'                       | PATCH  | TODO     |Yes (n/i)   | Update club  by _id and club                            |
| 5     | '/v1/club/team'                  | GET    | DONE     |Yes (n/i)   | Get team from teamId                             |
| 6     | '/v1/club/team'                  | POST   | DONE     |Yes (n/i)   | Create a new team from clubId and team (*)                              |
| 7     | '/v1/club/team'                  | DELETE | DONE     |Yes (n/i)   | Delete team by _id (*)                              |
| 8     | '/v1/club/team'                  | PATCH  | TODO     |Yes (n/i)   | Patch team by _id and team (*)                              |
| 9     | '/v1/club/player'                | POST   | DONE     |Yes (n/i)   | Create new player (teamId and player (*))          |
| 10    | '/v1/club/player'                | GET    | DONE     |Yes (n/i)   | Get player from playerId (*))          |
| 11    | '/v1/club/player'                | DELETE | TODO     |Yes (n/i)   | Delete player from _id (*))          |
| 12    | '/v1/club/player'                | PATCH  | TODO     |Yes (n/i)   | Patch player from _id (*)) and player         |

(n/i) Not implemented yet. It will be checked againts JWT sent in Headers, but implementation will be at the end, because makes testing really tedious.

## Create Club 
POST http://localhost:3001/v1/club
Content-Type: application/json
~~~
{
   "clubname":"Gabirrian Warriors",
   "shield":{
      "fileName":"",
      "file":"",
      "uploadTime":"",
      "type":"link"
   },
   "slogan":"La vega al poder",
   "address":{
      "streetaddress":"calle nigeria 4",
      "city":"Las Gabias",
      "state": "Granada",
      "postalCode": "18110",
      "country": "Spain"
   },
   "phones": {
      "phoneDescription":"Home",
      "phoneNumber":"+34722303012"
   },
   "social":{
      "media": "Facebook",
      "user": "@gabiwarrs"
   },
   "emails":{
      "emailUrl":"gabwar@gmail.com",
      "emailDescription":"Home"
   },
   "venues":{
      "venueName":"Campo entrenamiento",
      "address":{
            "streetaddress":"calle nigeria 4",
         "city":"Las Gabias",
         "state": "Granada",
         "postalCode": "18110",
         "country": "Spain"
      }
   },
   "managers":{
      "managerId": "63daafbb1549f370ae5e70e2"
   }
}
~~~