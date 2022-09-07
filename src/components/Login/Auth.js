import axios from 'axios';

const logIn = async (email, password) => {
    const options = {
        method: 'POST',
        data: {
            email,
            password
        },
        withCredentials: true,
        url: `${process.env.REACT_APP_PDN_AUTH_URL}/login`
    }

    try {
        // Get session data
        const res = await axios(options);
        //show greeting alert
        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: res.data
        }
    } catch (e){
        return {
            success: false,
            message: e.message
        }
    }
}

const getUser = async () => {

    const options = {
        method: 'POST',
        withCredentials: true,
        url: `${process.env.REACT_APP_PDN_AUTH_URL}/user`
    };

    try {
        const res = await axios(options);
        console.log(res.data);
        return res.data;
    } catch (e){
        console.log(e);
        return null;
    }
}

const logOut  = async () => {
    const options = {
        method: 'POST',
        withCredentials: true,
        url:`${process.env.REACT_APP_PDN_AUTH_URL}/logout`
    };

    try {
        return await axios(options);
    } catch(e){
        console.log(e);
        return null;
    }
}

export {
    logIn,
    getUser,
    logOut
}
