import React from 'react';
import useAuth from '../../hooks/useAuth';

const InstructorCard = ({ instructor }) => {

    const { photoURL, name, email } = instructor;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={photoURL} alt="Instructor Image" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p><span className='text-orange-500 uppercase'>Instructor Name:</span>{name}</p>
                    <p><span className='text-orange-500 uppercase'>Instructor Email:</span>{email}</p>

                </div>
            </div>
        </div>
    );
};

export default InstructorCard;