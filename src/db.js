import mongoose from 'mongoose';
const mongoUrl = 'mongodb://localhost:27017';
// Use native promises
mongoose.Promise = global.Promise;

console.log('Connection to mongodb on: ' + mongoUrl);
// Connect to our mongo database;
mongoose.connect(mongoUrl);
mongoose.connection.on('error', (err) => { throw err; });
