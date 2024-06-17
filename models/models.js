import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    roles: [
        {
            type: String,
            enum: ["CUSTOMER", "SHOP_OWNER", "SHOP_BUDDY"],
        },
    ],
});

const CreditSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const PaymentSchema = new Schema({
    referenceId: {
        type: String,
    },
    paymentType: {
        type: String,
        enum: ["ONLINE", "CASH"],
    },
    paymentStatus: {
        type: String,
        enum: ["SUCCESS", "PENDING", "FAILED"],
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
});

const ShopSchema = new Schema({
    opensAt: { type: Number },
    closesAt: { type: Number },
    phone: { type: Number },
    name: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    accessUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
    },
});

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    manufacturingDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    minQuantity: {
        type: Number,
        default: 1,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    packingTime: {
        type: Number,
        required: true,
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: "Unit",
    },
    images: [{ type: String }],
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
});

const VariantSchema = new Schema({
    name: { type: String },
});

const UnitSchema = new Schema({
    name: { type: String },
});

const OrderSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    payments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Payment",
        },
    ],
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["PLACED", "FAILED", "CANCELLED", "DELIVERED"],
    },
    paymentStatus: {
        type: String,
        enum: ["SUCCESS", "PENDING", "INITIAL"],
    },
});

const User = model("User", UserSchema);
const Credit = model("Credit", CreditSchema);
const Payment = model("Payment", PaymentSchema);
const Shop = model("Shop", ShopSchema);
const Category = model("Category", CategorySchema);
const Product = model("Product", ProductSchema);
const Variant = model("Variant", VariantSchema);
const Unit = model("Unit", UnitSchema);
const Order = model("Order", OrderSchema);
