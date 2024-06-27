"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';


/*sconst dataa = [
    { libro: "El Quijote", autor: "Miguel de Cervantes", totalVentas: 1500 },
    { libro: "Cien Años de Soledad", autor: "Gabriel García Márquez", totalVentas: 1200 },
    { libro: "La Sombra del Viento", autor: "Carlos Ruiz Zafón", totalVentas: 900 },
    { libro: "Donde los Árboles Cantan", autor: "Laura Gallego", totalVentas: 800 },
    { libro: "El Principito", autor: "Antoine de Saint-Exupéry", totalVentas: 750 },
    { libro: "1984", autor: "George Orwell", totalVentas: 650 },
    { libro: "Fahrenheit 451", autor: "Ray Bradbury", totalVentas: 600 },
    { libro: "La Ciudad y los Perros", autor: "Mario Vargas Llosa", totalVentas: 550 },
    { libro: "La Casa de los Espíritus", autor: "Isabel Allende", totalVentas: 500 },
    { libro: "Crónica de una Muerte Anunciada", autor: "Gabriel García Márquez", totalVentas: 450 }
];*/

const Reportes = () => {

    const [chartData, setChartData] = useState(null);

    const obtenerGraficos = async () => {
        try {
            const response = await handleAxios().get('/reporte/top-libros'); //TODO:  modificar endpoint http://localhost:5000/api/reporte/top-libros
            //const data = dataa;

            console.log('el status es ' +response.status);

            const libros = response.data.data.topLibros.map(item => item.libro);
            const totalVentas = response.data.data.topLibros.map(item => item.totalVentas);

            setChartData({
                labels: libros,
                datasets: [
                    {
                        label: 'Total Ventas',
                        data: totalVentas,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });

        } catch (error) {
            handleAxiosError(error)
        }

    }

    useEffect(() => {
        obtenerGraficos()
    }, []);

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h2>Top Libros</h2>
                <Bar data={chartData} />
            </div>
        </div>
    );
}

export default Reportes;