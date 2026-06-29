const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// In-memory storage for users
let users = [];

// Add a test user for quick login
const initTestUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const testUser = {
    _id: crypto.randomBytes(16).toString('hex'),
    id: crypto.randomBytes(16).toString('hex'),
    name: 'Test Founder',
    email: 'test@founder.com',
    password: hashedPassword,
    role: 'Founder',
    profileImage: '',
    isVerified: true,
    googleId: null,
    githubId: null,
    otp: null,
    otpExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(testUser);
  console.log('Test user created: test@founder.com / password123');
};

// Initialize test user on start
initTestUser();

// Generate a unique ID for users
const generateId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Create a new user
const createUser = async (userData) => {
  const { name, email, password, role = 'Founder', googleId, githubId, profileImage, isVerified } = userData;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new Error('Email already exists');
  }
  
  // Hash the password only if provided
  let hashedPassword = null;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  
  // Create new user
  const newUser = {
    _id: generateId(), // Using _id to match MongoDB
    id: generateId(),
    name,
    email,
    password: hashedPassword,
    role,
    profileImage: profileImage || '',
    isVerified: isVerified || false,
    googleId: googleId || null,
    githubId: githubId || null,
    otp: null,
    otpExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  users.push(newUser);
  return newUser;
};

// Find user by email
const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

// Find user by ID
const findUserById = (id) => {
  return users.find(u => u._id === id || u.id === id);
};

// Verify user password
const verifyPassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

const getTotalUsers = () => users.length;

const updateUser = (userId, updates) => {
  const index = users.findIndex(u => u._id === userId || u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates, updatedAt: new Date() };
    return users[index];
  }
  return null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
  getTotalUsers,
  updateUser,
};
