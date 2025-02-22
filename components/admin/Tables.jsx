import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../ui/Title';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTables = async () => {
        try {
            const response = await axios.get('/api/tables');
            setTables(response.data);
        } catch (err) {
            setError('Error fetching tables');
        } finally {
            setLoading(false);
        }
    };

    const reserveTable = async (id) => {
        try {
            await axios.post(`/api/tables/${id}/reserve`);
            fetchTables();
        } catch (err) {
            setError('Error reserving table');
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div className='w-full pb-5'>
            <Title addClass={'text-[40px]'}>Tables</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    tables.map((table) => (
                        <div key={table._id} className={`p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 ${table.status === 'available' ? 'bg-green-500' : table.status === 'reserved' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                            <div className='flex'>
                                {/* Left side for table number */}
                                <div className='flex-1 flex justify-center items-center'>
                                    <h2 className='text-white text-7xl font-bold flex flex-col text-center'><span className="text-xl">Table</span> {table.number} </h2>
                                </div>
                                {/* Right side for status and button */}
                                <div className='flex-1 flex flex-col justify-center items-center'>
                                    <p className='text-white text-lg font-semibold uppercase'>{table.status}</p>
                                    {table.status === 'available' && (
                                        <button 
                                            onClick={() => reserveTable(table._id)} 
                                            className='mt-2 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200'
                                        >
                                            Reserve
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tables;