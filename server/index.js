import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
console.log(process.env.CONNECTION_URL)

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({credentials: true}));

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(CONNECTION_URL)
})
// mongoose.connect(CONNECTION_URL)
//   .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//   .catch((error) => console.log(error.message));

