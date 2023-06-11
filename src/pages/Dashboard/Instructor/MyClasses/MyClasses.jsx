import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UpdateMyClasses from './UpdateMyClasses/UpdateMyClasses';

const MyClasses = () => {
    const [modalShow, setModalShow] = useState({});
    const [control, setControl] = useState(false);

    const [axiosSecure] = useAxiosSecure();
    const { data: instructorClasses = [] } = useQuery(['instructorClasses'], async () => {
        const res = await axiosSecure.get('/instructors');
        return res.data;
    });

    const handleUpdateClasses = (data) => {
        console.log(data)
        fetch(`http://localhost:5000/updateMyClasses/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert('Data updated successfully');
                    setControl(!control);
                }
            });
    };

    const handleEditButtonClick = (itemId) => {
        setModalShow((prevState) => ({
            ...prevState,
            [itemId]: true,
        }));
    };

    return (
        <>
            <div className="w-full">
                <h3 className="text-center font-bold">My all Classes</h3>
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
                                <th>Total Enrolled Students</th>
                                <th>Action</th>
                                <th>Feedback</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructorClasses.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.className}</td>
                                    <td>
                                        <img className="w-10 h-10 rounded-sm" src={item.image} alt="class image" />
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.seats}</td>
                                    <td>{item.price}</td>
                                    <td>0</td>
                                    <td>{item.status}</td>
                                    {item.status !== 'pending' && item.status !== 'approve' ? (
                                        <td>{item?.feedback}</td>
                                    ) : null}
                                    <td>
                                        <button
                                            className="btn btn-warning bg-orange-200 hover:bg-orange-400"
                                            onClick={() => handleEditButtonClick(item._id)}
                                        >
                                            Update
                                        </button>
                                        {modalShow[item._id] && (
                                            <UpdateMyClasses
                                                show={modalShow[item._id]}
                                                onHide={() =>
                                                    setModalShow((prevState) => ({
                                                        ...prevState,
                                                        [item._id]: false,
                                                    }))
                                                }
                                                item={item}
                                                handleUpdateClasses={handleUpdateClasses}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyClasses;
