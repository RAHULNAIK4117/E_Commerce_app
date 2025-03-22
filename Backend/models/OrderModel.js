import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    userId: String,
    orders: [
        {
            productId: String,
            title: String,
            image: String,
            price: Number,
            salePrice: Number,
            quantity: Number
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
export default Order;