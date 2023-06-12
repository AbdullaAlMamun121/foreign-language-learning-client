import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Link, useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const price = parseFloat(parseFloat(searchParams.get('price')).toFixed(2));
    const seats = parseInt(searchParams.get('seats'))
    const itemId = searchParams.get('itemId');
    const email = searchParams.get('email');
    // console.log(typeof(price))

    return (
        <>

            <div className='w-full'>
                <h3 className='text-center text-5xl text-violet-500 font-bold mb-4'>Pay First</h3>
                <hr />
                <p className='text-center text-2xl text-blue-700 font-bold'>Your Price: {price}</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} seats={seats} itemId={itemId} email={email}></CheckoutForm>
                </Elements>

            </div>
            <Link to="/dashboard/selectedClasses">
                <button className=' text-2xl rounded-2xl bg-orange-200 hover:bg-orange-400'>
                    Go Back
                </button>
            </Link>
        </>
    );
};

export default Payment;