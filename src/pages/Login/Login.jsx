import { FcGoogle } from 'react-icons/fc'
import { ImSpinner6 } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { saveUserInDd } from '../../api/auth';

const Login = () => {
   const [showPassword,setShowPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { loading, setLoading, signIn, signInWithGoogle } = useAuth();
    const location = useLocation();
    const from = location?.state?.from.pathname || '/';


    // show password 
    const passwordToggle =()=>{
        setShowPassword(!showPassword);
    }

    // user login by email & password
    const onSubmit = info => {
        console.log(info);
        const email = info.email;
        const password = info.password;
        signIn(email, password).then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            toast.message('Login success');
            navigate(from, { replace: true });
        }).catch(error => {
            console.log(error.message);
            toast.error(error.message)
        })

    };

    // user login by google
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
            saveUserInDd(result.user);
            navigate(from, { replace: true })
        }).catch(err => {
            setLoading(false);
            console.log(err.message);
            toast.error(err.message);
        })
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-green-100 text-green-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-5 text-5xl font-semibold'>Login Form</h1>
                    <p className='text-sm text-green-500'>
                        Login account using your credentials
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input type='email'
                                name='email'
                                placeholder='Enter Your Mail'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-green-200 text-green-900'
                                data-temp-mail-org='0'
                                {...register("email", { required: true })} />
                            {errors.email && <span>Email is required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter Your Mail'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-green-200 text-green-900'
                                data-temp-mail-org='0'
                                {...register("password", { required: true })} />
                            {errors.password && <span>Password is required</span>}
                        </div>
                        <div className='flex flex-row items-center '>
                            <input type='checkbox'
                                onChange={passwordToggle}
                                checked={showPassword}
                            />
                            <label htmlFor='showPassword' className='ml-2 text-sm text-center'>Show Password</label>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-950 w-full rounded-md py-3 text-white'
                        >
                            {loading ? <ImSpinner6 className='m-auto animate-spin' size={22}></ImSpinner6> : ' Login'}
                        </button>
                    </div>
                </form>

                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-green-700'></div>
                    <p className='px-3 text-sm dark:text-green-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-green-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-green-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google login</p>
                </div>
                <p className='px-6 text-sm text-center text-green-400'>
                    Don't have an account?
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-violet-400 text-green-400'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;