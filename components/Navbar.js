import Link from "next/link";

const Navbar = () => {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">JessBook!</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-green">Submit a Post!</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log-In!</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
