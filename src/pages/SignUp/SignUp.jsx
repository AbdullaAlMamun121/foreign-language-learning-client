import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { saveUserInDd } from '../../api/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, signInWithGoogle, loading, updateUserProfile } = useAuth();

    const passwordToggle = () => {
        setShowPassword(!showPassword);
    };

    const passwordValidation = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const onSubmit = info => {
        const name = info.name;
        const email = info.email;
        const password = info.password;
        const confirmPassword = info.confirmPassword;
        const photoURL = info.photoURL;

        if (passwordValidation(password, confirmPassword)) {
            createUser(email, password)
                .then(result => {
                    const signUpUser = result.user;
                    updateUserProfile(name, photoURL)
                        .then(() => {
                            console.log('user profile updated');
                            saveUserInDd(result.user);
                            alert('User created successfully');
                            navigate('/');
                        })
                        .catch(error => {
                            console.error(error.message);
                            alert(error.message);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('Do not match confirm password');
            alert('Passwords do not match');
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                saveUserInDd(result.user);
                alert('Sign Up success');
                navigate('/');
            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
                alert(err.message);
            });
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-100 text-blue-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-5 text-5xl font-semibold'>Sign Up Form</h1>
                    <p className='text-sm text-blue-500'>
                        Create an account using your credentials
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                User Name
                            </label>
                            <input
                                type='name'
                                name='name'
                                placeholder='Enter Your Name'
                                className='w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-blue-200 text-blue-900'
                                data-temp-mail-org='0'
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span>Name is required</span>}
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Enter Your Mail'
                                className='w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-blue-200 text-blue-900'
                                data-temp-mail-org='0'
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span>Email is required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter Your Password'
                                className='w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-blue-200 text-blue-900'
                                data-temp-mail-org='0'
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                })}
                            />
                            {errors.password && (
                                <span>
                                    Password should contain at least one capital letter, one special character, and be at least 6 digits long.
                                </span>
                            )}
                        </div>
                        <div className='w-1/4 flex flex-row items-center'>
                            <input
                                type='checkbox'
                                onChange={passwordToggle}
                                checked={showPassword}
                                className='rounded-sm border-gray-300 text-rose-500 focus:ring-rose-500 focus:ring-offset-0 focus:ring focus:ring-opacity-50'
                            />
                            <label htmlFor='showPassword' className='ml-2 text-sm text-blue-900 align-middle'>
                                Show 
                            </label>
                        </div>


                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='confirmPassword' className='text-sm mb-2'>
                                    Confirm Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='confirmPassword'
                                placeholder='Enter Confirm Password'
                                className='w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-blue-200 text-blue-900'
                                data-temp-mail-org='0'
                                {...register('confirmPassword', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                })}
                            />
                            {errors.confirmPassword && (
                                <span>
                                    Confirm Password should contain at least one capital letter, one special character, and be at least 6 digits long.
                                </span>
                            )}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='photoURL' className='text-sm mb-2'>
                                    Photo URL
                                </label>
                            </div>
                            <input
                                type='text'
                                name='photoURL'
                                placeholder='Enter Photo URL'
                                className='w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-blue-200 text-blue-900'
                                data-temp-mail-org='0'
                                {...register('photoURL', { required: true })}
                            />
                            {errors.photoURL && <span>Photo URL is required</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 hover:bg-rose-700 w-3/4 rounded-md py-3 text-white'
                        >
                            SignUp
                        </button>
                    </div>
                </form>

                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-blue-700'></div>
                    <p className='px-3 text-sm dark:text-blue-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-blue-700'></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border m-3 p-2 border-blue-300 border-rounded cursor-pointer'
                >
                    <FcGoogle size={32} />
                    <p>Continue with Google SignUp</p>
                </div>
                <p className='px-6 py-0 text-sm text-center text-blue-400'>
                    Don't have an account?
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-violet-400 text-blue-400'
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
