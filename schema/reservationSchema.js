
import * as Yup from 'yup';

export const reservationSchema = Yup.object({
    fullName: Yup.string().min(3, 'Must be at least 3 characters').required('Full Name is required'),
    phoneNumber: Yup.string().min(9, 'Must be 10 characters or more').max(11, 'Must be 10 characters or less').required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    persons: Yup.number().min(1, 'Must be at least 1 person').max(15, 'Must be 15 persons or less').required('Number of persons is required'),
    date: Yup.date().min(new Date(), 'Date must be in the future').required('Date is required')
})