import Cart from "../../models/CartModel.js";
import Product from "../../models/ProductModel.js";


const createCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        await cart.save()
        res.status(200).json({ 
            success: true, 
            message: "cart created successfully.", 
            data: cart 
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Error creating cart" 
        });
        
    }
}

const addCartProduct = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ success: false, message: "Please fill all the fields." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found." 
            });
        }

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        const findCurrentProductIndex = cart.products.findIndex(product => product.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            cart.products.push({ productId, quantity })
        } else {
            cart.products[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()
        res.status(200).json({ 
            success: true, 
            message: "Product added to cart successfully.", 
            data: cart 
        })

    } catch (error) {
        console.error(error);
        res.status(501).json({
            success: false,
            message: "failed to add product to cart !"
        })
    }
};

const fetchCartProducts = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found with provided userId!",
            });
        }

        const validItems = cart.products.filter(
            (productItem) => productItem.productId
        );

        if (validItems.length < cart.products.length) {
            cart.products = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            message: "Cart products fetched successfully",
            data: {
                ...cart._doc,
                products: populateCartItems,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "failed to retrive products!"
        })
    }
};

const updateProductQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found with provided userId!",
            });
        }

        const findCurrentProductIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present !",
            });
        }

        cart.products[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "products.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.products.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            message: "Product quantity updated successfully!",
            data: {
                ...cart._doc,
                products: populateCartItems,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: "failed to update!"
        })
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID required!",
            });
        }
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found with provided userId!",
            });
        }

        cart.products = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully!",
        })

    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: "failed to clear cart!"
        })
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        cart.products = cart.products.filter(
            (item) => item.productId._id.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "products.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.products.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            message: "Product deleted from cart successfully!",
            data: {
                ...cart._doc,
                products: populateCartItems,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: "failed to delete product !"
        })
    }
};

export { addCartProduct, fetchCartProducts, updateProductQuantity, deleteCartProduct, clearCart, createCart }