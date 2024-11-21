import * as Yup from 'yup';

export const footerSchema = Yup.object({
    location: Yup.string().required('Location is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    desc: Yup.string().required('Description is required'),
    day: Yup.string().required('Day is required'),
    time: Yup.string().required('Time is required'),

})