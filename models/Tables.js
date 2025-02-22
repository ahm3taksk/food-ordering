import mongoose from 'mongoose';

// Define the schema for restaurant tables
const tableSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true }, // Table number
    status: { 
        type: String, 
        enum: ['available', 'occupied', 'reserved'], 
        default: 'available' // Default status is available
    },
    updatedAt: { type: Date, default: Date.now } // Timestamp for last update
});

// Create the model from the schema
const Table = mongoose.models.Table || mongoose.model('Table', tableSchema);

export default Table;
