import React from 'react';

const ClassesCard = ({ classList }) => {
    // console.log(classList);
    const {image,className,name,seats,price,}= classList;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Instructor Image" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p><span className='text-orange-500 capitalize'>Class Name:</span>{className}</p>
                    <p><span className='text-orange-500 capitalize'>Instructor Name:</span>{name}</p>
                    <p><span className='text-orange-500 capitalize'> Available seats:</span>{seats}</p>
                    <p><span className='text-orange-500 capitalize'>Price:</span>{price}</p>

                </div>
            </div>
        </div>
    );
};

export default ClassesCard;