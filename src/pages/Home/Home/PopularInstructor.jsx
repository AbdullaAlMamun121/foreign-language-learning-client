import React, { useEffect, useState } from 'react';

function App() {
    const [topInstructors, setTopInstructors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://foreign-language-learning-server.vercel.app/payments');
                const data = await response.json();
                const items = data;

                // Count the number of payments for each instructor
                const instructorsMap = new Map();
                items.forEach((item) => {
                    const instructorId = item.instructorId;
                    if (instructorsMap.has(instructorId)) {
                        instructorsMap.set(instructorId, instructorsMap.get(instructorId) + 1);
                    } else {
                        instructorsMap.set(instructorId, 1);
                    }
                });

                // Sort the instructors based on the number of payments
                const sortedInstructors = Array.from(instructorsMap.entries()).sort(
                    (a, b) => b[1] - a[1]
                );

                // Get the top instructors
                const topInstructors = sortedInstructors
                    .slice(0, 6)
                    .map(([instructorId, paymentCount]) => {
                        const instructor = items.find((item) => item.instructorId === instructorId);
                        return {
                            instructorId: instructor.instructorId,
                            instructorName: instructor.instructorName,
                            paymentCount: paymentCount,
                            instructorImage: instructor.instructorImage,
                            className: instructor.className,
                            email: instructor.email,
                            price: instructor.price,
                            seats: instructor.seats,
                        };
                    });

                setTopInstructors(topInstructors);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 mt-5 text-center">Popular Instructors</h2>
            {topInstructors.map((instructor, index) => (
                <div key={index} className="card w-96 bg-base-100 shadow-xl mb-4">
                    <div className="card-body items-center text-center">
                        <p>
                         <img src={instructor.instructorImage} alt="instructor image" />
                        </p>
                        <p>Class Name: {instructor.className}</p>
                        <p>Email: {instructor.email}</p>
                        <p>Instructor Image: {instructor.instructorImage}</p>
                        <p>Price: {instructor.price}</p>
                        <p>Seats: {instructor.seats}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
