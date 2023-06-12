import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import './CheckoutForm.css';
const CheckoutForm = ({ price, seats, itemId,email }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0 && seats > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        console.log('card', card);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);

        }
        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.email || 'unknown',
                        name: user?.displayName || 'unknown'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
            // setCardError(confirmError.message)
        }
        console.log('payment intent', paymentIntent)
        setProcessing(false);
        if (paymentIntent.status === 'succeeded') {
            const updatedSeats = seats - 1;
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                selerEmail:email,
                transactionId: paymentIntent.id,
                date: new Date(),
                seats: updatedSeats,
                status: 'pending',
                price,
                itemId,
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        alert('payment success')
                    }
                })

        }
    }

    return (
        <>
            <form className='w-2/3 m-10' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-active btn-primary btn-sm mt-5  text-center' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Final Payment
                </button>
            </form>
            {cardError && <p className='text-red-800 ml-10'>{cardError}</p>}
            {transactionId && <p className='text-green-400 ml-10'>Transaction Complete & Your Id:{transactionId}</p>}
        </>
    );
};

export default CheckoutForm;