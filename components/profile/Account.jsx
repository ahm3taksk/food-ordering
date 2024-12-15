import React from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import { useFormik } from 'formik';
import { profileSchema } from '../../schema/profileSchema';
import axios from 'axios';

const Account = ({user}) => {

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);
            if (res.status === 200) {
                // refresh form data
                actions.resetForm();
                toast.success("Profile updated successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            address: user?.address,
            job: user?.job,
            bio: user?.bio,
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
    ]

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit} className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start'>
            <Title addClass={"text-[40px]"}>Account Settings</Title>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full'>
                    {inputs.map((input) => (
                        <Input key="input.id" {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
            <button type='submit' className='btn-primary w-full md:w-36 mt-4'>Update</button>
        </form>
    </React.Fragment>
  )
}

export default Account