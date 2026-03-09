import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Film, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const NavItem = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative px-1 py-1 text-sm font-medium transition-colors duration-300 group"
  >
    <span className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}>
      {label}
    </span>
    {/* Animated underline */}
    <motion.span
      className="absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full"
      initial={false}
      animate={{ width: isActive ? "100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ originX: 0 }}
    />
    {/* Hover glow */}
    {isActive && (
      <motion.span
        layoutId="nav-glow"
        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
        style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)" }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
    )}
  </Link>
);

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const isAdmin = user?.role === "admin";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse/movie", label: "Movies" },
    { to: "/browse/tv", label: "TV Shows" },
    ...(user ? [{ to: "/favorites", label: "Favorites" }] : []),
    ...(user ? [{ to: "/history", label: "History" }] : []),
    ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
  ];

  const isActiveLink = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled border-b border-border/30"
          : "navbar-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Film className="w-7 h-7 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
          </motion.div>
          <span className="font-display text-2xl tracking-widest text-foreground">
            CINE<span className="text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)]">VERSE</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              label={link.label}
              isActive={isActiveLink(link.to)}
            />
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onSubmit={handleSearch}
                className="overflow-hidden"
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="w-full bg-secondary/80 backdrop-blur-md text-foreground text-sm px-4 py-2 rounded-full outline-none ring-1 ring-border/50 focus:ring-primary/60 placeholder:text-muted-foreground transition-all"
                />
              </motion.form>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-primary"
          >
            <Search className="w-[18px] h-[18px]" />
          </motion.button>

          <ThemeToggle />

          {/* Auth */}
          {!isLoading && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-secondary/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center ring-1 ring-primary/30">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    title="Logout"
                  >
                    <LogOut className="w-[18px] h-[18px]" />
                  </motion.button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </>
          )}

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-secondary/60 transition-colors text-muted-foreground"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/20"
          >
            <div className="container py-5 flex flex-col gap-1 navbar-scrolled">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all ${
                      isActiveLink(link.to)
                        ? "text-primary bg-primary/10 border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {!isLoading && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="mt-2 pt-3 border-t border-border/30"
                >
                  {user ? (
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="w-full text-sm font-medium text-muted-foreground hover:text-destructive transition-colors py-3 px-4 rounded-lg hover:bg-destructive/10 text-left flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout ({user.name})
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm font-medium text-primary py-3 px-4 rounded-lg bg-primary/10 text-center border border-primary/20"
                    >
                      Sign In
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
