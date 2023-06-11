import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

// TODO:Provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const price = parseFloat(parseFloat(searchParams.get('price')).toFixed(2));
    const seats = parseInt(searchParams.get('seats'))
    // console.log(typeof(price))
    
    return (
        <div className='w-full'>
            <h3 className='text-center text-5xl text-violet-500 font-bold mb-4'>Pay First</h3>
            <hr />
            <p className='text-center text-2xl text-blue-700 font-bold'>Your Price: {price}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} seats={seats}></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;