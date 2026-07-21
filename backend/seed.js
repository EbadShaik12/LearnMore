const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Seeding demo users...');

    // Find or create sample student
    const studentEmail = 'student@example.com';
    let student = await User.findOne({ email: studentEmail });
    if (!student) {
      await User.create({
        name: 'Alex Johnson',
        email: studentEmail,
        password: 'password123',
        role: 'student',
      });
      console.log('Created student user: student@example.com / password123');
    } else {
      console.log('Student user already exists: student@example.com');
    }

    // Find or create sample instructor
    const instructorEmail = 'instructor@example.com';
    let instructor = await User.findOne({ email: instructorEmail });
    if (!instructor) {
      await User.create({
        name: 'Dr. Sarah Jenkins',
        email: instructorEmail,
        password: 'password123',
        role: 'instructor',
      });
      console.log('Created instructor user: instructor@example.com / password123');
    } else {
      console.log('Instructor user already exists: instructor@example.com');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
