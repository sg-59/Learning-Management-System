import axios from "axios"
export const BatchandDays=async(day)=>{
    try{
const response=await axios.get(`https://futuralab-lms.onrender.com/batch/with-students/by-day?day=${day}`, { headers: { 'x-organization-id': 'org1db' } })
return response.data.data
    }catch(err){
console.log(err.message);

    }
}