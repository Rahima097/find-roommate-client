import { Outlet } from 'react-router';
import Header from '../Components/Header';
import Footer from './../Components/Footer';
import { ToastContainer } from 'react-toastify';

const homeLayout = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <ToastContainer />
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default homeLayout;