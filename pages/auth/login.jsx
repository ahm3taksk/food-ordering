import Title from '../../components/ui/Title'
import Input from '../../components/form/Input'
import Link from 'next/link';
import { useFormik } from 'formik';
import { loginSchema } from '../../schema/loginSchema';
import { useRouter } from 'next/router';
import { signIn, getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {
  const { data: session } = useSession();
  const { push } = useRouter()
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn("credentials", options);
      actions.resetForm();
      toast.success('Login Success');
      if (res.status === 200) {
        push('/profile/' + currentUser._id);
      }else{
        toast.error('Login Failed');
      }
    } catch (err) {
      toast.error(err.error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const user = res.data.find((user) => user.email === session?.user.email);
        if (user) {
          setCurrentUser(user);
          push('/profile/' + user._id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (session) {
        getUser();
    }
}, [session, push]);

  const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    onSubmit,
    validationSchema: loginSchema,
  });
  
  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Your Email Address',
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
  },
    {
        id: 2,
        name: 'password',
        type: 'password',
        placeholder: 'Your Password',
        value: values.password,
        errorMessage: errors.password,
        touched: touched.password,
    },
  ]

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto'>
        <Title addClass={"text-[40px] mb-6"}>Login</Title>
        <div className='flex flex-col gap-y-2 w-full'>
          {inputs.map((input) => (
            <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur}/>
          ))}
        </div>
        <div className='flex flex-col w-full gap-y-3 mt-6'>
          <button type='submit' className='btn-primary'>Login</button>
          <button onClick={() => signIn("github")} type='button' className='btn-primary !bg-secondary'><i class="fa-brands fa-github"></i> Github</button>
          <Link href='/auth/register' className='text-sm underline text-secondary'> Do not have an account?</Link>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({req})

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);

  if(session && user){
    return {
      redirect: {
        destination: '/profile/' + user._id,
        permanent: false,
      }
    } 
  }

  return {
      props: {},
  }
}

export default Login