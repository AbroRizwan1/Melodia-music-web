import { useContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import { userContext } from "../ContextApi/UserContext";
import Popup from "../Component/popup";
import { useLogin } from "../Features/Auth/UseLogin";
export default function Login({ onLogin }) {

  const { form, setForm, showPass, setShowPass, errors, setPopup, popup, handleSubmit, navigate } = useLogin();
  return (
    <div className="min-h-screen  bg-[#E8EDF2]  flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#2C3947] rounded-3xl shadow-2xl shadow-[#2C3947]/40 overflow-hidden">
          {/* Header Strip */}
          <div className="bg-gradient-to-r from-[#547A95] to-[#2C3947] px-8 pt-8 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C2A56D] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#2C3947]">
                  <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-[#E8EDF2] font-bold tracking-widest uppercase text-sm">Melodia</span>
            </div>
            <h1 className="text-[#E8EDF2] text-2xl font-bold">Welcome back</h1>
            <p className="text-[#E8EDF2]/60 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            {/* Email */}

            <Popup
              type={popup.type}
              message={popup.message}
            />

            <div>
              <label className="block text-[#E8EDF2]/70 text-xs font-semibold uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#547A95]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-[#547A95]/20 border ${errors.email ? "border-red-400" : "border-[#547A95]/30"
                    } text-[#E8EDF2] placeholder-[#E8EDF2]/30 text-sm focus:outline-none focus:border-[#C2A56D] transition-colors`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#E8EDF2]/70 text-xs font-semibold uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#547A95]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl bg-[#547A95]/20 border ${errors.password ? "border-red-400" : "border-[#547A95]/30"
                    } text-[#E8EDF2] placeholder-[#E8EDF2]/30 text-sm focus:outline-none focus:border-[#C2A56D] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#547A95] hover:text-[#C2A56D] transition-colors"
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-[#C2A56D] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C2A56D] text-[#2C3947] font-bold rounded-xl hover:bg-[#d4b87d] active:scale-95 transition-all duration-200 text-sm tracking-wide"
            >
              Sign In
            </button>
          </form>
          <p className="text-center pb-4 text-[#E8EDF2]/40 text-xs">
            Don't have an account?
            <button type="button" onClick={() => navigate("/register")} className="text-[#C2A56D] cursor-pointer hover:underline">Register</button>
          </p>

        </div>
      </div>
    </div>
  )
}