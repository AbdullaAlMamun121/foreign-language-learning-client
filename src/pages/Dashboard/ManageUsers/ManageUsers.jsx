import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const ManageUsers = () => {

    const [axiosSecure] = useAxiosSecure();

    const token = localStorage.getItem('access-token');
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure('/users')
        return res.data;
    })


    const handleUpdateRole = async (role, user) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${user._id}/role`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                     authorization: `bearer ${token}`

                },
                body: JSON.stringify({ role })
            });
            const data = await response.json();
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full'>
            <h3 className="text-center font-bold">Manage users</h3>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role !== 'admin' ? (<button onClick={() => handleUpdateRole('admin', user)} className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><MdAdminPanelSettings></MdAdminPanelSettings></button>) : (
                                        'admin'
                                    )}
                                </td>
                                <td>
                                    {user.role !== 'instructor' ? (<button onClick={() => handleUpdateRole('instructor', user)} className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><MdAdminPanelSettings></MdAdminPanelSettings></button>) : (
                                        'instructor'
                                    )}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;