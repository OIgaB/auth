# 🌟 Microservice (backend) for Authorization & Authentication

This is a [Node.js](https://nodejs.org/) project that uses a non-relational database, [MongoDB](https://www.mongodb.com/), together with [Mongoose](https://mongoosejs.com/) for data modeling.

### Signup process includes:
- checking for an empty body;
- validation against Joi schema (user input);
- checking if email is unique;
- hashing the password with `bcrypt` before saving;
- validating against Mongoose schema (database constraints);
- creating a new user record in MongoDB;
- handling validation, database, and server errors with structured responses.

### Signup process includes:
To be continued ...

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

### 🧩 Start backend

Run in development mode:
```bash
npm run start:dev
```

Run in production mode:
```bash
npm start
```

### 🧪 Test with Postman

BASE_API: 
```bash
http://localhost:3001/api/auth
```

1) signup: 
POST-request 
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

2) to be continued ...

---

## ⚙️ Requirements

- *Node.js*>= 20.0.0  
- *Package manager:*npm 

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
