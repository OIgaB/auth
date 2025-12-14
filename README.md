# 🌟 Microservice (backend) for Authorization & Authentication

This is a [Node.js](https://nodejs.org/) project that uses a non-relational database, [MongoDB](https://www.mongodb.com/), together with [Mongoose](https://mongoosejs.com/) for data modeling.

### Signup process includes:
- checking for an empty body;
- validating the request body against the Joi schema (user input);
- checking if email is unique;
- hashing the password with `bcrypt.hash` before saving;
- validating against Mongoose schema (database constraints);
- creating a new user record in MongoDB;
- sending frontend user's data;
- handling validation, database, and server errors with structured responses.

### Signin process includes:
- checking for an empty body;
- validating the request body against the Joi schema (user input);
- finding the user by email in the database;
- verifying the entered password using `bcrypt.compare`;
- generating a JWT access token with `jwt.sign` and 15 minutes expiration time;
- generating a JWT refresh token with `jwt.sign` and 7 days expiration time;
- saving JWT refresh token in an httpOnly response cookie;
- validating against Mongoose schema (database constraints);
- updating the user record in MongoDB with new JWT refresh token;
- sending frontend JWT access token and user data;
- handling validation, database, and server errors with structured responses.

### Refresh token process includes:
- extracting the JWT refresh token from the request's cookies;
- verifying the JWT signature and expiration with `jwt.verify`;
- extracting the user identifier from the token payload;
- finding the user in the database by identifier;
- validating that the provided refresh token matches the one stored in the database;
- generating a new JWT access token with `jwt.sign` and 15 minutes expiration time;
- sending frontend a new JWT access token;
- handling authentication and server errors with structured responses.

### Signout process includes:
- extracting the JWT access token from the Authorization header;
- verifying the JWT signature and expiration with `jwt.verify`;
- extracting the user identifier from the token payload;
- finding the user in the database by identifier;
- clearing the stored JWT refresh token in MongoDB to invalidate the session;
- handling authentication and server errors with structured responses.

### Getting current user process includes:
- extracting the JWT access token from the Authorization header;
- verifying the JWT signature and expiration with `jwt.verify`;
- extracting the user identifier from the token payload;
- finding the user in the database by identifier;
- sending frontend user data;
- handling authentication and server errors with structured responses.

### Removing current user process includes:
- extracting the JWT access token from the Authorization header;
- verifying the JWT signature and expiration with `jwt.verify`;
- extracting the user identifier from the token payload;
- invalidating the user's session by removing the user record from the DB;
- handling authentication and server errors with structured responses.

---

## Getting Started

### 📦 Install dependencies

```bash
npm i
```

### 🔧 Create and update `.env` file

```bash
cp env.default .env
```

---

### 🧩 Start backend

Run in development mode:
```bash
npm run start:dev
```

Run in production mode:
```bash
npm start
```

---

### 🧪 Test with Postman

BASE_API: 
```bash
http://localhost:3001/api/auth
```
<table><tr><td>signup:</td></tr></table>  

$\color{LimeGreen}{🟢 POST-request}$

```bash
{{BASE_API}}/signup
```
Body (raw, JSON):
```bash 
{
  "email": "example@mail.com",
  "password": "example_password"
}
```

<table><tr><td>signin:</td></tr></table>  

$\color{LimeGreen}{🟢 POST-request}$

```bash
{{BASE_API}}/signin
```
Body (raw, JSON):
```bash 
{
  "email": "example@mail.com",
  "password": "example_password"
}
```

<table><tr><td>refresh:</td></tr></table>  

$\color{LimeGreen}{🟢 POST-request}$

```bash
{{BASE_API}}/refresh
```

<table><tr><td>signout:</td></tr></table>

$\color{LimeGreen}{🟢 POST-request}$

Bearer Token is required

```bash
{{BASE_API}}/signout
```

After successful signout, the JWT refresh token becomes invalid even if it has not yet expired.

<table><tr><td>current user:</td></tr></table>

$\color{Cyan}{🔵 GET-request}$
$\color{BrickRed}{🔴 DELETE-request}$

Bearer Token is required

```bash
{{BASE_API}}/current
```

---

## ⚙️ Requirements

- Node.js >= 20.0.0  
- Package manager: npm 

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
