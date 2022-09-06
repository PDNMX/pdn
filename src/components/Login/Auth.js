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
        const user = await axios(options);
        //show greeting alert
        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: user
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
        url: `${process.env.REACT_APP_PDN_AUTH_URL}/user`
    };

    let user = null;

    try {
        user = await axios(options);
        console.log(user);
        return user;
    } catch (e){
        console.log(e);
        return null;
    }
}

const logOut  = async () => {
    const options = {
      method: 'POST',
      url:`${process.env.REACT_APP_PDN_AUTH_URL}/logout`
    };

    return null;
}

export {
    logIn,
    getUser,
    logOut
}
