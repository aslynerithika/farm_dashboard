import { Outlet } from "react-router-dom";
import NavHeader from '../AppComponenets/NavHeaderFolder/NavHeader.js';
import Footer from '../AppComponenets/FooterFolder/Footer.js';

function Layout(){
  return (
    <>
      <NavHeader></NavHeader>
      <Outlet />
      <Footer></Footer>
    </>
  )
};

export default Layout;