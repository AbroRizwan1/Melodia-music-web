import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import Popup from '../Component/Popup'
import { useRegister } from "../Features/Auth/UseRegister";

export default function Register({ onRegister }) {

    const { form, setForm, showPass, setShowPass, errors, popup, setPopup, handleSubmit, navigate } = useRegister();

    const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
    const strengthLabel = ["", "Weak", "Good", "Strong"];
    const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-400"];


    return (
        <div className="min-h-screen bg-[#E8EDF2] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                {/* Card */}
                <div className="bg-[#2C3947] rounded-3xl shadow-2xl shadow-[#2C3947]/40 overflow-hidden">
                    {/* Header */}
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
                        <h1 className="text-[#E8EDF2] text-2xl font-bold">Create account</h1>
                        <p className="text-[#E8EDF2]/60 text-sm mt-1">Join the music community</p>
                    </div>


                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">

                        {popup.message && (
                            <Popup
                                type={popup.type}
                                message={popup.message}
                            />
                        )}
                        {/* Username */}
                        <div>
                            <label className="block text-[#E8EDF2]/70 text-xs font-semibold uppercase tracking-widest mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#547A95]">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="yourname"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-[#547A95]/20 border ${errors.username ? "border-red-400" : "border-[#547A95]/30"
                                        } text-[#E8EDF2] placeholder-[#E8EDF2]/30 text-sm focus:outline-none focus:border-[#C2A56D] transition-colors`}
                                />
                            </div>
                            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                        </div>

                        {/* Email */}
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

                            {/* Password strength */}
                            {form.password.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((s) => (
                                            <div
                                                key={s}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= strength ? strengthColor[strength] : "bg-[#547A95]/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs ${strength === 1 ? "text-red-400" : strength === 2 ? "text-yellow-400" : "text-green-400"}`}>
                                        {strengthLabel[strength]}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="block text-[#E8EDF2]/70 text-xs font-semibold uppercase tracking-widest mb-2">
                                Select Role
                            </label>

                            <div className="grid  grid-cols-2 gap-3">
                                {[
                                    {
                                        value: "user",
                                        label: "User",
                                        sub: "Listen & discover music",
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: "artist",
                                        label: "Artist",
                                        sub: "Upload & manage tracks",
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                                <path d="M9 18V5l12-2v13" />
                                                <circle cx="6" cy="18" r="3" />
                                                <circle cx="18" cy="16" r="3" />
                                            </svg>
                                        ),
                                    },
                                ].map((role) => {
                                    const isSelected = form.role === role.value;
                                    return (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => setForm({ ...form, role: role.value })}
                                            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200
                                            ${isSelected
                                                    ? "border-[#C2A56D] bg-[#C2A56D]/10"
                                                    : "border-[#547A95]/30 bg-[#547A95]/10 hover:border-[#547A95]/60"
                                                }`}
                                        >
                                            {/* Tick badge */}
                                            {isSelected && (
                                                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#C2A56D] flex items-center justify-center">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="#2C3947" strokeWidth="4" className="w-2.5 h-2.5">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </span>
                                            )}

                                            {/* Icon circle */}
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
            ${isSelected ? "bg-[#C2A56D]/20 text-[#C2A56D]" : "bg-[#547A95]/20 text-[#547A95]"}`}>
                                                {role.icon}
                                            </div>

                                            <span className={`text-sm font-semibold transition-colors ${isSelected ? "text-[#C2A56D]" : "text-[#E8EDF2]/60"}`}>
                                                {role.label}
                                            </span>
                                            <span className={`text-[10px] text-center leading-tight transition-colors ${isSelected ? "text-[#C2A56D]/70" : "text-[#E8EDF2]/30"}`}>
                                                {role.sub}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                        </div>



                        <button
                            type="submit"
                            className="w-full py-3 bg-[#C2A56D] text-[#2C3947] font-bold rounded-xl hover:bg-[#d4b87d] active:scale-95 transition-all duration-200 text-sm tracking-wide"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-[#E8EDF2]/40 text-xs">
                            Already have an account?{" "}
                            <button onClick={(() => {
                                navigate("/")
                            })} className="text-[#C2A56D] hover:underline">Login</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}