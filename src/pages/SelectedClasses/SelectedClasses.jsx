
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdAutoDelete, MdPayments } from 'react-icons/md'
import { Link } from 'react-router-dom';
const SelectedClasses = () => {


    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], isLoading: loading, refetch } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get('/selectedClass')
        // res.data.map(item => {
        //     setTotalPrice(item.price)
        // })
        return res.data;
    })


    const handleDeleteItem = id => {

        axiosSecure.delete(`/selectedClass/${id}`).then(res => {
            if (res.data.deletedCount > 0) {
                alert('Deleted successfully');
                refetch();
            }
        }).catch(error => {
            alert(error.message);
        })
    }


    return (
        <div className='w-100'>
            <h3 className="text-center text-3xl font-bold mb-4">Your Selected Classes</h3>
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
                                    <button onClick={() => handleDeleteItem(selectedItem._id)} className=' text-2xl rounded-2xl bg-orange-200 hover:bg-orange-400'><MdAutoDelete></MdAutoDelete></button>
                                </td>
                                <td>
                                    {/* payment button */}
                                    <Link to={`/dashboard/payment?price=${selectedItem.price}&seats=${selectedItem.seats}`}>
                                        <button className=' text-2xl rounded-2xl bg-orange-200 hover:bg-orange-400'>
                                            <MdPayments />
                                        </button>
                                    </Link>
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