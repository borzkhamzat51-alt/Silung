const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Silung Coffee MEVN Application...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Create .env file for backend if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/silung_coffee
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
NODE_ENV=development`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created backend/.env file');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  
  console.log('Installing frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  
  console.log('\n✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Seed the database: cd backend && node scripts/seedMenu.js');
console.log('3. Start the application: npm run dev');
console.log('\n🌐 The application will be available at:');
console.log('   Frontend: http://localhost:8080');
console.log('   Backend API: http://localhost:5000');
console.log('\n☕ Enjoy your modern Silung Coffee application!');
