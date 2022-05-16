import axios from "axios";

const email = localStorage.getItem('email')

export const savedCode = async() => {
    const {data} = await axios.post(`https://reactmarkeditor.herokuapp.com/saved/saved/code`,{email});
    // console.log(data);
    return data;
}