import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const compliments = [
  "is the coolest person in the tri-state region!",
  "looks extra handsome and/or beautiful today!",
  "is really good at giving firm handshakes!",
  "is better than they think they are!",
  "is really quite the catch!",
  "is a great friend!",
  "is a great listener!",
  "really has it all together!",
  "never gives up!",
  "is a great person to be around!",
  "exudes confidence and charisma!",
  "understands the importance of being kind!",
  "is actually very good at coding!",
  "needs to be appreciated more!",
  "has a great sense of humor!",
  "is a great person to talk to!",
  "is a great person to hang out with!",
  "is a great person to be around!",
  "lobbies for the free use of public restrooms!",
  "knows how to make a mean cup of coffee!",
  "tastes like a warm summer day!",
  "has no boundaries, but that's okay!",
  "cannot be contained, even in the most secure of facilities!",
  "looks so great that they should be on the cover of a magazine!",
  "has really big muscles!",
  "better defend me, because I'm scared and I'm not afraid to admit it! (They look strong.)",
  "needs to be hugged more often!",
  "looks like they could do a mean karate chop!",
];

// offer a random compliment

const randomCompliment = () => {
  return compliments[Math.floor(Math.random() * compliments.length)];
};

const Compliment = () => {
  const [user] = useAuthState(auth);
  const [compliment, setCompliment] = useState(randomCompliment());

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-2xl text-gray-700">
        {user ? (
          <>
            <p className="text-2xl font-bold text-gray-700 py-10">
              {user.displayName} {compliment}
            </p>
            <img
              src={user.photoURL || ""}
              alt="User's profile"
              className="rounded-full h-20 w-20"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-10"
              onClick={() => setCompliment(randomCompliment())}
            >
              Give another compliment!
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-gray-700">
              Welcome to the Compliment Generator!
            </p>
            <p className="text-2xl font-bold text-gray-700 py-10">
              You have to sign in if you want me to try to make you happy. Click
              "Login" in the top right corner.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Compliment;
