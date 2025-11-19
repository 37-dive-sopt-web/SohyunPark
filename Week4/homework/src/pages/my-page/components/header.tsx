import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/paths";
import { useUser } from "../../../hooks/use-users";

const Header = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    clearUser(); 
    navigate(PATH.SIGN_IN);
  };

  return (
    <header className="w-full flex justify-between bg-blue-300 px-10 py-4 items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold">마이페이지</h3>
        <p className="text-lg font-medium">
          안녕하세요, {user?.name ?? "게스트"}님
        </p>
      </div>

      <nav className="flex items-center">
        <ul className="flex gap-2">
          <li className="hover:font-bold">
            <Link to={PATH.MY_PAGE}>내 정보</Link>
          </li>
          <li className="hover:font-bold">
            <Link to={PATH.MEMBERS}>회원 조회</Link>
          </li>
          <li className="hover:font-bold">
            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
          <li className="hover:font-bold">
            <button type="button">회원탈퇴</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
