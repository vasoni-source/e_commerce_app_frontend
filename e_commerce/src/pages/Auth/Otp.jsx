import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Otp() {
    const navigator = useNavigate();
    const [openOtpField,setOpenOtpField] = useState(false);
    const [message,setMessage] = useState("")
    const [email,setEmail] = useState("");
    const [otp,setOtp]=useState("")
    const sendOtp =async(e)=>{
        e.preventDefault()
        if(!email){
            return setMessage("Email is required")
        }
        setMessage("");
        try {
            const res = await axios.post("http://localhost:5000/user/register/send-otp",{email});
            setMessage(res.data.message);
            navigator("/user/register")
        } catch (error) {
            setMessage(err.response?.data?.error || "Failed to send OTP");
        }
    }
  return (
   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
          Verify your email
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-black-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <button className="flex w-6xs justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={sendOtp}>Generate Otp</button>
        
            {
                message ? <p>{message}</p>:null
            }
        
         {
            openOtpField ?  <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="otp"
                className="block text-sm/6 font-medium text-black-100"
              >
                Otp
              </label>
            </div>
            <div className="mt-2">
              <input
                id="otp"
                name="otp"
                type="password"
                onChange={(e)=>setOtp(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>:null
         }

        
        </form>
      </div>
    </div>
  )
}
