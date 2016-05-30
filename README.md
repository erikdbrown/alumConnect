# alumConnect

A React CMS. Currently manages authentication, user profiles, and an admin dashboard with configurable options.

## Contributors:
* [Matthew W. Bresnan](https://github.com/mbresnan1701)
* [Alamu Palaniappan](https://github.com/alamuv)
* [Mike Jonas](https://github.com/mikejonas)
* [Drake Wang](https://github.com/yochess/)

## Getting Started

Once this repo is cloned,

1. Install [MySQL](https://dev.mysql.com/downloads/installer/)
2. Install [Node and NPM](https://nodejs.org/en/)
3. Install [Sharp](http://sharp.dimens.io/en/stable/install/#mac-os)
4. Install webpack and redis globally

    ```
    $ npm install -g webpack
    $ npm install -g redis
    ```

5. Install dependencies

    ```
    $ npm install
    ```

6. Start necessary servers
    ```
    $ mysql.server start
    $ redis-server
    ```

7. Import alumConnect schema to mySQL database
    ```
    $ mysql -u root < server/schema.sql
    ```

8. Enter initial admin permissions on line 98 of schema.sql. You will need your githubID and Handle:
```sh
curl https://api.github.com/users/*YOUR HANDLE HERE*
```


9. Obtain github OAuth credentials (see wiki)

10. Replace githubAPIConfig.example.js in /server/config/ to githubAPIConfig.js. Fill up the keys as follows:
    ```
    exports.sessionSecret = 'SOME LONG STRING';
    exports.githubClientId = 'GITHUB CLIENT ID HERE';
    exports.githubClientSecret = 'GITHUB CLIENT SECRET HERE';
    exports.githubCallbackUrl = 'http://127.0.0.1:3000/auth/callback';

    ```

11. Insert data to alumConnect table
    ```
    $ node server/new_insertData.js
    ```

12. Launch the server
    ```
    $ npm start
    ```

## Database Schema

<img src="schema.png" alt="database shema" />

## Api Endpoints

### Authorization

| Endpoint            | Action | Returns                             | Side Effect                                | Parameters/Req Body                  |
|---------------------|--------|-------------------------------------|--------------------------------------------|--------------------------------------|
|/auth                | GET    | ?                                   | ?                                          | ?                                    |
|/auth/logout         | GET    | ?                                   | ?                                          | ?                                    |
|/auth/sessionreload  | GET    | ?                                   | ?                                          | ?                                    |
|/auth/refreshcookies | GET    | ?                                   | ?                                          | ?                                    |
|/auth/error          | GET    | ?                                   | ?                                          | ?                                    |
|/auth/callback       | GET    | ?                                   | ?                                          | ?                                    |
|/auth/islogged       | GET    | ?                                   | ?                                          | ?                                    |
|/auth/isadmin        | GET    | ?                                   | ?                                          | ?                                    |

### Groups

| Endpoint            | Action | Returns                                    | Side Effect                            | Parameters/Req Body                          |
|---------------------|--------|--------------------------------------------|----------------------------------------|----------------------------------------------|
|/db/groups           | GET    | All groups and their visible groups        | -                                      | -                                            |
|/db/groups           | POST   | Newly created group and its visible groups | -                                      | group_name: new group name                   |
|                     |        |                                            |                                        | visibleGroups: array of visible groups by id |
|/db/groups/group/:id | GET    | A group and its visible groups             | -                                      | id: group id                                 |
|/db/groups/group/:id | POST   | Modified group and its visible groups      | -                                      | id: group id                                 |
|                     |        |                                            |                                        | group_name: modifed group name               |
|                     |        |                                            |                                        | visibleGroups: array of visible groups by id |
|/db/groups/group/:id | DELETE | -                                          | Deletes all associated relational data | id: group id                                 |

### Users

| Endpoint                 | Action | Returns                           | Side Effect                                   | Parameters/Req Body                  |
|--------------------------|--------|-----------------------------------|-----------------------------------------------|--------------------------------------|
|/db/users                 | GET    | Userinfo and groups               | -                                             | -                                    |
|/db/users                 | POST   | -                                 | -                                             | handle: user handle                  |
|                          |        |                                   |                                               | githubid: user github account        |
|                          |        |                                   |                                               | name: user full name                 |
|                          |        |                                   |                                               | email: user email address            |
|                          |        |                                   |                                               | image: user image url                |
|                          |        |                                   |                                               | public: user visibility (0 or 1)     |
|                          |        |                                   |                                               | permission: admin privilege (o or 1) |
|/db/users/user/:id        | GET    | User info, sites, bio, and groups | -                                             | id: user id                          |
|/db/users/user/:id        | POST   | -                                 | -                                             | id: user id                          |
|                          |        |                                   |                                               | handle: user handle                  |
|                          |        |                                   |                                               | githubid: user github account        |
|                          |        |                                   |                                               | name: user full name                 |
|                          |        |                                   |                                               | email: user email address            |
|                          |        |                                   |                                               | url: user url link                   |
|                          |        |                                   |                                               | public: user visibility              |
|                          |        |                                   |                                               | permission: user admin privilege     |
|/db/users/user/:id        | DELETE | -                                 | Deletes all associated relational data        | id: user id                          |
|/db/users/name            | GET    | ?                                 | ?                                             | ?                                    |
|/db/users/user/visibility | POST   | ?                                 | ?                                             | ?                                    |
|/user/uploadimage         | POST   | ?                                 | ?                                             | ?                                    |

### Sites

| Endpoint          | Action | Returns                                      | Side Effect                             | Parameters/Req Body                    |
|-------------------|--------|----------------------------------------------|-----------------------------------------|----------------------------------------|
|/db/sites          | GET    | All sites a user can have                    | -                                       | -                                      |
|/db/sites          | POST   | Newly created site                           | -                                       | site_name: site name                   |
|                   |        |                                              |                                         | base_url: site url                     |
|                   |        |                                              |                                         | hospitalId: Id of appointment hospital |
|/db/sites/site/:id | POST   | Modified site                                |                                         | site_name: site name                   |
|                   |        |                                              |                                         | base_url: site url                     |
|                   |        |                                              |                                         | active: 0 or 1                         |
|/db/sites/site/:id | DELETE | -                                            | Deletes all associated relational data  | id: site id                            |

### Fields

| Endpoint            | Action | Returns                                      | Side Effect                             | Parameters/Req Body                    |
|---------------------|--------|----------------------------------------------|-----------------------------------------|----------------------------------------|
|/db/fields           | GET    | All bio field titles                         | -                                       | -                                      |
|/db/fields           | POST   | Newly created bio field title                | -                                       | title: bio field title                 |
|/db/fields/field/:id | POST   | Modified bio field title                     | -                                       | title: bio field title                 |
|/db/fields/field/:id | DELETE | -                                            | Deletes all associated relational data  | id: bio field title id                 |

## License:

MIT
