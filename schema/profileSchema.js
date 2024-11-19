
import * as Yup from 'yup';

export const profileSchema = Yup.object({
            // fullName: '',
            // phoneNumber: '',
            // email: '',
            // address: '',
            // job: '',
            // bio: ''
    fullName: Yup.string().min(3, 'Must be at least 3 characters').required('Full Name is required'),
    phoneNumber: Yup.string().min(9, 'Must be 10 characters or more').max(11, 'Must be 10 characters or less').required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    job: Yup.string().required('Job is required'),
    bio: Yup.string().required('Bio is required')
})