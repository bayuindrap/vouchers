import express from 'express';
import bodyParser from 'body-parser';
import brandRoutes from './api/brand.js'
import voucherRoute from './api/voucher.js'
import redemptionRoute from './api/redemption.js'


const app = express();
app.use(bodyParser.json());


app.use('/brand', brandRoutes)
app.use('/voucher', voucherRoute)
app.use('/transaction', redemptionRoute)


const PORT = 4848;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
