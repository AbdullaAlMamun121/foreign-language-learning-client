import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useInstructorList = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [], isLoading: instructorLoading } = useQuery(['instructors'], async () => {
        const res = await axiosSecure.get('/instructor/list')
        console.log(res.data);
        return res.data;
    })
    return [instructors,instructorLoading]
}
export default useInstructorList;