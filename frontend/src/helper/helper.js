import { toast } from 'react-toastify';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});


const createSlug = (slug) => {
    return slug
        .toLowerCase()                 // lowercase
        .trim()                        // remove extra spaces
        .replace(/[^a-z0-9\s-]/g, "")  // remove special characters
        .replace(/\s+/g, "-");         // spaces to hyphen
}

const notify = (message, flag) => toast(message, { type: flag ? "success" : "error" });

function formatIndianCurrency(amount) {
    const value = Number(amount);
    if (isNaN(value)) return "₹0";
    return value.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
//10000----- ₹ 10,000




export { notify, createSlug, axiosInstance, formatIndianCurrency }