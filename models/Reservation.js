import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        persons: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);