import express from "express";
import { getConnection } from "../services/db.js";
import { getDate } from "../utils/utils.js";


const router = express.Router();

const insertTableBrand = (brandName) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
            `INSERT INTO brand (name, created_at) VALUES(?, ?)`, [brandName, getDate()],
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
      const {brandName} = req.body;

      await insertTableBrand(brandName);
  
      return res.status(200).send({
        status: true,
        message: 'Add brand success',
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