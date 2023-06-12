import React, { useEffect, useState } from 'react';

const PopularClasses = () => {
    const [topClasses, setTopClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/payments');
                const data = await response.json();
                const items = data;

                // Count the number of payments for each class
                const classMap = new Map();
                items.forEach((item) => {
                    const itemId = item.itemId;
                    if (classMap.has(itemId)) {
                        classMap.set(itemId, classMap.get(itemId) + 1);
                    } else {
                        classMap.set(itemId, 1);
                    }
                });

                // Sort the classes based on the number of payments
                const sortedClasses = Array.from(classMap.entries()).sort((a, b) => b[1] - a[1]);

                // Get the top classes
                const topClasses = sortedClasses.slice(0, 6).map(([itemId, paymentCount]) => {
                    const classItem = items.find((item) => item.itemId === itemId);
                    return {
                        className: classItem.className,
                        email: classItem.email,
                        image: classItem.image,
                        instructorImage: classItem.instructorImage,
                        price: classItem.price,
                        seats: classItem.seats,
                    };
                });

                setTopClasses(topClasses);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {topClasses.map((classItem, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body flex flex-col items-center">
                            <h2 className="card-title text-xl font-bold mb-2">{classItem.className}</h2>
                            <img src={classItem.image} alt="" className="w-48 h-48 object-cover mb-4" />
                            <p className="mb-2">Available Seats: {classItem.seats}</p>
                            <p className="mb-4">Product Price: {classItem.price}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
