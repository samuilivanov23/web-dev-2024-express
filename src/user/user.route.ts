import express, { Request, Response } from 'express';
import { db } from '../database';
import { Subject } from '../subjects/subject';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjectIds } = req.body;
    const university = await db.models.University.findByPk(universityId);

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    const subjects = []
    for(let id of subjectIds){
      const subject = await db.models.Subject.findByPk(id);

      if (!subject) {
        res.status(404).json({ error: 'Subject not found' });
        return;
      }

      subjects.push(subject);
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }
    
    const user = await db.models.User.create({ name, email, universityId });
    user.addSubjects(subjects);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: [
        {
          model: db.models.University,
          as: 'university',
        },
        {
          model: db.models.Subject,
          through: { attributes: [] }
        }
      ],
    });

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const { id, subjectIds } = req.body;
    const user = await db.models.User.findByPk( +id );

    if (user == null) {
      throw new Error("No user.");
    }

    if (subjectIds && Array.isArray(subjectIds)) {
      const subjects = await db.models.Subject.findAll({
        where: { id: subjectIds },
      });

      if (subjects.length !== subjectIds.length) {
        throw new Error("Some subjects were not found!");
      }
  
      await user.setSubjects(subjects);
    }
    else{
      await user.setSubjects([]);
    }

    const updatedUser = await user.reload({
      include: [{ model: db.models.Subject }],
    });
  
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
