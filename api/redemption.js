import express from "express";
import { getConnection } from "../services/db.js";
import { getDate } from "../utils/utils.js";


const router = express.Router();

const insertTableRedemption = (customerId, voucherId) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
            `INSERT INTO redemption(customer_id, voucher_id, created_at) VALUES(?, ?, ?)`,
            [customerId, voucherId, getDate()],
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


  const insertTableTransaction = (customerId, valueDisc, redemptionId) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
           `INSERT INTO transaction(customer_id, value_disc, created_at, redemption_id) 
             VALUES(?, ?, ?, ?)`,
            [customerId, valueDisc, getDate(), redemptionId],
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


  const getVoucherValue = (voucherIdValue) => {
    return new Promise((resolve, reject) => {
      getConnection()
        .then((connection) => {
          connection.query(
          `SELECT value FROM voucher WHERE id = ?`,
            [voucherIdValue],
            (error, results) => {
              connection.release();
              if (error) {
                return reject(error);
              }
              if (results.length === 0) {
                return reject(new Error('Voucher not found'));
              }
              return resolve(results[0].value);
            },
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getTransactionDetail = (transactionId) => {
    return new Promise((resolve, reject) => {
        getConnection().then(connection => {
            const query = `
                SELECT a.customer_id, a.value_disc as total_disc, a.redemption_id, b.voucher_id, c.code, c.value
                FROM transaction a
                LEFT JOIN redemption b on FIND_IN_SET(b.id, a.redemption_id)
                LEFT JOIN voucher c on b.voucher_id = c.id
                WHERE a.idtransaction = ?
            `;
            const params = [transactionId];
            connection.query(query, params, (error, elements) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        }).catch(error => {
            reject(error);
        });
    });
};


router.post('/redemption', async (req, res) => {
    try {
        const { customerId, voucherIds } = req.body;
        
        if (!customerId) {
            return res.status(400).send({
                status: false,
                message: "Customer Id can't be empty"
            });
        }
        
        if (!voucherIds || !Array.isArray(voucherIds) || voucherIds.length === 0) {
            return res.status(400).send({
                status: false,
                message: "Voucher Ids can't be empty"
            });
        }

        let totalValue = 0;
        const redemptionIds = [];

        for (const voucherId of voucherIds) {
            const redemptionResult = await insertTableRedemption(customerId, voucherId);
            redemptionIds.push(redemptionResult.insertId);

            const voucherValue = await getVoucherValue(voucherId);
            totalValue += voucherValue;
        }

        await insertTableTransaction(customerId, totalValue, redemptionIds.join(','));
        
        return res.status(200).send({
            status: true,
            message: 'Add Redemption Log Success',
            data: {
                redemptionId: redemptionIds,
                totalValue: totalValue
            }
        });
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error.message,
            data: null,
        });
    }
});

router.get('/redemption', async (req, res) => {
    try {
      const {transactionId} = req.query;
      const result = await getTransactionDetail(transactionId)
      return res.status(200).send({
        status: true,
        message: 'Get Transaction data success',
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
