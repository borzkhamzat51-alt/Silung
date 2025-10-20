const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ message: 'Server error while fetching menu' });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await MenuItem.find({ 
      category: category,
      isAvailable: true 
    }).sort({ name: 1 });
    
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu by category error:', error);
    res.status(500).json({ message: 'Server error while fetching menu category' });
  }
});

// Add new menu item (admin only - you can add authentication middleware later)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    const menuItem = new MenuItem({
      name,
      category,
      price,
      description
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Add menu item error:', error);
    res.status(500).json({ message: 'Server error while adding menu item' });
  }
});

module.exports = router;
