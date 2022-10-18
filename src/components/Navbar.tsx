import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-2">
      <div>
        <Link to="/">
          <span className="text-white font-semibold text-xl tracking-tight">
            ~JessBook~
          </span>
        </Link>
      </div>
      <div
        className="block md:hidden"
        onClick={() => {
          const menu = document.getElementById("menu");
          if (menu) {
            menu.classList.toggle("hidden");
          }
        }}
      >
        <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
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
      <div
        id="menu"
        className="w-full flex-grow md:flex md:items-center md:w-auto hidden"
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block ml-4 mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            to="/compliment"
            className="block ml-4 mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-white mr-4"
          >
            Compliment Generator
          </Link>
        </div>
        <div className="flex items-center pt-2 md:pt-0">
          {user ? (
            <div className="flex items-center mt-2 md:ml-4 lg:ml-0">
              <span className="text-white font-semibold text-xl tracking-tight">
                {user.displayName}
              </span>
              <img
                src={user.photoURL || ""}
                alt="User's profile"
                className="rounded-full h-10 w-10 ml-2"
              />
              <Link to="/createPost">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Create Post
                </button>
              </Link>
              <button
                className="ml-4 text-gray-200 hover:text-white"
                onClick={() => auth.signOut()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login">
              <span className="text-white font-semibold text-xl m-4">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
