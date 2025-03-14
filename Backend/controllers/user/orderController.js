import Order from "../../models/OrderModel.js";



const addOrder = async (req, res) => {
    try {
        const { userId, orders, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount } = req.body;

        if(!userId || !orders || !addressInfo || !orderStatus || !paymentMethod || !paymentStatus || !totalAmount){
            return res.status(400).json({ 
                success: false,
                message: "Please fill all the fields" 
            });
        }

        const newOrder = new Order({
            userId,
            orders,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
        })

        await newOrder.save()
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        })

    } catch (error) {
        console.log('Error in adding Order!', error);
        res.status(500).json({
            success: false,
            message: 'Error in adding Order',
        })
    }
};


const getOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId ){
            return res.status(400).json({ 
                success: false,
                message: "User ID not valid" 
            });
        }

        const order = await Order.find({userId})

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: order
        })
    } catch (error) {
        console.log('Error in fetching Orders!', error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching Orders!',
        })
    }
};


const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find()

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: order
        })
    } catch (error) {
        console.log('Error in fetching Orders!', error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching Orders!',
        })
    }
};


const updateOrder = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        if(!orderId || !orderStatus){
            return res.status(400).json({
                success: false,
                message: "Please provide both orderId and orderStatus",
            })
        }

        const order = await Order.findByIdAndUpdate({_id:orderId},{
            $set: {orderStatus: orderStatus}
        },{
            new: true
        })

        res.status(200).json({
            success: true,
            message: "Orders updated successfully",
            data: order
        })

    } catch (error) {
        console.log('Error in updating Orders!', error);
        res.status(500).json({
            success: false,
            message: 'Error in updating Orders!',
        })
    }
};





export { addOrder, getOrders, getAllOrders, updateOrder }