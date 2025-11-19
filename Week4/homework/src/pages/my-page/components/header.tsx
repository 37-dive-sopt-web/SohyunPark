import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/paths";
import { useUser } from "../../../hooks/use-users";
import { deleteUser } from "../../../apis/users/users";
import { useState } from "react";
import Modal from "../../../components/modal";

const Header = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    clearUser();
    navigate(PATH.SIGN_IN);
  };

  const handleWithdraw = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);

      localStorage.removeItem("userId");
      clearUser();

      alert("회원탈퇴가 완료되었습니다.");
      navigate(PATH.SIGN_IN);
    } catch (err) {
      console.error(err);
      alert("회원탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
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
              <button type="button" onClick={() => setShowModal(true)}>
                회원탈퇴
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {showModal && (
        <Modal
          title="회원탈퇴"
          message="정말 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          onConfirm={() => {
            setShowModal(false);
            handleWithdraw();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Header;
