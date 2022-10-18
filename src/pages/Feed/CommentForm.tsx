import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormData {
  body: string;
}

const schema = yup.object().shape({
  body: yup.string().required("You want to say something?"),
});

export const CommentForm = (props: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });
  const [user] = useAuthState(auth);

  const onSubmit = async (data: CreateFormData) => {
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        body: data.body,
        displayId: user?.displayName,
        userId: user?.uid,
        postId: props.postId,
      });
      console.log("Document written with ID: ", docRef.id);
      reset();
      navigate("/"); // This is the line that is causing the error
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //refresh page on submit
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="body">Body</label>
          <input
            type="text"
            {...register("body")}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.body && (
            <p className="text-red-500 text-sm animate-pulse">
              {errors.body.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 m-2 hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
