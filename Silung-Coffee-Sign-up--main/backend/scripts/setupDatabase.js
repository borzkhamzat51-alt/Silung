const mongoose = require('mongoose');
require('dotenv').config();

// Import models to create collections
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Contact = require('../models/Contact');
const Order = require('../models/Order');

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/silung_coffee');
    console.log('Connected to MongoDB');

    // Create collections by creating sample documents
    console.log('Creating collections...');
    
    // Create User collection
    try {
      const sampleUser = new User({
        firstName: 'Sample',
        lastName: 'User',
        gender: 'Other',
        address: 'Sample Address',
        contactNumber: '09123456789',
        email: 'sample@example.com',
        dateOfBirth: new Date('1990-01-01'),
        username: 'sampleuser',
        password: 'password123'
      });
      await sampleUser.save();
      console.log('✅ User collection created');
      await User.deleteOne({ email: 'sample@example.com' }); // Remove sample
    } catch (error) {
      console.log('✅ User collection already exists');
    }

    // Create MenuItem collection
    try {
      const sampleMenuItem = new MenuItem({
        name: 'Sample Coffee',
        category: 'Signatures',
        price: 100,
        description: 'Sample description'
      });
      await sampleMenuItem.save();
      console.log('✅ MenuItem collection created');
      await MenuItem.deleteOne({ name: 'Sample Coffee' }); // Remove sample
    } catch (error) {
      console.log('✅ MenuItem collection already exists');
    }

    // Create Contact collection
    try {
      const sampleContact = new Contact({
        name: 'Sample Contact',
        email: 'sample@example.com',
        message: 'Sample message'
      });
      await sampleContact.save();
      console.log('✅ Contact collection created');
      await Contact.deleteOne({ email: 'sample@example.com' }); // Remove sample
    } catch (error) {
      console.log('✅ Contact collection already exists');
    }

    // Create Order collection
    try {
      const sampleOrder = new Order({
        user: new mongoose.Types.ObjectId(),
        items: [{
          menuItemId: new mongoose.Types.ObjectId(),
          name: 'Sample Item',
          price: 100,
          quantity: 1
        }],
        totalAmount: 100,
        customerInfo: {
          name: 'Sample Customer',
          email: 'sample@example.com',
          phone: '09123456789'
        }
      });
      await sampleOrder.save();
      console.log('✅ Order collection created');
      await Order.deleteOne({ 'customerInfo.email': 'sample@example.com' }); // Remove sample
    } catch (error) {
      console.log('✅ Order collection already exists');
    }

    console.log('\n🎉 Database setup complete!');
    console.log('Collections created:');
    console.log('- users');
    console.log('- menuitems');
    console.log('- contacts');
    console.log('- orders');
    
    process.exit(0);
  } catch (error) {
    console.error('Database setup error:', error);
    process.exit(1);
  }
};

setupDatabase();
