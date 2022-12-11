import {useEffect} from "react";
import {useAppSelector} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import AddQuestion from "../components/AddQuestion";

const Admin = () => {
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.users);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    return <AddQuestion />
}

export default Admin;