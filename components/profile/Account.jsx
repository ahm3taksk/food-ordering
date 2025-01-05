import React, { useState, useEffect } from 'react';
import Title from '../ui/Title';
import Input from '../form/Input';
import Image from 'next/image';
import { useFormik } from 'formik';
import { profileSchema } from '../../schema/profileSchema';
import axios from 'axios';
import { toast } from 'react-toastify';

const Account = ({ user }) => {
    const [file, setFile] = useState();
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        setImageSrc(user.avatar);
    }, [user.avatar]);

    const onSubmit = async (values, actions) => {
        try {
            const data = new FormData();

            if (file) {
                data.append('file', file);
                data.append('upload_preset', 'food-ordering');
                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dlkqsghxd/image/upload', data);
                values.avatar = uploadRes.data.secure_url;
            } else {
                values.avatar = user.avatar;
            }

            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);

            if (res.status === 200) {
                toast.success('Profile updated successfully!');
            }

        } catch (error) {
            console.log('Upload Error:', error.response ? error.response.data : error.message);
            toast.error('Error uploading image');
        }
    };

    const handleFileChange = (changeEvent) => {
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setFile(changeEvent.target.files[0]);
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            address: user?.address,
            job: user?.job,
            bio: user?.bio,
            avatar: user?.avatar, // Include the current avatar in form values
        },
        onSubmit,
        validationSchema: profileSchema,
    });

    const inputs = [
        {
            id: 1,
            name: 'fullName',
            type: 'text',
            placeholder: 'Your Full Name',
            value: values.fullName,
            errorMessage: errors.fullName,
            touched: touched.fullName,
        },
        {
            id: 2,
            name: 'phoneNumber',
            type: 'number',
            placeholder: 'Your Phone Number',
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,
        },
        {
            id: 3,
            name: 'email',
            type: 'email',
            placeholder: 'Your Email Address',
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 4,
            name: 'address',
            type: 'text',
            placeholder: 'Your Address',
            value: values.address,
            errorMessage: errors.address,
            touched: touched.address,
        },
        {
            id: 5,
            name: 'job',
            type: 'text',
            placeholder: 'Your Job',
            value: values.job,
            errorMessage: errors.job,
            touched: touched.job,
        },
        {
            id: 6,
            name: 'bio',
            type: 'text',
            placeholder: 'Your Bio',
            value: values.bio,
            errorMessage: errors.bio,
            touched: touched.bio,
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="w-full p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start">
            <Title addClass={"text-[40px]"}>Account Settings</Title>
            <div className="flex flex-col md:flex-row justify-start items-start text-sm gap-4 w-full md:w-3/4">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full">
                    {inputs.map((input) => (
                        <Input key={input.id} {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
                <div className="flex flex-col text-sm mt-6 w-full md:w-1/4">
                    <div className="flex flex-col items-center">
                        <label className="flex gap-2 items-center">
                            <input type="file" className="hidden" onChange={handleFileChange} />
                            <button className="btn-primary !bg-blue-600 pointer-events-none">Choose an image</button>
                        </label>
                        {imageSrc && <Image src={imageSrc} alt="Avatar" width={100} height={100} className="rounded-full w-[120px] h-[120px] object-cover mt-2 cursor-not-allowed" />}
                        <button className="btn-danger mt-2" onClick={() => setImageSrc(user.avatar)}>Remove Avatar</button>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn-primary w-full md:w-56 mt-4">Update</button>
        </form>
    );
};

export default Account;
