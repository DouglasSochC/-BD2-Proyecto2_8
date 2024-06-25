'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faUserPen, faClockRotateLeft, faBookOpen, faBook } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
        { title: "Autor", link: "/dashboard_admin/autor", icon: faUserPen },
        { title: "Libros", link: "/dashboard_admin/libros", icon: faBook },
        { title: "Historial", link: "/dashboard_admin/historial", icon: faClockRotateLeft },
        { title: "Reportes", link: "/dashboard_admin/reportes", icon: faBookOpen }
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}