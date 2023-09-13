# API Design
## Authentication
### Register
**Endpoint(URL):** `/api/v1/auth/register` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "username": <USERNAME>,
    "email": <EMAIL>,
    "password": <PASSWORD>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "user": {
      "id": <ID>,
      "username": <USERNAME>
    }
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "Please provide username, email, password!"
  }
```

### Login
**Endpoint(URL):** `/api/v1/auth/login` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "email": <EMAIL>,
    "password": <PASSWORD>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "user": {
      "id": <ID>,
      "username": <USERNAME>
    }
  }
```
<em style="color:red">Failure Response Body (Unauthorized Error)</em> \
Email Not Found:
```json
  {
    "success": "false",
    "message": "Invalid Credentials!"
  }
```
Incorrect Password:
```json
  {
    "success": "false",
    "message": "Incorrect password!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em> \
No password or email provided:
```json
  {
    "success": "false",
    "message": "Please provide valid email and password!"
  }
```

## Quizzes
### Get All Quizzes
**Endpoint(URL):** `/api/v1/quizzes \
**Request Method:** <span style="color:grey;">GET</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "quizzes": [
      {
        "id": <ID1>,
        "question": <PATHNAME>,
        "answers": [
          {
            "answer": <ANSWER1>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER2>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER3>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER4>,
            "isCorrect": <BOOLEAN>
          }
        ]
      },
      {
        "id": <ID2>,
        "question": <PATHNAME>,
        "answers": [
          {
            "answer": <ANSWER1>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER2>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER3>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER4>,
            "isCorrect": <BOOLEAN>
          }
        ]
      }
    ]
  }
```

### Create Quiz
**Endpoint(URL):** `/api/v1/quizzes` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "question": <QUESTION>,
    "answers": [
      {
        "answer": <ANSWER1>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER2>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER3>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER4>,
        "isCorrect": <BOOLEAN>
      }
    ]
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "quiz": {
      "id": <ID>,
      "question": <QUESTION>,
      "answers": [
        {
          "answer": <ANSWER1>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER2>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER3>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER4>,
          "isCorrect": <BOOLEAN>
        }
      ]
    }
  }
```
<em style="color:red">Failure Response Body</em> \
No question provided: 
```json
  {
    "success": "false",
    "message": "Please provide a question!"
  }
```
No answers provided: 
```json
  {
    "success": "false",
    "message": "Please provide all answers!"
  }
```

### Get Quizz
**Endpoint(URL):** `/api/v1/quizzes/:id` \
**Request Method:** <span style="color:grey;">GET</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "quiz": {
      "id": <ID>,
      "question": <QUESTION>,
      "answers": [
        {
          "answer": <ANSWER1>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER2>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER3>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER4>,
          "isCorrect": <BOOLEAN>
        }
      ]
    }
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "There is no quiz with ID <ID>!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "ID syntax is not correct: Provide a valid ID please!"
  }
```

### Update Quizz
**Endpoint(URL):** `/api/v1/quizzes/:id` \
**Request Method:** <span style="color:grey;">PUT</span> \
<em>Request Body</em>
```json
  {
    "question": <QUESTION>,
    "answers": [
      {
        "answer": <ANSWER1>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER2>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER3>,
        "isCorrect": <BOOLEAN>
      },
      {
        "answer": <ANSWER4>,
        "isCorrect": <BOOLEAN>
      }
    ]
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "quiz": {
      "id": <ID>,
      "question": <QUESTION>,
      "answers": [
        {
          "answer": <ANSWER1>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER2>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER3>,
          "isCorrect": <BOOLEAN>
        },
        {
          "answer": <ANSWER4>,
          "isCorrect": <BOOLEAN>
        }
      ]
    }
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "There is no quiz with ID <ID>!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "ID syntax is not correct: Provide a valid ID please!"
  }
```

### Delete Quiz
**Endpoint(URL):** `/api/v1/quizzes/:id` \
**Request Method:** <span style="color:grey;">PUT</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "message": "Quiz with ID <ID> has been deleted successfully"
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "There is no quiz with ID <ID>!"
  }
```

## Solo Game
### New Solo Game
**Endpoint(URL):** `/api/v1/solo-games/start` \
**Request Method:** <span style="color:grey;">POST</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "quizzes": [
      {
        "id": <ID1>,
        "question": <PATHNAME>,
        "answers": [
          {
            "answer": <ANSWER1>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER2>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER3>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER4>,
            "isCorrect": <BOOLEAN>
          }
        ]
      },
      {
        "id": <ID2>,
        "question": <PATHNAME>,
        "answers": [
          {
            "answer": <ANSWER1>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER2>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER3>,
            "isCorrect": <BOOLEAN>
          },
          {
            "answer": <ANSWER4>,
            "isCorrect": <BOOLEAN>
          }
        ]
      },
      ...
    ]
  }
```

## Solo Game
### End Solo Game
**Endpoint(URL):** `/api/v1/solo-games/end` \
**Request Method:** <span style="color:grey;">PUT</span> \
<em>Request Body</em>
```json
  {
    "score": <SCORE>,
    "quizzes": [
      {
        "quizId": <QUIZID>,
        "answer": <ANSWER>
      },
      {
        "quizId": <QUIZID>,
        "answer": <ANSWER>
      },
      ...
    ],
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "game": {
      score: <SCORE>,
      "quizzes": [
        {
          "quizId": <QUIZID>,
          "rightAnswer": <ANSWER>
        },
        {
          "quizId": <QUIZID>,
          "rightAnswer": <ANSWER>
        },
        ...
      ]
    }
  }
```
