import { Router } from 'express';
import universities from './university';

const universityRouter = Router();

universityRouter.get('/', (req, res) => {
  res.json(universities);
});

universityRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = universities.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

universityRouter.post('/', (req, res) => {
  const newUniversity = {
    id: universities.length + 1,
    name: req.body.name,
    city: req.body.city,
  };
  universities.push(newUniversity);
  res.status(201).json(newUniversity);
});

// PUT to update an existing user
universityRouter.put('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((u) => u.id === universityId);
  if (universityIndex !== -1) {
    universities[universityIndex] = {
      id: universityId,
      name: req.body.name,
      city: req.body.city,
    };
    res.json(universities[universityIndex]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

// DELETE a user by ID
universityRouter.delete('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((u) => u.id === universityId);
  if (universityIndex !== -1) {
    const deletedUniversity = universities.splice(universityIndex, 1);
    res.json(deletedUniversity[0]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

export default universityRouter;