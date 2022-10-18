import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return !auth.currentUser ? (
    <div className="flex flex-col items-center justify-center h-screen text-2xl text-gray-700">
      <p className="text-2xl font-bold text-gray-700">
        Sign in with Google to continue!
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen text-2xl text-gray-700">
      <p className="text-2xl font-bold text-gray-700">
        You are already signed in, silly goose!
      </p>
    </div>
  );
};
export default Login;
