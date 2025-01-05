import React from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import { useFormik } from 'formik';
import { passwordSchema } from '../../schema/passwordSchema';
import axios from 'axios';

const Password = ({user}) => {

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);
        } catch (error) {
            console.log(error);
        }
        actions.resetForm();
    }

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit,
        validationSchema: passwordSchema,
    });

    const inputs = [
        {
            id: 1,
            name: 'password',
            type: 'password',
            placeholder: 'Your Password',
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password,
        },
        {
            id: 2,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword,
        },
    ]

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit} className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start max-w-[900px]'>
            <Title addClass={"text-[40px]"}>Change Password</Title>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full'>
                    {inputs.map((input) => (
                        <Input key="input.id" {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
            <button className='btn-primary w-full md:w-56 mt-4' type='submit'>Update</button>
        </form>
    </React.Fragment>
  )
}

export default Password