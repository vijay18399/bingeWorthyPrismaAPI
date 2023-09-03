import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db/prisma';

const router = Router();

// GET /seasons - Retrieve all seasons
router.get(
  '/seasons',
  asyncHandler(async (req: Request, res: Response) => {
    const seasons = await prisma.season.findMany();
    res.json(seasons);
  })
);

// GET /seasons/:id - Retrieve a specific season by ID
router.get(
  '/seasons/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    const season = await prisma.season.findUnique({
      where: { id: seasonId },
    });
    if (season) {
      res.json(season);
    } else {
      res.status(404).json({ message: 'Season not found' });
    }
  })
);

// POST /seasons - Create a new season
router.post(
  '/seasons',
  asyncHandler(async (req: Request, res: Response) => {
    const { number, description, poster, content_id } = req.body;

    try {
      const createdSeason = await prisma.season.create({
        data: {
          number,
          description,
          poster,
          content_id,
        },
      });

      res.status(201).json(createdSeason);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create season' });
    }
  })
);

// PUT /seasons/:id - Update a specific season by ID
router.put(
  '/seasons/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    const { number, description, poster, content_id } = req.body;

    try {
      const updatedSeason = await prisma.season.update({
        where: { id: seasonId },
        data: {
          number,
          description,
          poster,
          content_id,
        },
      });

      res.json(updatedSeason);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update season' });
    }
  })
);

// DELETE /seasons/:id - Delete a specific season by ID
router.delete(
  '/seasons/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const seasonId = req.params.id;

    try {
      await prisma.season.delete({
        where: { id: seasonId },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete season' });
    }
  })
);

export default router;
