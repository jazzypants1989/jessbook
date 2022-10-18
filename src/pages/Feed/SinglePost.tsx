import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Post as IPost } from "./Main";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

interface Props {
  post: IPost;
}

export interface Like {
  likeId: string;
  userId: string;
}

export interface Dislike {
  dislikeId: string;
  userId: string;
}

interface Comment {
  commentId: string;
  displayId: string;
  userId: string;
  body: string;
}

export const SinglePost = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);
  const [dislikes, setDislikes] = useState<Dislike[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const likesRef = collection(db, "likes");
  const dislikesRef = collection(db, "dislikes");
  const commentsRef = collection(db, "comments");

  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const dislikesDoc = query(dislikesRef, where("postId", "==", post.id));
  const commentsDoc = query(commentsRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const getDislikes = async () => {
    const data = await getDocs(dislikesDoc);
    setDislikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, dislikeId: doc.id }))
    );
  };
  const addDislike = async () => {
    try {
      const newDoc = await addDoc(dislikesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setDislikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, dislikeId: newDoc.id }]
            : [{ userId: user.uid, dislikeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeDislike = async () => {
    try {
      const dislikeToDeleteQuery = query(
        dislikesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const dislikeToDeleteData = await getDocs(dislikeToDeleteQuery);
      const dislikeId = dislikeToDeleteData.docs[0].id;
      const dislikeToDelete = doc(db, "dislikes", dislikeId);
      await deleteDoc(dislikeToDelete);
      if (user) {
        setDislikes(
          (prev) =>
            prev && prev.filter((dislike) => dislike.dislikeId !== dislikeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserDisliked = dislikes?.find(
    (dislike) => dislike.userId === user?.uid
  );

  useEffect(() => {
    getDislikes();
  }, []);

  const getComments = async () => {
    const data = await getDocs(commentsDoc);
    setComments(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        commentId: doc.id,
        body: doc.data().body,
        displayId: doc.data().displayId,
      }))
    );
  };

  const addComment = async (body: string) => {
    try {
      const newDoc = await addDoc(commentsRef, {
        userId: user?.uid,
        postId: post.id,
        body,
      });
      if (user) {
        setComments((prev) =>
          prev
            ? [
                ...prev,
                {
                  userId: user.uid,
                  commentId: newDoc.id,
                  body,
                  displayId: newDoc.id,
                },
              ]
            : [
                {
                  userId: user.uid,
                  commentId: newDoc.id,
                  body,
                  displayId: newDoc.id,
                },
              ]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const hasUserCommented = comments?.find(
    (comment) => comment.userId === user?.uid
  );

  const removeComment = async (commentId: string) => {
    try {
      const commentToDelete = doc(db, "comments", commentId);
      await deleteDoc(commentToDelete);
      if (user) {
        setComments(
          (prev) =>
            prev && prev.filter((comment) => comment.commentId !== commentId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showComments, setShowComments] = useState(false);

  return (
    <div
      key={post.id}
      className="flex flex-col items-center justify-center text-2xl text-gray-700 p-4 border-b-2 border-gray-300"
    >
      <Link to={`/post/${post.id}`}>
        <h2 className="text-xl font-bold text-gray-700">{post.title}</h2>
      </Link>
      <div className="items-center justify-center text-center border-2 border-gray-300 p-2 rounded-lg m-2 w-full">
        <p className="text-lg text-gray-700">{post.description}</p>
        <p className="text-sm font-thin text-gray-400">{post.username}</p>
      </div>
      <div className="inline-flex space-x-2">
        <button
          onClick={hasUserLiked ? removeLike : addLike}
          className="bg-gray-100 hover:bg-slate-600 transition-all ease-in-out duration-500 rounded-lg px-1 pb-1 hover:animate-bounce"
        >
          {hasUserLiked ? "Likes:" : <>&#128077;</>} {likes?.length}
        </button>
        <button
          className="bg-gray-100 hover:bg-slate-600 transition-all ease-in-out duration-500 rounded-lg px-1 pb-1 hover:animate-bounce"
          onClick={hasUserDisliked ? removeDislike : addDislike}
        >
          {hasUserDisliked ? "Hates:" : <>&#128078;</>} {dislikes?.length}
        </button>
      </div>
      <div className="inline-flex space-x-2">
        <button
          className="bg-gray-100 hover:bg-slate-600 transition-all ease-in-out duration-500 rounded-lg px-1 pb-1"
          onClick={() => setShowComments((prev) => !prev)}
        >
          &#128172; {comments?.length}
        </button>

        {showComments && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              {comments?.map((comment) => (
                <div
                  key={comment.commentId}
                  className="flex flex-col items-center justify-center text-2xl text-gray-700 p-4 border-b-2 border-gray-300"
                >
                  <p className="text-lg text-gray-700">{comment.body}</p>
                  <p className="text-sm font-thin text-gray-400">
                    {comment.displayId}
                  </p>

                  {comment.userId === user?.uid && (
                    <button
                      onClick={() => removeComment(comment.commentId)}
                      className="bg-gray-100 hover:bg-slate-600 transition-all ease-in-out duration-500 rounded-lg px-1 pb-1 hover:animate-bounce"
                    >
                      &#128465;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              <CommentForm
                postId={post.id}
                addComment={addComment}
                hasUserCommented={hasUserCommented}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
