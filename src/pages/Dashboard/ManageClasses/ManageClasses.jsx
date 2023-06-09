import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        console.log(res.data)
        return res.data;
    })
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
                                <th>Action</th>
                                <th>Action</th>
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
                                    <td>approved</td>
                                    <td>denied</td>
                                    <td>FeedBack: <input type='textarea'/></td> 
                                    

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