import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        job: {
            type: String,
        },
        bio: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        confirmPassword: {
            type: String,
            required: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);