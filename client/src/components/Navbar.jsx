function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        <h1 className="text-3xl font-bold text-white">
          NyumbaFind
        </h1>

        <ul className="hidden gap-10 text-white md:flex">
          <li className="cursor-pointer hover:text-gray-300">
            Home
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Properties
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Favorites
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;