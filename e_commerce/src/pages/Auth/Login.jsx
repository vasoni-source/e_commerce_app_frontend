import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithPassword } from "../../redux/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../redux/thunk/authThunk";
export default function Login() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log("user from login", user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openOtpField, setOpenOtpField] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithPassword({ email, password }));
  };
  useEffect(() => {
    if (!user) return; // ignore until user is available

    if (user.role === "admin") {
      navigator("/admin_dashboard");
    } else if(user.role ==="seller"){
      navigator("/seller_dashboard");
    }
    else{
      navigator("/")
    }
  }, [user]);

  // Forgot password UI states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [token, setToken] = useState(""); // manually entered token
  const [newPassword, setNewPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  // Send reset email
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(forgotPassword(forgotEmail));

    if (res.meta.requestStatus === "fulfilled") {
      alert(
        "Reset token sent to email (check backend console). Enter token below."
      );
      setShowResetForm(true);
    }
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(resetPassword({ token, password: newPassword }));

    if (res.meta.requestStatus === "fulfilled") {
      alert("Password updated successfully!");
      setShowForgot(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email "
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-black-100"
              >
                Password
              </label>
              <div className="text-sm">
                {/* <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a> */}
                <p
                  onClick={() => setShowForgot(true)}
                  className="text-indigo-400 text-sm cursor-pointer underline text-right"
                >
                  Forgot password?
                </p>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password "
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a have an acount?{" "}
          <Link
            to="/user/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Signup
          </Link>
        </p>
      </div>
      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            {!showResetForm ? (
              <>
                <h2 className="text-xl font-bold mb-3">Forgot Password</h2>

                <form onSubmit={handleForgotSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border mb-3"
                  />

                  <button className="bg-indigo-500 px-4 py-2 text-white rounded w-full">
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-3">Reset Password</h2>

                <form onSubmit={handleResetPassword}>
                  <input
                    type="text"
                    placeholder="Enter token from email"
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-3 py-2 rounded border mb-3"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded border mb-3"
                  />

                  <button className="bg-green-500 px-4 py-2 text-white rounded w-full">
                    Reset Password
                  </button>
                </form>
              </>
            )}

            <button
              onClick={() => setShowForgot(false)}
              className="text-red-500 mt-3 underline w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
