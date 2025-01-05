import React from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import { useFormik } from 'formik';
import { footerSchema } from '../../schema/footerSchema';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = () => {
    const [iconName, setIconName] = useState("fa");
    const [linkAddress, setLinkAddress] = useState("https://");
    const [footerData, setFooterData] = useState([])
    const [socialMediaLinks, setSocialMediaLinks] = useState([])
    useEffect(() => {
        const getFooterData = async () => {
            try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/footer`
            );
            setFooterData(res.data[0]);
            setSocialMediaLinks(res.data[0]?.socialMedia);
            } catch (err) {
            console.log(err);
            }
        };
        getFooterData();
    }, []);

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
                {
                    location: values.location,
                    email: values.email,
                    phoneNumber: values?.phoneNumber,
                    desc: values.desc,
                    openingHours: {
                        day: values.day,
                        hour: values.time,
                    },
                    socialMedia: socialMediaLinks,
                }
            );
            if (res.status === 200) {
                toast.success("Footer updated successfully");
            } else {
                toast.error("Something went wrong");
            }

        } catch (err) {
            console.log(err);
        }
    };
    
    const handleCreate = () => {
        if (socialMediaLinks.some(link => link.icon === iconName && link.link === linkAddress)) {
            toast.error("This link already exists!");
            return;
        }
        setSocialMediaLinks((prev) => [...prev, { icon: iconName, link: linkAddress }]);
        setLinkAddress("https://");
        setIconName("");
    };
    

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
        enableReinitialize: true,
        initialValues: {
            location: footerData?.location,
            email: footerData?.email,
            phoneNumber: footerData?.phoneNumber,
            desc: footerData?.desc,
            day: footerData?.openingHours?.day,
            time: footerData?.openingHours?.hour,
        },
        onSubmit,
        validationSchema: footerSchema,
    });

    const inputs = [
        {
            id: 'location',
            Name: 'location',
            type: 'text',
            placeholder: 'Location',
            value: values.location,
            errorMessage: errors.location,
            touched: touched.location,
        },
        {
            id: 'email',
            Name: 'email',
            type: 'email',
            placeholder: 'Email',
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 'phoneNumber',
            Name: 'phoneNumber',
            type: 'text',
            placeholder: 'Phone Number',
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,
        },
        {
            id: 'desc',
            Name: 'desc',
            type: 'text',
            placeholder: 'Description',
            value: values.desc,
            errorMessage: errors.desc,
            touched: touched.desc,
        },
        {
            id: 'day',
            Name: 'day',
            type: 'text',
            placeholder: 'Day',
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day,
        },
        {
            id: 'time',
            Name: 'time',
            type: 'text',
            placeholder: 'Time',
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time,
        }
    ]

  return (
    <div className='w-full overflow-auto md:max-h-[calc(100vh_-_465px)] pb-5'>
        <form className='flex-1 flex flex-col items-center md:items-start' onSubmit={handleSubmit}>
            <Title addClass={"text-[40px]"}>Footer Content</Title>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full'>
                    {inputs.map((input) => (
                        <Input key={input.id} {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
                <div className='mt-4 flex items-center gap-4 w-full'>
                    <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
                    <Input
                        placeholder="Link Address"
                        onChange={(e) => setLinkAddress(e.target.value)}
                        value={linkAddress}
                    />
                    <Input
                        placeholder="Icon Class (Font Awesome)"
                        onChange={(e) => setIconName(e.target.value)}
                        value={iconName}
                    />
                        <button className="btn-primary w-full sm:w-1/2" type="button" onClick={handleCreate} > Add Icon</button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-x-5'>
                    <ul className='flex flex-wrap items-center gap-x-6 gap-y-2 w-full mt-4 border border-primary bg-white p-2'>
                    {socialMediaLinks.map((item, index) => (
                        <li key={index} className="flex items-center justify-center">
                            <i className={`${item.icon} text-2xl`}></i>
                            <button className="text-danger"  onClick={() => {setSocialMediaLinks((prev) => prev.filter((item, i) => i !== index))}} type="button" >
                                <i className="fa fa-trash text-md ml-2"></i>
                            </button>
                        </li>
                    ))}
                    </ul>
                    <button className='btn-primary w-full md:w-36 mt-4' type='submit'>Update</button>
                </div>
        </form>
    </div>
  )
}

export default Footer
