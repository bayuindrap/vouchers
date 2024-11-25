# vouchers

1. git clone https://github.com/bayuindrap/vouchers

2. run goose -dir ./migration mysql "root:admin@tcp(localhost:3306)/voucher" up

3. npm install

4. npm start

5. do a test in thunderclient / postman based on req like this
- POST /brand Create brand endpoint
- POST /voucher Create voucher endpoint
- Get Single Voucher GET /voucher?id={voucher_id}
- Get All Vouchers by Brand GET /voucher/brand?id={brand_id}
- Make Redemption POST /transaction/redemption
Customer can redemption with many vouchers
Eg: Voucher
total for Buy 2 Voucher Indomaret with
Point 50,000 = 100,000
- Transaction Detail GET transaction/redemption?transactionId={transactionId}
