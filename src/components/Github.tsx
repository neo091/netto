import { IconGithub } from "../assets/Icons";

const Github = () => {
  return (
    <div className=" w-full h-10 flex justify-center mb-20  ">
      <a
        href="https://github.com/neo091/netto"
        target="_blank"
        className="  text-green-500  "
      >
        <IconGithub size={8} className={" absolute "} />
        <IconGithub size={8} className={" text-green-800 animate-ping "} />
      </a>
    </div>
  );
};
export default Github;
