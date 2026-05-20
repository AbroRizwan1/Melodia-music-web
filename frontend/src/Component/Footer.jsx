export default function Footer() {
    return (
        <footer className="bg-[#2C3947] text-[#E8EDF2] pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#C2A56D] flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#2C3947]">
                                    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-widest uppercase">Melodia</span>
                        </div>
                        <p className="text-[#E8EDF2]/60 text-sm leading-relaxed">
                            Your personal music universe. Discover, stream, and share the music you love.
                        </p>
                        <div className="flex gap-3">
                            {["twitter", "instagram", "youtube"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-[#547A95]/30 hover:bg-[#C2A56D] flex items-center justify-center transition-colors duration-200"
                                >
                                    <span className="text-xs text-[#E8EDF2] capitalize">{social[0].toUpperCase()}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Discover */}
                    <div className="space-y-4">
                        <h4 className="text-[#C2A56D] text-sm font-semibold uppercase tracking-widest">Discover</h4>
                        <ul className="space-y-2">
                            {["New Releases", "Top Charts", "Genres", "Podcasts"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#E8EDF2]/60 hover:text-[#C2A56D] text-sm transition-colors duration-200">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="space-y-4">
                        <h4 className="text-[#C2A56D] text-sm font-semibold uppercase tracking-widest">Account</h4>
                        <ul className="space-y-2">
                            {["Profile", "Settings", "Subscription", "Help Center"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#E8EDF2]/60 hover:text-[#C2A56D] text-sm transition-colors duration-200">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-[#C2A56D] text-sm font-semibold uppercase tracking-widest">Stay Tuned</h4>
                        <p className="text-[#E8EDF2]/60 text-sm">Get the latest music news and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-3 py-2 bg-[#547A95]/20 border border-[#547A95]/40 rounded-lg text-sm text-[#E8EDF2] placeholder-[#E8EDF2]/30 focus:outline-none focus:border-[#C2A56D] transition-colors"
                            />
                            <button className="px-3 py-2 bg-[#C2A56D] text-[#2C3947] rounded-lg font-semibold text-sm hover:bg-[#d4b87d] transition-colors">
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#547A95]/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E8EDF2]/40">
                    <span>© 2026 Melodia. All rights reserved.</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[#C2A56D] transition-colors">Privacy</a>
                        <a href="#" className="hover:text-[#C2A56D] transition-colors">Terms</a>
                        <a href="#" className="hover:text-[#C2A56D] transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}