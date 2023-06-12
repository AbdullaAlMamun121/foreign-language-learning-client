import React from 'react';
import InstructorCard from './InstructorCard';
import useInstructorList from '../../hooks/useInstructorList';

const DisplayInstructor = () => {
 

    const [instructors]=useInstructorList();

    return (
        <div>
            <h3 className='text-5xl text-center font-semibold capitalize'>Display all instructor</h3>
           
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
              {
                instructors.map(instructor=><InstructorCard key={instructor._id} instructor={instructor}>

                </InstructorCard>)
              }
            </div>
        </div>
    );
};

export default DisplayInstructor;