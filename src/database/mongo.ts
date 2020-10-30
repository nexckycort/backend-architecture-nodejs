import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

db.on('error', (error: any) => {
  console.log(error);
});

export default db;
