import dbConnect from '../../../util/dbConnect'; // Utility to connect to MongoDB
import Table from '../../../models/Tables'; // Import the Table model

export default async function handler(req, res) {
    await dbConnect(); // Connect to the database

    if (req.method === 'GET') {
        try {
            const tables = await Table.find({}); // Fetch all tables
            res.status(200).json(tables); // Return the tables as JSON
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tables', error });
        }
    } else if (req.method === 'POST') {
        try {
            const newTable = new Table(req.body); // Create a new table instance
            await newTable.save(); // Save the new table to the database
            res.status(201).json(newTable); // Return the created table
        } catch (error) {
            res.status(500).json({ message: 'Error creating table', error });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
} 