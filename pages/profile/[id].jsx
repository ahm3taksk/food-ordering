import React from 'react'
import Image from 'next/image'
import Account from '../../components/profile/Account'
import Password from '../../components/profile/Password';
import Orders from '../../components/profile/Orders';
import { useRouter } from 'next/router';
import { signOut, getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = ({user}) => {
    const { data: session } = useSession();
    const { push } = useRouter();

    const [tabs, setTabs] = React.useState(0);

    const handleSignOut = () => {
        if(confirm("Are you sure you want to logout?")) {   
            signOut({redirect: false});
            session && push('/auth/login');
            toast.success('Logout Success');
        } else {
            toast.warning('Logout Cancelled');
        }
    }

    useEffect(() => {
        if (!session) {
            push("/auth/login");
        }
    }, [session, push]);

return (
    <div className='container mx-auto px-5 md:px-0'>
        <div className='flex flex-1 min-h-[calc(100vh_-_465px)] gap-x-10 md:flex-row flex-col'>
            <div className='w-full md:w-64'>
                <div className='relative flex flex-col items-center gap-y-1 p-10 border border-b-0'>
                    <Image src={user.image ? user.image : "/images/profile.png"} alt="" width={100} height={100} className='rounded-full'/>
                    <span className='font-bold text-xl text-center'>{user.fullName}</span>
                </div>
                <ul className='w-full font-semibold'>
                    <li onClick={() => setTabs(0)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-house"></i>
                        <button>Account</button>
                    </li>
                    <li onClick={() => setTabs(1)} className={`border border-t-0 w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-key"></i>
                        <button>Password</button>
                    </li>
                    <li onClick={() => setTabs(2)} className={`border border-t-0 w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <button>Orders</button>
                    </li>
                    <li onClick={handleSignOut} className='border border-t-0 w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all'>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
            {tabs === 0 && ( <Account user={user} /> )}
            {tabs === 1 && ( <Password user={user} /> )}
            {tabs === 2 && ( <Orders /> )}
        </div>
    </div>
)
}
export async function getServerSideProps({ req, params }) {
    const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
    );

    return {
        props: {
            user: user ? user.data : null,
        },
    };
}

export default Profile