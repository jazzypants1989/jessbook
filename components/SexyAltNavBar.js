import Link from "next/link";

const Navbar = () => {
  const { user, userName } = {};

  return (
    <nav className="flex items-center justify-between flex-wrap bg-violet-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <a className="font-semibold text-xl tracking-tight">JessBook</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-violet-200 border-violet-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-violet-200 hover:text-white mr-4">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-violet-200 hover:text-white mr-4">
              About
            </a>
          </Link>
          <Link href="/contact">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-violet-200 hover:text-white">
              Contact
            </a>
          </Link>
        </div>
        <div>
          {user ? (
            <>
              <Link href="/[username]" as={`/${userName}`}>
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0">
                  Profile
                </a>
              </Link>

              <Link href="/api/logout">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0">
                  Logout
                </a>
              </Link>
            </>
          ) : (
            <Link href="/api/login">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
