import { Outlet } from 'react-router';
import Header from '../Components/Header';

const homeLayout = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default homeLayout;