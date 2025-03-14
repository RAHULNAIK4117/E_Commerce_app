import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: [String],
      default: [],
    },
    color: {
      type: [String],
      default: [],
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    warranty: {
      type: String,
      default: "No warranty",
    },
    returnPolicy: {
      type: String,
      default: "10 days return policy",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

/*
{
    id: 1,
    title: "Nike Air Max 270",  >
    rating: 4.5,
    reviewsCount: 920,
    price: 13999,
    discount: "15",
    description:
      "Nike's popular lifestyle running shoe with an extra-large air cushion for maximum comfort. Features responsive cushioning and breathable mesh upper.",
    size: ["UK 7", "UK 8", "UK 9", "UK 10"],
    image:
      "https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0",
    brand: "Nike",
    category: "footwear",
    color: ["Black", "White", "Blue"],
    warranty: "6 Months",
    returnPolicy: "10 days return",
    reviews: [
      {
        rating: 5,
        comment: "Super comfortable shoes! Perfect for all-day wear.",
        user: {
          name: "Arjun Mehta",
          location: "Delhi, India",
          verifiedPurchase: true,
        },
      },
      {
        rating: 4,
        comment:
          "Nice shoes but a bit tight initially. Needed a few days to break in.",
        user: {
          name: "Sneha Kapoor",
          location: "Mumbai, India",
          verifiedPurchase: true,
        },
      },
    ],
  },
*/
