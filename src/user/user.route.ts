//1. Create /university endpoints with GET, PUT and DELETE methods
//2. Each user must have an University as part of their JSON structure
//3. ADD PATCH request in User to update the university (universityId: 3) in body.
//4. Add an array to User called subjects containing string elements. Add PATCH request
//      for updating the subjects array

import { AxiosResponse } from 'axios';
import { Router } from 'express';
import universities from '../university/university';
const axios = require('axios');

const userRouter = Router();

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', universityId: 1, subjects: ['Math', 'Psychology'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', universityId: 2, subjects: ['Science', 'Philosophy'] },
];

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    universityId: req.body.universityId,
    subjects: req.body.subjects
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      universityId: req.body.universityId,
      subjects: req.body.subjects
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  }

  if (req.body.universityId) {
    // Use .then() and .catch() to handle the Axios promise, with type definition for universityResponse
    if(universities.indexOf(req.body.universityId)) {
      users[userIndex].universityId = req.body.universityId;
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ message: 'University not found' });
    }
  } else if (req.body.subjects) {
    users[userIndex].subjects = req.body.subjects;
    res.json(users[userIndex]);
  } else {
    // If no universityId or subjects are provided, respond with the current user data
    res.json(users[userIndex]);
  }
});

userRouter.patch('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].subjects = req.body.subjects;
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default userRouter;
