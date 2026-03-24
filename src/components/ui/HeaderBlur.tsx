import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "../../assets/Icons";

const HeaderBlur = ({ label }: { label?: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-4 mb-10 sticky top-0 bg-gray-900/80 backdrop-blur-md py-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          <IconChevronLeft />
        </button>
        <p className="text-2xl font-bold tracking-tight">{label}</p>
      </div>
    </>
  );
};
export default HeaderBlur;
