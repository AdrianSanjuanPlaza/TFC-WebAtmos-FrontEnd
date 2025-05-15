import Swal from "sweetalert2";
import storage from './Storage/storage'

export const show_alerta = (msj,icon) =>{
    Swal.fire({title:msj, icon:icon})
}

import axios from "axios";


export const sendRequest = async (method, params, url, redir = '', token = true, mensaje = '') => {
    let res;
    try {
        if (token) {
            console.log("1")
            const authToken = storage.get('authToken');  // Obtener el token desde el almacenamiento
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
            console.log("2")
        }
        const urlCompleta = import.meta.env.VITE_BASE_URL_BACKEND + url
        console.log("3")
        console.log(method)
        console.log(urlCompleta);
        console.log(params);
        
        
        // Realiza la solicitud
        const response = await axios({
            method: method,
            url: urlCompleta,
            data: params
        });
        console.log("4")

        console.log(response)

        res = response.data;
        if (method !== 'GET') {
            show_alerta(mensaje, 'success');
        }

        // Redirige si es necesario
        setTimeout(() => {
            if (redir !== '') {
                window.location.href = redir;
            }
        }, 2000);

    } catch (errors) {
        let desc = '';
        
        console.log(url)
        console.log(errors)        

        if(url && errors.response && errors.response.status === 400){
            res = { solicitudes: []}
            return res
        }

        res = errors.response.data;
    
        // Verifica si `errors.response.data.errors` es un array antes de llamar a `.map()`
        if (Array.isArray(errors.response.data.errors)) {
            errors.response.data.errors.forEach((e) => {
                desc = desc + ' ' + e;
            });
        } else {
            // Si no es un array, agrega un mensaje de error genérico
            desc = 'Error desconocido o formato de error inesperado.';
        }
    
        show_alerta(desc, 'error');
    }
    
    return res;
};

export const confirmation = (id, url, redir) => {
    return new Promise((resolve) => {
        const alert = Swal.mixin({ buttonStyling: true });
        alert.fire({
            title: 'Estás seguro de eliminar esta solicitud?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE', id, url, redir, true, "");
                // window.location.reload();
                resolve(true);  // Devuelve true si el usuario confirma
            } else {
                resolve(false); // Devuelve false si el usuario cancela
            }
        });
    });
};


export default sendRequest;