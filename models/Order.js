import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
            maxLength: 100,
        },
        customerId: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            maxLength: 200,
        },
        total: {
            type:  Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
        method: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);