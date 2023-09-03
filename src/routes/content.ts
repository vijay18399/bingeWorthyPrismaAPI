import { Router, Request, Response } from "express";
import prisma from "../db/prisma";
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();


router.get('/contents',asyncHandler(async (req: Request, res: Response) => {
    const contents = await prisma.content.findMany();
    res.json(contents);
  })
);

// GET /contents/:id - Retrieve a specific content item by ID
router.get(
  '/contents/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const contentId = req.params.id;
    const content = await prisma.content.findUnique({
      where: { id: contentId },
    });
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  })
);

// POST /contents - Create a new content item
router.post(
  '/contents',
  asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      plot,
      poster,
      tags,
      release_date,
      genres,
      content_type,
      user_id,
    } = req.body;

    try {
      const createdContent = await prisma.content.create({
        data: {
          title,
          plot,
          poster,
          tags,
          release_date,
          genres,
          content_type,
          user_id,
        },
      });

      res.status(201).json(createdContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create content' });
    }
  })
);

// PUT /contents/:id - Update a specific content item by ID
router.put(
  '/contents/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const contentId = req.params.id;
    const {
      title,
      plot,
      poster,
      tags,
      release_date,
      genres,
      content_type,
      user_id,
    } = req.body;

    try {
      const updatedContent = await prisma.content.update({
        where: { id: contentId },
        data: {
          title,
          plot,
          poster,
          tags,
          release_date,
          genres,
          content_type,
          user_id,
        },
      });

      res.json(updatedContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update content' });
    }
  })
);

// DELETE /contents/:id - Delete a specific content item by ID
router.delete(
  '/contents/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const contentId = req.params.id;

    try {
      await prisma.content.delete({
        where: { id: contentId },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete content' });
    }
  })
);

export default router;

