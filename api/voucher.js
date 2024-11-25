import express from "express";
import { getConnection } from "../services/db.js";
import { getDate, generateVoc } from "../utils/utils.js";


const router = express.Router();

const insertTableVoucher = (brandId, val) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
            `INSERT INTO voucher(code, brand_id, value, created_at) VALUES(?, ?, ?, ?)`,
            [generateVoc(), brandId, val, getDate()],
            (error, elements) => {
              connection.release();
              if (error) {
                return reject(error);
              }
              return resolve(elements);
            },
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

const getVoucherById = (id) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
           `SELECT code FROM voucher WHERE id = ?`,
            [id],
            (error, elements) => {
              connection.release();
              if (error) {
                return reject(error);
              }
              return resolve(elements);
            },
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

const getVoucherByBrand = (id) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
           `SELECT code FROM voucher WHERE brand_id = ?`,
            [id],
            (error, elements) => {
              connection.release();
              if (error) {
                return reject(error);
              }
              return resolve(elements);
            },
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  

router.post('/', async (req, res) => {
    try {
      const {brandId, val} = req.body;
      if(!brandId){
        return res.status(400).send({
            status: false,
            message: "Brand Id can't be empty"
        })
      }
      if(!val){
        return res.status(400).send({
            status: false,
            message: "Value disc can't be empty"
        })
      }
      await insertTableVoucher(brandId, val);
      return res.status(200).send({
        status: true,
        message: 'Add Voucher success',
      });
    } catch (error) {
      return res.status(400).send({
        status: false,
        message: error.message,
        data: null,
      });
    }
  });


router.get('/', async (req, res) => {
    try {
      const {id} = req.query;
      const result = await getVoucherById(id)
      return res.status(200).send({
        status: true,
        message: 'Get Voucher success',
        data: result
      });
    } catch (error) {
      return res.status(400).send({
        status: false,
        message: error.message,
        data: null,
      });
    }
  });

  
router.get('/brand', async (req, res) => {
    try {
      const {id} = req.query;
      const result = await getVoucherByBrand(id)
      return res.status(200).send({
        status: true,
        message: 'Get Voucher success',
        data: result
      });
    } catch (error) {
      return res.status(400).send({
        status: false,
        message: error.message,
        data: null,
      });
    }
  });




export default router;