const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
require('dotenv').config();

const menuItems = [
  // Signatures
  { name: 'Silung Coffee', category: 'Signatures', price: 130, description: 'Iced americano with sweetened breve' },
  { name: 'Spanish Latte', category: 'Signatures', price: 130, description: 'Espresso, condensed milk' },
  { name: 'Seasalt Latte', category: 'Signatures', price: 130, description: 'Espresso, milk, sea salt foam' },
  { name: 'Salted Caramel', category: 'Signatures', price: 130, description: 'Espresso, milk, caramel, foam' },
  { name: 'Roasted Almond', category: 'Signatures', price: 130, description: 'Espresso, milk, almond syrup, foam' },
  { name: 'Biscoff Latte', category: 'Signatures', price: 140, description: 'Espresso, milk, biscoff spread, foam' },
  { name: 'Toasted Mallows', category: 'Signatures', price: 140, description: 'Espresso, milk, mallow syrup, foam' },
  { name: 'Dark Choco Oats', category: 'Signatures', price: 160, description: 'Dark chocolate, oat milk, oats' },

  // Classics
  { name: 'Mocha', category: 'Classics', price: 130, description: 'Espresso, milk, dark chocolate' },
  { name: 'White Mocha', category: 'Classics', price: 130, description: 'Espresso, milk, white chocolate' },
  { name: 'Cappuccino', category: 'Classics', price: 120, description: 'Espresso, milk, foam' },
  { name: 'Cafe Latte', category: 'Classics', price: 120, description: 'Espresso, milk, foam' },
  { name: 'Americano', category: 'Classics', price: 120, description: 'Espresso, water' },

  // Non-Espresso
  { name: 'Matcha', category: 'Non-Espresso', price: 130, description: 'Matcha, milk' },
  { name: 'Strawberry Latte', category: 'Non-Espresso', price: 130, description: 'Strawberry, milk' },
  { name: 'Horchata', category: 'Non-Espresso', price: 130, description: 'Horchata, milk, cinnamon topping' },
  { name: 'Dark Chocolate', category: 'Non-Espresso', price: 130, description: 'Dark chocolate, milk' },

  // Refreshers
  { name: 'Peach Berry Fizz', category: 'Refreshers', price: 130, description: 'Strawberry, peach, carbonated water' },
  { name: 'Kiwi Passion', category: 'Refreshers', price: 130, description: 'Kiwi, passion fruit, carbonated water' },
  { name: 'Purple Lemonade', category: 'Refreshers', price: 130, description: 'Lemon, butterfly pea tea, carbonated water' },

  // Croissants
  { name: 'Butter Croissant', category: 'Croissants', price: 130 },
  { name: 'Pain au Chocolat', category: 'Croissants', price: 140 },
  { name: 'Almond Croissant', category: 'Croissants', price: 165 },
  { name: 'Matcha Croissant', category: 'Croissants', price: 180 },
  { name: 'Golden Crunch', category: 'Croissants', price: 175 },
  { name: 'Cookie Croissant', category: 'Croissants', price: 180 },
  { name: 'Ham & Cheese Croissant', category: 'Croissants', price: 150 },

  // Danish
  { name: 'Cinnamon Danish', category: 'Danish', price: 130 },

  // Flat Breads
  { name: 'Four Cheese', category: 'Flat Breads', price: 135 },
  { name: 'Meat Lover\'s', category: 'Flat Breads', price: 135 },

  // New York Rolls
  { name: 'NYR Red Velvet', category: 'New York Rolls', price: 160 },
  { name: 'NYR Cookies & Cream', category: 'New York Rolls', price: 160 },
  { name: 'NYR Choco Almond', category: 'New York Rolls', price: 160 },

  // Add-ons
  { name: 'Espresso Shot', category: 'Add-ons', price: 30 },
  { name: 'Cold Foam', category: 'Add-ons', price: 30 },
  { name: 'Seasalt Foam', category: 'Add-ons', price: 30 },
  { name: 'Flavor Syrup', category: 'Add-ons', price: 30 },
  { name: 'Oat Milk', category: 'Add-ons', price: 60 }
];

const seedMenu = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/silung_coffee');
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log(`Inserted ${menuItems.length} menu items`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};

seedMenu();
