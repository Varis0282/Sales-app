const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const saleSchema = new mongoose.Schema({
    saleId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    saleAmount: {
        type: Number,
        required: true
    },
    Seller: {
        type: ObjectId,
        ref: "UserModel"
    }
});

mongoose.model("SaleModel", saleSchema);