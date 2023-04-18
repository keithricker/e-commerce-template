import React,{useEffect} from "react";
import Directory from "../../components/directory/directory.component";
import { useSelector,useDispatch } from "react-redux";
import { shopThunks } from "../../store/redux/shop/shop-slice";
import { Spinner } from "../../components/ui/loading/loading.component";
import './homepage.styles.scss';

const HomePage = () => {
    const dispatch = useDispatch()
    const sections = useSelector(state => state.shop.sections)
    useEffect(() => {
        dispatch(shopThunks.fetchSections())
    },[dispatch])
    return (
        <div className="homepage">
            {
                sections ? <Directory /> : <Spinner />
            }
        </div>
    )
};

export default HomePage; 