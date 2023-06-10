import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const { user,loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: isUsers, isLoading: isUsersLoading} = useQuery({
        queryKey:['isInstructor', user?.email],
        enabled:!loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users/default');
            return res.data;
        },
    })
    return [isUsers,isUsersLoading]
}
export default useAllUsers;