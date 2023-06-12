import { FcGoogle } from 'react-icons/fc';
import { ImSpinner6 } from 'react-icons/im';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { saveUserInDd } from '../../api/auth';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { loading, setLoading, signIn, signInWithGoogle } = useAuth();
    const location = useLocation();
    const from = location?.state?.from.pathname || '/';

    // show password
    const passwordToggle = () => {
        setShowPassword(!showPassword);
    };

    // user login by email & password
    const onSubmit = (info) => {
        console.log(info);
        const email = info.email;
        const password = info.password;
        signIn(email, password)
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                alert('Login successful');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };

    // user login by google
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        setLoading(true); // Set loading to true
        signInWithGoogle()
            .then((result) => {
                saveUserInDd(result.user);
                alert('Login successful');
                setLoading(false);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-5 text-5xl font-semibold">Login Form</h1>
                    <p className="text-sm text-gray-500">Login account using your credentials</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Mail"
                                className="w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-800"
                                data-temp-mail-org="0"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span>Email is required</span>}
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm mb-2">
                                    Password
                                </label>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter Your Mail"
                                className="w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-800"
                                data-temp-mail-org="0"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <span>Password is required</span>}
                        </div>
                        <div className="w-1/4 flex flex-row items-center">
                            <label htmlFor="showPassword" className="ml-2 text-sm text-blue-900 align-middle">
                                Show
                            </label>
                            <input type="checkbox" onChange={passwordToggle} checked={showPassword} />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-rose-500 w-3/4 rounded-md text-white flex items-center justify-center"
                        >
                            {!loading ? (
                                <ImSpinner6 className="animate-spin" size={22} />
                            ) : (
                                ' Login'
                            )}
                        </button>
                    </div>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-400">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className="flex justify-center items-center space-x-2 border m-3 p-2 border-green-300 border-rounded cursor-pointer"
                >
                    <FcGoogle size={32} />
                    <p>Continue with Google login</p>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="hover:underline hover:text-violet-400 text-gray-400"
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
