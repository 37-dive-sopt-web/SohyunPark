import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-between bg-blue-300 px-10 py-4 itmes-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold">마이페이지</h3>
        <p className="text-lg font-medium">안녕하세요, 박소현님</p>
      </div>
      <nav className="flex items-center">
        <ul className="flex gap-2">
          <li className="hover:font-bold">
            <Link to="/my-page">내 정보</Link>
          </li>
          <li className="hover:font-bold">
            <Link to="/my-page/members">회원 조회</Link>
          </li>
          <li className="hover:font-bold">
            <button>로그아웃</button>
          </li>
          <li className="hover:font-bold">
            <button>회원탈퇴</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
