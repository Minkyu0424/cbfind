import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full px-3 py-4 flex justify-between items-center">
      <Link to="/" className="flex gap-3 items-center">
         <img src="/cnuniv.svg" alt="Login SVG" className="w-6 h-7" />
         <p className="font-yangjin">찾아줄게</p>
      </Link>
      <div className="flex items-end gap-1.5">
        <p className="text-sm font-medium">공주맛밤님</p>
        <img src="/ci_chat.svg" alt="chat SVG" className="w-6 h-6 cursor-pointer" />
        <div className="relative flex pr-1 cursor-pointer">
          <img src="/Frame.svg" alt="alarm SVG" className="w-6 h-5.5" />
          <div className="flex items-center justify-center text-[10px] w-4 h-4 absolute right-0.5 top-[-2px] bg-red-600 rounded-full text-white">
            13
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
