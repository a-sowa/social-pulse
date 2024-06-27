import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

mongoose
    .connect(
        'mongodb+srv://' + process.env.DB_USER_PASS + '@final-project-holberton.umifcl2.mongodb.net/social-pulse'
    )
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('Connection to MongoDB failed', err));

  export default mongoose;