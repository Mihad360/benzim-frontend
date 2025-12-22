import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-72">
      <MoonLoader color="#e84b4b" size={60} />
    </div>
  );
};

export default Loading;
