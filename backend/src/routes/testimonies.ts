import express from 'express';
import { auth } from '../middleware/auth';
import { Testimony } from '../models/Testimony';

const router = express.Router();

// Get all testimonies for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const testimonies = await Testimony.find({ userId: req.user.userId });
    res.json(testimonies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonies' });
  }
});

// Create a new testimony
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const testimony = new Testimony({
      title,
      content,
      category,
      tags,
      userId: req.user.userId,
    });
    await testimony.save();
    res.status(201).json(testimony);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create testimony' });
  }
});

// Update a testimony
router.patch('/:id', auth, async (req, res) => {
  try {
    const testimony = await Testimony.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!testimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    Object.assign(testimony, req.body);
    await testimony.save();
    
    res.json(testimony);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update testimony' });
  }
});

// Delete a testimony
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimony = await Testimony.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!testimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    res.json({ message: 'Testimony deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimony' });
  }
});

export default router; 