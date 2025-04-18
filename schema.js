import mongoose from "mongoose";

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "" },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      full_name: { type: String, default: "" },
      username: { type: String, default: "" },
      gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
      birthday: { type: Date, default: null },
      phone: { type: String, default: "" },
      avatar: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// Plant Schema
const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    avgPriceYesterday: { type: Number, default: 0 },
    avgPriceNow: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

// InforPlant Schema
const inforPlantSchema = new mongoose.Schema(
  {
    climate: { type: String, required: true },
    land: { type: String, required: true },
    target: { type: String, default: "" },
    time: { type: String, default: "" },
    water: { type: String, required: true },
    fertilize: { type: String, default: "" },
    grass: { type: String, default: "" },
    insect: { type: String, default: "" },
    disease: { type: String, default: "" },
    harvest: { type: String, default: "" },
    preserve: { type: String, default: "" },
    plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
  },
  { timestamps: true }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    info: { type: String, default: "" },
    image: { type: String, default: "" },
    status: { type: String, enum: ["available", "out_of_stock"], default: "available" },
    evaluate: { type: Number, default: 5 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
  },
  { timestamps: true }
);

// UserCart Schema
const userCartSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Seller Schema (Order Schema)
const sellerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderCode: { type: String, required: true, unique: true },
    dateOrder: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Category = mongoose.model("Category", categorySchema);
export const Plant = mongoose.model("Plant", plantSchema);
export const Infor = mongoose.model("Infor", inforPlantSchema);
export const Product = mongoose.model("Product", productSchema);
export const UserCart = mongoose.model("UserCart", userCartSchema);
export const Seller = mongoose.model("Seller", sellerSchema);
export const Contact = mongoose.model("Contact", contactSchema);