const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const cookieParser = require('cookie-parser');
const stripeRouter = require('./routes/stripeRoutes');
dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

connectDB();




app.use(express.json());
app.use(cookieParser());


  
  const corsOptions = {
  origin: 'http://localhost:4000', // El origen del frontend
  credentials: true, // Permitir envío de cookies y cabeceras de autorización
  };
  app.use(cors(corsOptions));

  app.use('/api/stripe', stripeRouter);
  
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
  
  app.use('/api/shopping-cart', shoppingCartRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
