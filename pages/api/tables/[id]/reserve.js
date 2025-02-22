import dbConnect from '../../../../util/dbConnect'; // Utility to connect to MongoDB
import Table from '../../../../models/Tables'; // Import the Table model

export default async function handler(req, res) {
    const { id } = req.query; // Get the table ID from the request query
    await dbConnect(); // Connect to the database

    if (req.method === 'POST') {
        try {
            const table = await Table.findById(id); // Find the table by ID
            if (table) {
                table.status = 'reserved'; // Update the status to reserved
                table.updatedAt = Date.now(); // Update the timestamp
                await table.save(); // Save the updated table
                res.status(200).json(table); // Return the updated table
            } else {
                res.status(404).json({ message: 'Table not found' }); // Handle not found
            }
        } catch (error) {
            res.status(500).json({ message: 'Error reserving table', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
} 