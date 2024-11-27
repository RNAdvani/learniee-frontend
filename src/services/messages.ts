import axios from "axios";

export const getMessages = async (receiver_id: string) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/messages/m/${receiver_id}`,{
            withCredentials: true,
        });
        return res.data.messages;
    } catch (error) {
        console.log(error);
        return null;
    }
    };