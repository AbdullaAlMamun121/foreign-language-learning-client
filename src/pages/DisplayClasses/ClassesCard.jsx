import React, { useEffect, useState } from 'react';
import useAllUsers from '../../hooks/useAllUsers';
import useAuth from '../../hooks/useAuth';

const ClassesCard = ({ classList }) => {
    const [userRole, setUserRole] = useState([]);
    const [isUsers, isUsersLoading] = useAllUsers();
    const { user } = useAuth();

    useEffect(() => {
        if (isUsers) {
            const loggedInUserRole = isUsers.find(u => u.email === user?.email)?.role;
            setUserRole(loggedInUserRole ? [loggedInUserRole] : []);
        }
    }, [isUsers, user]);

    console.log(userRole);

    const { image, className, name, seats, price } = classList;

    return (
        <div>
            <div className={`card shadow-xl ${seats === 0 ? 'bg-red-500' : 'bg-base-100'}`}>
                <figure className="px-10 pt-10">
                    <img src={image} alt="Instructor Image" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p>
                        <span className="text-orange-500 capitalize">Class Name:</span>
                        {className}
                    </p>
                    <p>
                        <span className="text-orange-500 capitalize">Instructor Name:</span>
                        {name}
                    </p>
                    <p>
                        <span className="text-orange-500 capitalize">Available seats:</span>
                        {seats}
                    </p>
                    <p>
                        <span className="text-orange-500 capitalize">Price:</span>
                        {price}
                    </p>

                    <button
                        disabled={(userRole[0] === 'admin' || userRole[0] === 'instructor') || seats === 0}
                        className="btn btn-outline btn-accent"
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;
