import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-700 py-5">Create Post</h1>
      <CreatePostForm />
    </div>
  );
};
export default CreatePost;
