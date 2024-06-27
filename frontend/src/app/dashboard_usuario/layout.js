'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faClockRotateLeft, faAddressBook, faShoppingCart, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
        { title: "Catalogo Autores", link: "/dashboard_usuario/autor_catalogo", icon: faAddressBook },
        { title: "Catalogo Libro", link: "/dashboard_usuario/libro_catalogo", icon: faBookOpenReader },
        { title: "Historial", link: "/dashboard_usuario/historial", icon: faClockRotateLeft },
        { title: "Carrito", link: "/dashboard_usuario/carrito", icon: faShoppingCart },
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}