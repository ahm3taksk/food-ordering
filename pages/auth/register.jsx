import Title from '../../components/ui/Title'
import Input from '../../components/form/Input'
import { useFormik } from 'formik';
import { registerSchema } from '../../schema/registerSchema';
import Link from 'next/link';

const Register = () => {

  const onSubmit = async (values, actions) => {
    await new Promise((resolve => setTimeout(resolve, 4000)));
    actions.resetForm();
  }

  const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    onSubmit,
    validationSchema: registerSchema,
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
            name: 'email',
            type: 'email',
            placeholder: 'Your Email Address',
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Your Password',
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password,
        },
        {
            id: 3,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword,
        },
    ]

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto'>
        <Title addClass={"text-[40px] mb-6"}>Register</Title>
        <div className='flex flex-col gap-y-2 w-full'>
          {inputs.map((input) => (
            <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur}/>
          ))}
        </div>
        <div className='flex flex-col w-full gap-y-3 mt-6'>
          <button className='btn-primary'>Register</button>
          <Link href='/auth/login' className='text-sm underline text-secondary'> Already have an account?</Link>
        </div>
      </form>
    </div>
  )
}

export default Register