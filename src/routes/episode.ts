import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../db/prisma';

const router = Router();

// GET /episodes - Retrieve all episodes
router.get(
  '/episodes',
  asyncHandler(async (req: Request, res: Response) => {
    const episodes = await prisma.episode.findMany();
    res.json(episodes);
  })
);

// GET /episodes/:id - Retrieve a specific episode by ID
router.get(
  '/episodes/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    const episode = await prisma.episode.findUnique({
      where: { id: episodeId },
    });
    if (episode) {
      res.json(episode);
    } else {
      res.status(404).json({ message: 'Episode not found' });
    }
  })
);

// POST /episodes - Create a new episode
router.post(
  '/episodes',
  asyncHandler(async (req: Request, res: Response) => {
    const { number, description, poster, air_date, season_id } = req.body;

    try {
      const createdEpisode = await prisma.episode.create({
        data: {
          number,
          description,
          poster,
          air_date,
          season_id,
        },
      });

      res.status(201).json(createdEpisode);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create episode' });
    }
  })
);

// PUT /episodes/:id - Update a specific episode by ID
router.put(
  '/episodes/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    const { number, description, poster, air_date, season_id } = req.body;

    try {
      const updatedEpisode = await prisma.episode.update({
        where: { id: episodeId },
        data: {
          number,
          description,
          poster,
          air_date,
          season_id,
        },
      });

      res.json(updatedEpisode);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update episode' });
    }
  })
);

// DELETE /episodes/:id - Delete a specific episode by ID
router.delete(
  '/episodes/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const episodeId = req.params.id;

    try {
      await prisma.episode.delete({
        where: { id: episodeId },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete episode' });
    }
  })
);

export default router;
