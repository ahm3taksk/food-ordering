import * as Yup from 'yup';

export const adminSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Must be at least 3 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters')
});
