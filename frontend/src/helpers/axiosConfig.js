import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

export const handleAxiosMsg = (response, icon_response = "success") => {
    return new Promise((resolve) => {
        const Toast = MySwal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
                resolve();
            }
        });
        Toast.fire({
            icon: icon_response,
            title: "Hecho",
            text: response
        });
    });
}

export const handleAxiosError = (error) => {
    MySwal.fire({
        title: 'Aviso',
        html: error.response.data.message,
        icon: 'warning'
    });
};

export const handleSwal = () => {
    return MySwal;
}

export const handleAxios = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios;
};