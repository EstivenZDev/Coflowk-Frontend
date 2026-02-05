import axios from "axios";


export const login = async (email:string,password:string) => {
    const res = await axios.post("http://localhost:3000/api/login",{
        email,
        password
    }, {withCredentials: true})
    return res
}

export const logout = async () => {
    const res = await axios.post("http://localhost:3000/api/logout",{},{
        withCredentials: true
    })
    return res
}