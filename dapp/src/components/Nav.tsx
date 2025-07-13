// Navigation.tsx
import React, { useEffect } from "react";

const Nav: React.FC = () => {
  // Function to handle smooth scrolling when nav links are clicked
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (): void => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-50 py-4 md:py-6">
      <nav className="max-w-4xl mx-auto px-4">
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-gray-200 focus:outline-none hover:text-gray-400 transition-colors"
            style={{ cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:hidden flex-col bg-black/80 backdrop-blur-sm absolute top-12 right-4 left-4 p-4 rounded shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              scrollToSection("features");
              setIsMenuOpen(false);
            }}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest py-2 transition-colors text-left"
            style={{ cursor: "pointer" }}
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection("agents");
              setIsMenuOpen(false);
            }}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest py-2 transition-colors text-left"
            style={{ cursor: "pointer" }}
          >
            Clubs
          </button>
          <button
            onClick={() => {
              scrollToSection("contact");
              setIsMenuOpen(false);
            }}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest py-2 transition-colors text-left"
            style={{ cursor: "pointer" }}
          >
            Profile
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest transition-colors bg-transparent border-none outline-none"
            style={{ cursor: "pointer" }}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("agents")}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest transition-colors bg-transparent border-none outline-none"
            style={{ cursor: "pointer" }}
          >
            Clubs
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-200 hover:text-gray-400 font-mono uppercase text-sm tracking-widest transition-colors bg-transparent border-none outline-none"
            style={{ cursor: "pointer" }}
          >
            Profile
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
