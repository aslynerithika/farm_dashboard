import { Outlet } from "react-router-dom";
import NavHeader from '../AppComponenets/NavHeaderFolder/NavHeader.js';

function Layout(){
  return (
    <>
      <NavHeader></NavHeader>

      <Outlet />
    </>
  )
};

export default Layout;