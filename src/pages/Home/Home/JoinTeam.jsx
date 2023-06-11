import React from 'react';

const JoinTeam = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Join Our Language Learning Community</h2>
            <p className="text-gray-500 mb-8 text-center">Connect with fellow language learners and practice your skills together.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Language Forums</h3>
                    <p className="text-gray-600">Engage in discussions, ask questions, and share language learning experiences in our language forums.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Virtual Language Exchanges</h3>
                    <p className="text-gray-600">Participate in virtual language exchange sessions with native speakers of your target language.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Language Challenges</h3>
                    <p className="text-gray-600">Take part in fun language challenges to improve your skills and earn badges and rewards.</p>
                </div>
            </div>
        </div>

    );
};

export default JoinTeam;