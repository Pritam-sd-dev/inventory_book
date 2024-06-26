import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

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
        unique: true,
    },
    age: {
        type: Number,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    roles: {
        type: [String],
        enum: ["CUSTOMER", "SHOP_OWNER", "SHOP_BUDDY"],
        default: ["CUSTOMER"],
    },
});

UserSchema.methods = {
    generateToken: function () {
        return jwt.sign(
            { id: this._id, name: this.name, roles: this.roles },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
};

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
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: String,
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

export const User = model("User", UserSchema);
export const Credit = model("Credit", CreditSchema);
export const Payment = model("Payment", PaymentSchema);
export const Shop = model("Shop", ShopSchema);
export const Category = model("Category", CategorySchema);
export const Product = model("Product", ProductSchema);
export const Variant = model("Variant", VariantSchema);
export const Unit = model("Unit", UnitSchema);
export const Order = model("Order", OrderSchema);
