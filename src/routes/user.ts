import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db/prisma';

const router = Router();

// GET /users - Retrieve all users
router.get(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
);

// GET /users/:id - Retrieve a specific user by ID
router.get(
  '/users/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

// POST /users - Create a new user
router.post(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, username, password, email, profile } = req.body;

    try {
      const createdUser = await prisma.user.create({
        data: {
          name,
          username,
          password,
          email,
          profile,
        },
      });

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  })
);

// PUT /users/:id - Update a specific user by ID
router.put(
  '/users/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, username, password, email, profile } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          username,
          password,
          email,
          profile,
        },
      });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  })
);

// DELETE /users/:id - Delete a specific user by ID
router.delete(
  '/users/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  })
);

export default router;
