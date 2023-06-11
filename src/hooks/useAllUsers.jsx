import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const { data: isUsers, isLoading: isUsersLoading } = useQuery({
        queryKey: ['isInstructor', user?.email],
        // enabled:!loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users/default');
                console.error('User response:', res.data);
                return res?.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }

        },
    })
    return [isUsers, isUsersLoading]
}
export default useAllUsers;