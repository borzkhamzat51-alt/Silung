const fs = require('fs');
const path = require('path');

const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/silung_coffee
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password`;

const envPath = path.join(__dirname, 'backend', '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created backend/.env file');
  console.log('📝 You can edit this file to add your email configuration');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
