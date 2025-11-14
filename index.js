// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// dotenv.config();
// require('./config/Passport'); 
// const authRoutes = require('./routes/Auth');
// const protectedRoutes = require('./routes/Protected');
// const taskRoutes = require('./routes/Tasks');
// const imageRoutes = require('./routes/ImageRoutes');
// const cartRoutes = require('./routes/CartRoutes');
// const productRoutes = require('./routes/ProductRoutes');




// const app = express();
// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   credentials: true
// // }));
// const corsOptions = {
//   origin: [
//     'https://e-commerce-five-theta-10.vercel.app', // ✅ your live frontend
//     'http://localhost:3000' // ✅ for local testing
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200, // ✅ for legacy browser support
//   preflightContinue: false   // ✅ to handle preflight requests properly
// };



// app.use(cors(corsOptions)); // <== CORS middleware

// app.use(express.json());
// app.use(session({
//   secret: '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',
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// mongoose.connect(process.env.DATABASE_URL)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error(err));

// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoutes);
// app.use('/tasks', taskRoutes);
// app.use('/images', imageRoutes);
// app.use('/cart', cartRoutes);
// app.use('/products', productRoutes);
// app.use('/uploads', express.static('uploads'));

// app.get('/', (req, res) => {
//   res.send('Backend server is running successfully 🚀');
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
require('./config/Passport'); 
const authRoutes = require('./routes/Auth');
const protectedRoutes = require('./routes/Protected');
const taskRoutes = require('./routes/Tasks');
const imageRoutes = require('./routes/ImageRoutes');
const cartRoutes = require('./routes/CartRoutes');
const productRoutes = require('./routes/ProductRoutes');




const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

const corsOptions = {
  origin: [
    'https://sixteenclothing.vercel.app', // ✅ your live frontend
    'http://localhost:3000' // ✅ for local testing
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // ✅ for legacy browser support
  preflightContinue: false   // ✅ to handle preflight requests properly
};



app.use(cors(corsOptions)); // <== CORS middleware

app.use(express.json());
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/tasks', taskRoutes);
app.use('/images', imageRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Backend server is running successfully 🚀');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



