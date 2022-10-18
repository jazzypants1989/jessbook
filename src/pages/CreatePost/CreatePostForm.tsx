import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const CreatePostForm = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onSubmit = async (data: CreateFormData) => {
    try {
      await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center text-2xl text-gray-700">
        <label htmlFor="title">Title</label>
        <input
          className="border-2 border-gray-300 p-2 rounded-lg m-2 w-full"
          type="text"
          id="title"
          {...register("title")}
        />
        <p className="text-red-500 font-extrabold animate-pulse">
          {errors.title?.message}
        </p>
        <label htmlFor="description">Whatchu Gotta Say?</label>
        <textarea
          className="border-2 border-gray-300 p-2 text-sm w-full rounded-lg m-2"
          id="description"
          {...register("description")}
        />
        <p className="text-red-500 font-extrabold animate-pulse">
          {errors.description?.message}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          type="submit"
        >
          Blabber on, brother
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
