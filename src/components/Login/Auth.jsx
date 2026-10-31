import axios from 'axios'

const authUrl = process.env.REACT_APP_PDN_AUTH_URL

const logIn = async (email, password) => {
  if (!authUrl) {
    return {
      success: false,
      message: 'El servicio de autenticación no está configurado'
    }
  }

  const options = {
    method: 'POST',
    data: {
      email,
      password
    },
    withCredentials: true,
    url: `${authUrl}/login`
  }

  try {
    // Get session data
    const res = await axios(options)
    // show greeting alert
    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: res.data
    }
  } catch (e) {
    return {
      success: false,
      message: e.message
    }
  }
}

const getUser = async () => {
  if (!authUrl) return null

  const options = {
    method: 'POST',
    withCredentials: true,
    url: `${authUrl}/user`
  }

  try {
    const res = await axios(options)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    return null
  }
}

const logOut = async () => {
  if (!authUrl) return null

  const options = {
    method: 'POST',
    withCredentials: true,
    url: `${authUrl}/logout`
  }

  try {
    return await axios(options)
  } catch (e) {
    console.log(e)
    return null
  }
}

export {
  logIn,
  getUser,
  logOut
}
