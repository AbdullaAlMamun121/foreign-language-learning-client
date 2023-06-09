import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FcApproval, FcDisapprove } from 'react-icons/fc';

const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        console.log(res.data)
        return res.data;
    })
    const token = localStorage.getItem('access-token');
    const handleUpdateStatus = async (status, id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:5000/instructors/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                     authorization: `bearer ${token}`
                },
                body: JSON.stringify({ status })
            })
            const data = await response.json();
            refetch();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='w-full'>
                <h3 className="text-center font-bold">Users Classes</h3>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Class Name</th>
                                <th>Picture</th>
                                <th>Email</th>
                                <th>Seats</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Approved</th>
                                <th>Denied</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.className}</td>
                                    <td> <img className='w-10 h-10 rounded-sm' src={item.image} alt="class image" /> </td>
                                    <td>{item.email}</td>
                                    <td>{item.seats}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>

                                    <td>
                                        {item.status !== 'approved' ? (<button onClick={() => handleUpdateStatus('approved', item._id)} className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><FcApproval></FcApproval></button>) : (
                                            'approved'
                                        )}
                                    </td>
                                    <td>
                                        {item.status !== 'denied' ? (<button onClick={() => handleUpdateStatus('denied',  item._id)} className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><FcDisapprove></FcDisapprove></button>) : (
                                            'denied'
                                        )}
                                    </td>

                                    <td><input type="textarea" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
                                    </td>


                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default ManageClasses;