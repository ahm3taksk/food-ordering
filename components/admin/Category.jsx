import Title from '../ui/Title'
import Input from '../form/Input'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Category = () => {

    const [inputText, setInputText] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(res?.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])
    
    const handleCreate = async (e) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { title: inputText });
            setCategories([...categories, res.data]);
            setInputText("");
        } catch (err) {
            console.log(err);
        }
    };
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
            setCategories(categories.filter((cat) => cat._id !== id));
            toast.warning('Category Deleted');
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='p-0 pb-8 md:p-8 flex-1'>
        <Title addClass={"text-[40px]"}>Category</Title>
        <div className='mt-5'>
            <div className='flex gap-4 flex-col sm:flex-row flex-1 items-center'>
                <Input placeholder="Add a new Category..." onChange={(e) => setInputText(e.target.value)} value={inputText} />
                <button onClick={handleCreate} className="btn-primary w-full sm:w-auto" >Add</button>
            </div>
            <div className='mt-10 max-h-[250px] overflow-auto pb-4'>
                {categories.map((category) => (
                    <div className='flex justify-between mt-4' key={category._id}>
                        <span className='font-bold text-xl'>{category.title}</span>
                        <button className="btn-primary !bg-danger" onClick={() => handleDelete(category._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Category