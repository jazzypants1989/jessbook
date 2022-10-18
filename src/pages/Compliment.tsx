import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Compliment = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-2xl text-gray-700">
        {user ? (
          <>
            <p className="text-2xl font-bold text-gray-700 py-10">
              {user.displayName} is the coolest person in the tri-state region!
            </p>
            <img
              src={user.photoURL || ""}
              alt="User's profile"
              className="rounded-full h-20 w-20"
            />
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-gray-700">
              Welcome to the Compliment Generator!
            </p>
            <p className="text-2xl font-bold text-gray-700 py-10">
              You have to sign in if you want me to try to make you happy.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Compliment;
