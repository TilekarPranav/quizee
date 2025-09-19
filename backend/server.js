import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

config();
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));

// 🔥 Explicitly allow only your frontend
app.use(cors({
  origin: "https://quizee-frontend-app.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => res.json("API Running"));

connect().then(() => {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}).catch(err => console.log("DB Connection Failed:", err));
