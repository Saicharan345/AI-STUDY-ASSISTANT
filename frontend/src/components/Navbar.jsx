function Navbar() {
  return (
    <nav
      id="home"
      className="flex justify-between items-center py-4 border-b border-gray-200"
    >
      <h1 className="text-3xl font-bold text-blue-700">
        AI Study Assistant 
      </h1>

      <div className="flex items-center gap-8">
        <a
          href="#home"
          className="font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </a>

        <a
          href="#features"
          className="font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          Features
        </a>

        <a
          href="#about"
          className="font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;