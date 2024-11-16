import React from 'react'
import Title from '../components/ui/Title'
import Input from '../components/form/Input'
import { useFormik } from 'formik';
import { reservationSchema } from '../schema/reservationSchema';

const Reservation = () => {

    const onSubmit = async (values, actions) => {
        await new Promise((resolve => setTimeout(resolve, 4000)));
        actions.resetForm();
    }

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            persons: '',
            date: ''
        },
        onSubmit,
        validationSchema: reservationSchema,
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
            name: 'persons',
            type: 'number',
            placeholder: 'How Many Persons',
            value: values.persons,
            errorMessage: errors.persons,
            touched: touched.persons,
        },
        {
            id: 5,
            name: 'date',
            type: 'datetime-local',
            value: values.date,
            errorMessage: errors.date,
            touched: touched.date,
        }

    ]

  return (
    <div className='container mx-auto py-12 px-5 md:px-0'>
        <Title addClass='text-[40px] mb-10'>Book A Table</Title>
        <div className='flex flex-wrap-reverse justify-between gap-10'>
            <form onSubmit={handleSubmit} className='md:flex-1 w-full justify-center'>
                <div className='flex flex-col gap-y-3'>
                    {inputs.map((input) => (
                        <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
                    ))}
                </div>
                <button type="submit" className='btn-primary mt-4 w-full sm:w-auto'>Book Now</button>
            </form>
            <div className='md:flex-1'>
                <iframe className="h-full w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1562.295511169735!2d27.110564955821395!3d38.45091462717284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9bbd7db6197%3A0x7f697b5deb14115!2sZ%C3%BCbeyde%20Han%C4%B1m%20Stadyumu!5e0!3m2!1str!2str!4v1731758382149!5m2!1str!2str" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
  )
}

export default Reservation