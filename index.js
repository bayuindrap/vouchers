import express from 'express';
import bodyParser from 'body-parser';
import brandRoutes from './api/brand.js'
// const { Brand, Voucher, Redemption } = require('./models');

const app = express();
app.use(bodyParser.json());


app.use('/vouchers/brand', brandRoutes)


// const PORT = process.env.PORT || 3000;
const PORT = 4848;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
