import React from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import { useFormik } from 'formik';
import { passwordSchema } from '../../schema/passwordSchema';

const Password = () => {

    const onSubmit = async (values, actions) => {
        await new Promise((resolve => setTimeout(resolve, 4000)));
        actions.resetForm();
    }

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
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
        <form onSubmit={handleSubmit} className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start'>
            <Title addClass={"text-[40px]"}>Change Password</Title>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full'>
                    {inputs.map((input) => (
                        <Input key="input.id" {...input} onBlur={handleBlur} onChange={handleChange} />
                    ))}
                </div>
            <button className='btn-primary w-full md:w-36 mt-4' type='submit'>Update</button>
        </form>
    </React.Fragment>
  )
}

export default Password