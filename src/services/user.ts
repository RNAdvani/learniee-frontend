import axios from 'axios';
export const getUser = async (_id:string)=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/user/userInfo/${_id}`,{
            withCredentials: true,
        })
        return response.data.user
    } catch (error) {
        console.log(error)
        return null
    }
}

const headers = {
    'Content-Type': 'application/json',
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
}

export const registerUser = async (name:string, email:string, username:string, password:string)=>{
    try {
        const user =  await axios.post(`http://localhost:5000/api/user/register`,{
            name,
            email,
            username,
            password
        },{
            headers,
            withCredentials: true
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}