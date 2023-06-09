import { FcGoogle } from 'react-icons/fc'
import { ImSpinner6 } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { saveUserInDd } from '../../api/auth';



const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const passwordToggle = () => {
        setShowPassword(!showPassword);
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, signInWithGoogle, loading,
        setLoading, updateUserProfile } = useAuth();

    // confirm password validation
    const passwordValidation = (password, confirmPassword) => {
        return password == confirmPassword;
    }
    const onSubmit = info => {
        const name = info.name;
        const email = info.email;
        const password = info.password;
        const confirmPassword = info.confirmPassword;
        const photoURL = info.photoURL;
        if (passwordValidation(password, confirmPassword)) {
            createUser(email, password).then(result => {
                const signUpUser = result.user;
                updateUserProfile(name, photoURL).then(() => {
                    console.log('user profile updated');
                    saveUserInDd(result.user);
                    alert('User created successful')
                    navigate('/');
                }).catch(error => {
                    console.error(error.message);
                    alert(error.message)
                })
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log('Do not match confirm password');
            alert('Do not match confirm password');

        }
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
            saveUserInDd(result.user);
            alert('Sing Up success')
            navigate('/')
        }).catch(err => {
            setLoading(false);
            console.log(err.message);
            alert(err.message);
        })
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-green-100 text-green-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-5 text-5xl font-semibold'>SignUp Form</h1>
                    <p className='text-sm text-green-500'>
                        Login account using your credentials
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                User Name
                            </label>
                            <input type='name'
                                name='name'
                                placeholder='Enter Your Name'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-green-200 text-green-900'
                                data-temp-mail-org='0'
                                {...register("name", { required: true })} />
                            {errors.name && <span>Name is required</span>}
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email Address
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
                                {...register("password", { required: true, minLength: 6 }, {
                                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                                })} />
                            {errors.password && <span>Password should contain at least one capital letter and one special character and 6 digitPassword is required</span>}
                        </div>
                        <div className='flex flex-row items-center '>
                            <input type='checkbox'
                                onChange={passwordToggle}
                                checked={showPassword}
                            />
                            <label htmlFor='showPassword' className='ml-2 text-sm text-center'>Show Password</label>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='confirmPassword' className='text-sm mb-2'>
                                    Confirm Password
                                </label>
                            </div>
                            <input type='password'
                                name='confirmPassword'
                                placeholder='Enter Confirm Password'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-green-200 text-green-900'
                                data-temp-mail-org='0'
                                {...register("confirmPassword", { required: true, minLength: 6 }, {
                                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                                })} />
                            {errors.confirmPassword && <span>Confirm Password should contain at least one capital letter and one special character and 6 digit</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='photoURL' className='text-sm mb-2'>
                                    Photo URL
                                </label>
                            </div>
                            <input type='text'
                                name='photoURL'
                                placeholder='Enter Photo URL'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-green-200 text-green-900'
                                data-temp-mail-org='0'
                                {...register("photoURL", { required: true })} />
                            {errors.photoURL && <span>photoURL is required</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-950 w-full rounded-md py-3 text-white'
                        >
                            {loading ? <ImSpinner6 className='m-auto animate-spin' size={22}></ImSpinner6> : 'SignUp'}
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

                    <p>Continue with Google SignUp</p>
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

export default SignUp;