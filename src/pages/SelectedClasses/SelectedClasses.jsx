import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdAutoDelete, MdPayments } from 'react-icons/md'
const SelectedClasses = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [] } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get('/selectedClass')
        return res.data;
    })
    return (
        <div className='w-full'>
            <h3 className="text-center font-bold">Users Classes</h3>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Email</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Delete</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((selectedItem, index) => <tr key={selectedItem._id}>
                                <th>{index + 1}</th>
                                <td>{selectedItem.className}</td>
                                <td>{selectedItem.instructorEmail}</td>
                                <td>{selectedItem.name}</td>
                                <td>{selectedItem.price}</td>
                                <td>{selectedItem.seats}</td>
                                <td>
                                    <button className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><MdAutoDelete></MdAutoDelete></button>
                                </td>
                                <td>
                                    <button className='p-4 text-4xl rounded-2xl bg-orange-200 hover:bg-orange-400'><MdPayments></MdPayments></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;