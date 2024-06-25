import Cookies from 'js-cookie';

export const crearSession = (data) => {
    Cookies.set('auth', JSON.stringify(data), { expires: 1 / 24 });
};

export const cerrarSesion = () => {
    Cookies.remove('auth');
};

export const obtenerDatosUsuario = () => {
    return JSON.parse(Cookies.get('auth'));
};
