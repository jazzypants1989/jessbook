import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jesse rulez!</title>
      </Head>
      <main className="auto mx-auto">
        <div className="flex flex-col items-center justify-center min-h-full py-2">
          <h2 className="text-2xl font-bold">Hello to you, my friend!</h2>
          <Loader show={true} />
          <p className="text-xl text-center mt-4 mb-8 px-4 max-w-2xl">
            Check out the
            <Link
              href={{
                pathname: "/[username]",
                query: { username: "jesse" },
              }}
            >
              <a className="text-indigo-600 hover:text-indigo-800"> profile </a>
            </Link>
            of our glorious leader!
          </p>
          <button onClick={() => toast.success("Toast is soo yummilicious!")}>
            Toast me!
          </button>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-sm text-gray-500">
          This is a footer. It&apos;s not very interesting.
        </p>
      </footer>
    </>
  );
}
