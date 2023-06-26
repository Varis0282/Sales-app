const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const SaleModel = mongoose.model("SaleModel");
const protected = require('../MIddleware/protected');


router.post("/addsale", protected, (req, res) => {
  const { saleId, productName, quantity, saleAmount } = req.body;
  if (!saleId || !productName || !quantity || !saleAmount) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  // Check if the saleId already exists
  SaleModel.findOne({ saleId })
    .then((existingSale) => {
      if (existingSale) {
        return res.status(409).json({ message: "Sale ID already exists" });
      }

      req.user.password = undefined;
      const sale = new SaleModel({
        saleId: saleId,
        productName: productName,
        quantity: quantity,
        saleAmount: saleAmount,
        seller: req.user,
      });

      sale
        .save()
        .then((result) => {
          res.status(200).json({ message: "Sale added successfully", Sale: result });
        })
        .catch((err) => {
          res.status(500).json({ message: "Something went wrong" });
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    });
});

router.get("/topsale", protected, (req, res) => {
  SaleModel.find()
    .sort({ saleAmount: -1 , quantity: -1 }) // Sort by saleAmount in descending order and quantity in ascending order
    .limit(5)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    });
});

router.get("/revenue",protected, (req, res) => {
  SaleModel.find()
  .then((sales)=>{
    let totalrevenue = 0;
    sales.forEach(sale => {
      totalrevenue += sale.saleAmount;
    });
    res.status(200).json(totalrevenue);
  })
  .catch((err) => {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  })  
})


module.exports = router;
