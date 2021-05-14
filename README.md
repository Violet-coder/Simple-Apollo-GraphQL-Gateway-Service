# Simple-Apollo-GraphQL-Gateway-Service

A simple Apollo GraphQL Gateway with two other microservices: users microservice and posts microservice.

## Implemented Features

- `fetchUser($userId: ID!): User!`
- `fetchPost($postId: ID!): Post!`
- `fetchAllUsers: [User!]!`
- `fetchAllPosts: [Post!]!`

User should allow to query posts connected to it as well, and vice-versa, with posts should have a field that can fetch the user connected to it.

## Set Up

- Clone the repo: `git clone git@github.com:Violet-coder/Simple-Apollo-GraphQL-Gateway-Service.git` or `git clone https://github.com/Violet-coder/Simple-Apollo-GraphQL-Gateway-Service.git`
- From the root directory `Simple-Apollo-GraphQL-Gateway-Service` and run the following

```
# install dependencies
npm install

# run the server
npm run server
```

- You should be able to open the graphQL GUI in a browser window by entering localhost:4000 in the URL bar.

## Object Fields

- User
  ```
  type User{
      id: ID!
      name: String
      posts: [Post]
  }
  ```
- Post
  ```
  type Post{
    id: ID!
    title: String
    body: String
    date: Date!
    authorId: ID!
    author: User
  }
  ```

## Queries with Expcted Results

- `fetchUser($userId: ID!): User!`

  - Query

  ```
  query {
    fetchUser(id: 5){
   	id
   	name
   	posts{
       id
       title
       body
       date
       author{
         id
         name
       }
     }
   }
  }
  ```

  - Expected Result

  ```
  {
  "data": {
   "fetchUser": {
     "name": "Albus Dumbledore",
     "posts": [
       {
         "title": "Truth",
         "body": "The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.",
         "date": "2018-12-17T17:15:00.000Z",
         "author": {
           "id": "5",
           "name": "Albus Dumbledore"
         }
       },
       {
         "title": "We",
         "body": "We are only as strong as we are united, as weak as we are divided.",
         "date": "2019-10-17T17:15:00.000Z",
         "author": {
           "id": "5",
           "name": "Albus Dumbledore"
           }
         }
       ]
     }
    }
   }
  ```

- `fetchPost($postId: ID!): Post!`
  - Query
  ```
  query {
    fetchPost(id: 3){
   	id
   	title
     body
   	date
   	author{
       id
       name
       }
     }
   }
  ```
  - Expected Result
  ```
  {
   "data": {
       "fetchPost": {
       "id": "3",
       "title": "Fear",
       "body": "Fear of a name only increases fear of the thing itself.",
       "date": "2019-10-17T17:15:00.000Z",
       "author": {
           "id": "2",
           "name": "Hermione Granger"
       }
      }
    }
   }
  ```
- `fetchAllUsers: [User!]!`

  - Query

  ```
  query {
   fetchAllUsers{
       id
       name
       posts{
       id
       title
       body
       date
       author{
           id
           name
       }
     }
   }
  }
  ```

  - Expected Result

  ```
  {
  "data": {
   "fetchAllUsers": [
     {
       "id": "1",
       "name": "Harry Potter",
       "posts": [
         {
           "id": "1",
           "title": "Quiet",
           "body": "I’ll be in my bedroom, making no noise and pretending I’m not there.",
           "date": "2018-11-17T17:15:00.000Z",
           "author": {
             "id": "1",
             "name": "Harry Potter"
           }
         }
       ]
     },
     {
       "id": "2",
       "name": "Hermione Granger",
       "posts": [
         {
           "id": "3",
           "title": "Fear",
           "body": "Fear of a name only increases fear of the thing itself.",
           "date": "2019-10-17T17:15:00.000Z",
           "author": {
             "id": "2",
             "name": "Hermione Granger"
           }
         }
       ]
     },
     {
       "id": "3",
       "name": "Ron Weasley",
       "posts": [
         {
           "id": "6",
           "title": "Library",
           "body": "When in doubt, go to the library.",
           "date": "2019-11-17T14:15:00.000Z",
           "author": {
             "id": "3",
             "name": "Ron Weasley"
           }
         }
       ]
     },
     {
       "id": "4",
       "name": "Draco Malfoy",
       "posts": [
         {
           "id": "5",
           "title": "Ballet",
           "body": "Training for the ballet, Potter?",
           "date": "2019-10-17T17:15:00.000Z",
           "author": {
             "id": "4",
             "name": "Draco Malfoy"
           }
         },
         {
           "id": "6",
           "title": "Slower",
           "body": "Honestly, if you were any slower, you’d be going backward.",
           "date": "2017-10-17T13:15:00.000Z",
           "author": {
             "id": "4",
             "name": "Draco Malfoy"
           }
         }
       ]
     },
     {
       "id": "5",
       "name": "Albus Dumbledore",
       "posts": [
         {
           "id": "2",
           "title": "Truth",
           "body": "The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.",
           "date": "2018-12-17T17:15:00.000Z",
           "author": {
             "id": "5",
             "name": "Albus Dumbledore"
           }
         },
         {
           "id": "4",
           "title": "We",
           "body": "We are only as strong as we are united, as weak as we are divided.",
           "date": "2019-10-17T17:15:00.000Z",
           "author": {
             "id": "5",
             "name": "Albus Dumbledore"
           }
         }
       ]
     }
   ]
  }
  }
  ```

- `fetchAllPosts: [Post!]!`
  - Query
  ```
  query {
    fetchAllPosts{
        id
        title
        body
        date
        author{
        id
        name
        }
    }
  }
  ```
  - Expected Result
  ```
  {
  "data": {
    "fetchAllPosts": [
      {
        "id": "1",
        "title": "Quiet",
        "body": "I’ll be in my bedroom, making no noise and pretending I’m not there.",
        "date": "2018-11-17T17:15:00.000Z",
        "author": {
          "id": "1",
          "name": "Harry Potter"
        }
      },
      {
        "id": "2",
        "title": "Truth",
        "body": "The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.",
        "date": "2018-12-17T17:15:00.000Z",
        "author": {
          "id": "5",
          "name": "Albus Dumbledore"
        }
      },
      {
        "id": "3",
        "title": "Fear",
        "body": "Fear of a name only increases fear of the thing itself.",
        "date": "2019-10-17T17:15:00.000Z",
        "author": {
          "id": "2",
          "name": "Hermione Granger"
        }
      },
      {
        "id": "4",
        "title": "We",
        "body": "We are only as strong as we are united, as weak as we are divided.",
        "date": "2019-10-17T17:15:00.000Z",
        "author": {
          "id": "5",
          "name": "Albus Dumbledore"
        }
      },
      {
        "id": "5",
        "title": "Ballet",
        "body": "Training for the ballet, Potter?",
        "date": "2019-10-17T17:15:00.000Z",
        "author": {
          "id": "4",
          "name": "Draco Malfoy"
        }
      },
      {
        "id": "6",
        "title": "Library",
        "body": "When in doubt, go to the library.",
        "date": "2019-11-17T14:15:00.000Z",
        "author": {
          "id": "3",
          "name": "Ron Weasley"
        }
      },
      {
        "id": "7",
        "title": "Slower",
        "body": "Honestly, if you were any slower, you’d be going backward.",
        "date": "2017-10-17T13:15:00.000Z",
        "author": {
          "id": "4",
          "name": "Draco Malfoy"
         }
       }
     ]
   }
  }
  ```
