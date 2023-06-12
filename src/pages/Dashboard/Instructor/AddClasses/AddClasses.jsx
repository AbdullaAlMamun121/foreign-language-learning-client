import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useAuth();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(imgRes => {
            if (imgRes.success) {
                const imageURL = imgRes.data.display_url;
                const instructorImage = user?.photoURL; 
                const { className, email, name, price, seats } = data;
                const newItems = { className, email, name, price: parseFloat(price), seats: parseInt(seats), image: imageURL,instructorImage };
                axiosSecure.post('/instructors', newItems).then(data => {
                    if (data.data.insertedId) {
                        reset();
                        alert('Data uploaded successfully');
                    }
                })
            }
        })

    };

    return (
        <div className="w-full">
            <h3 className='text-center font-bold mb-4'>Add Classes</h3>
            <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="block mb-1">Class Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('className', { required: true })} />
                    {errors.className && <span className="text-danger">Class name field is required</span>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Image</label>
                    <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('image', { required: true })} />
                    {errors.image && <span className="text-danger">Image is required</span>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Instructor Name</label>
                    <input defaultValue={user?.displayName} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('name', { required: true })} />
                    {errors.name && <span className="text-danger">Name is required</span>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Instructor Email</label>
                    <input defaultValue={user?.email} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('email', { required: true })} />
                    {errors.email && <span className="text-danger">Email field is required</span>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Price</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('price', { required: true })} />
                    {errors.price && <span className="text-danger">This field is required</span>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Seats</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('seats', { required: true })} />
                    {errors.seats && <span className="text-danger">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary w-full py-2 mt-4">Add Classes</button>
            </form>
        </div>

    );
};

export default AddClasses;