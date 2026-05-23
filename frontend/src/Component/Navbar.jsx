import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { userContext } from "../ContextApi/UserContext";
import axios from "axios";
import { LogOut, Menu, X, Music2 } from "lucide-react";

export default function Navbar({ handleClick, inputRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(userContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();

  };

  const links = ["Track", "Album"];


  return (
    <nav className="w-full fixed z-20 bg-[#2C3947] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#C2A56D] flex items-center justify-center">
              <Music2 className="w-4 h-4 text-[#2C3947]" />
            </div>
            <span className="text-[#E8EDF2] text-xl font-bold tracking-widest uppercase">
              Melodia
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className="text-[#E8EDF2]/70 hover:text-[#C2A56D] text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-[#E8EDF2]/80 text-sm font-medium truncate max-w-[120px]">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-600 rounded-full transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-semibold text-[#E8EDF2] border border-[#547A95] rounded-full hover:border-[#C2A56D] hover:text-[#C2A56D] transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-sm font-semibold text-[#2C3947] bg-[#C2A56D] rounded-full hover:bg-[#d4b87d] transition-all duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile: Hamburger only */}
          <button
            className="md:hidden text-[#E8EDF2] focus:outline-none p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2C3947] border-t border-[#547A95]/30 px-4 pb-5 pt-3 space-y-3">

          {/* Nav Links */}
          {links.map((item) => (
            <button
              key={item}
              onClick={() => { handleClick(item); setMenuOpen(false); }}
              className="block w-full text-left text-[#E8EDF2]/70 hover:text-[#C2A56D] text-sm font-medium tracking-wide transition-colors duration-200 py-1"
            >
              {item}
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-[#547A95]/30 pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-[#E8EDF2]/80 text-sm font-medium truncate max-w-[160px]">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-600 rounded-full transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="flex-1 text-center px-4 py-2 text-sm font-semibold text-[#E8EDF2] border border-[#547A95] rounded-full hover:border-[#C2A56D] hover:text-[#C2A56D] transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate("/register"); setMenuOpen(false); }}
                  className="flex-1 text-center px-4 py-2 text-sm font-semibold text-[#2C3947] bg-[#C2A56D] rounded-full hover:bg-[#d4b87d] transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}