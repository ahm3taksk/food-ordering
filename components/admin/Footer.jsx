import React from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import { useFormik } from 'formik';
import { footerSchema } from '../../schema/footerSchema';
import { useState } from 'react';

const Footer = () => {

    const [linkAddress, setLinkAddress] = useState("");
    const [iconName, setIconName] = useState("");
    const [icons, setIcons] = useState(
        [
            "fa-brands fa-facebook-f",
            "fa-brands fa-twitter",
            "fa-brands fa-linkedin-in",
            "fa-brands fa-instagram",
            "fa-brands fa-pinterest",
        ]
    )

    const onSubmit = async (values, actions) => {
        await new Promise((resolve => setTimeout(resolve, 4000)));
        actions.resetForm();
    }

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        initialValues: {
            location: '',
            email: '',
            phoneNumber: '',
            desc: '',
            day: '',
            time: '',
        },
        onSubmit,
        validationSchema: footerSchema,
    });

    const inputs = [
        {
            id: 'location',
            name: 'location',
            type: 'text',
            placeholder: 'Location',
            value: values.location,
            errorMessage: errors.location,
            touched: touched.location,
        },
        {
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 'phoneNumber',
            name: 'phoneNumber',
            type: 'text',
            placeholder: 'Phone Number',
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,
        },
        {
            id: 'desc',
            name: 'desc',
            type: 'text',
            placeholder: 'Description',
            value: values.desc,
            errorMessage: errors.desc,
            touched: touched.desc,
        },
        {
            id: 'day',
            name: 'day',
            type: 'text',
            placeholder: 'Day',
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day,
        },
        {
            id: 'time',
            name: 'time',
            type: 'text',
            placeholder: 'Time',
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time,
        }
    ]

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit} className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start'>
            <Title addClass={"text-[40px]"}>Footer Content</Title>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full'>
                    {inputs.map((input) => (
                        <Input key="input.id" {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
                <div className='mt-4 flex items-center gap-4 w-full'>
                    <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
                        <Input placeholder="Link Address" value="https://"/>
                        <Input placeholder="Icon Name" defaultValue="fa " onChange={(e) => setIconName(e.target.value)}value={iconName}/>
                        <button className="btn-primary w-full sm:w-1/2" type="button" onClick={() => {setIcons([...icons, iconName]); setIconName("fa")}} > Add Icon</button>
                    </div>
                </div>
                <ul className='flex flex-wrap items-center gap-x-6 gap-y-2 w-full mt-4 border border-primary p-2'>
                {icons.map((icon, index) => (
                    <li key={index} className="flex items-center justify-center">
                        <i className={`${icon} text-2xl`}></i>
                        <button className="text-danger"  onClick={() => {setIcons((prev) => prev.filter((item, i) => i !== index))}} type="button" >
                            <i className="fa fa-trash text-md ml-2"></i>
                        </button>
                    </li>
                ))}
                </ul>
            <button className='btn-primary w-full md:w-36 mt-4'>Update</button>
        </form>
    </React.Fragment>
  )
}

export default Footer
