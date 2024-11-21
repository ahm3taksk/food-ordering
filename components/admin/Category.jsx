import Title from '../ui/Title'
import Input from '../form/Input'
import { useState } from 'react'

const Category = () => {

    const [inputText, setInputText] = useState("");
    const [categories, setCategories] = useState(["pizza"]);

  return (
    <div className='p-0 pb-8 md:p-8 flex-1'>
        <Title addClass={"text-[40px]"}>Category</Title>
        <div className='mt-5'>
            <div className='flex gap-4 flex-col sm:flex-row flex-1 items-center'>
                <Input placeholder="Add a new Category..." onChange={(e) => setInputText(e.target.value)} value={inputText} />
                <button className="btn-primary w-full sm:w-auto"onClick={() => {setCategories([...categories, inputText]);setInputText("");}} >Add</button>
            </div>
            <div className='mt-10'>
                {categories.map((category, index) => (
                    <div className='flex justify-between mt-4' key={index}>
                        <span className='font-bold text-xl'>{category}</span>
                        <button className="btn-primary !bg-danger" onClick={() => setCategories(categories.filter((cat) => cat !== category)) }>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Category