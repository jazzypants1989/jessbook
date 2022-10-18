import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
}

const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto">
        {postsList?.map((post) => (
          <SinglePost post={post} />
        ))}
      </div>
    </>
  );
};

export default Main;
