import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/paths";
import { useUser } from "../../../hooks/use-users";
import { deleteUser } from "../../../apis/users/users";
import { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import { HamburgerIcon } from "../../../assets";
import { MenuItems } from "./menu-item";

const Header = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const resetAuthAndRedirect = () => {
    localStorage.removeItem("userId");
    clearUser();
    navigate(PATH.SIGN_IN);
  };

  const handleLogout = () => {
    resetAuthAndRedirect();
  };

  const handleWithdraw = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);
      resetAuthAndRedirect();
      alert("회원탈퇴가 완료되었습니다.");
    } catch (err) {
      console.error(err);
      alert("회원탈퇴 중 오류가 발생했습니다.");
    }
  };

  const handleMenuAction = (action: "logout" | "withdraw") => {
    if (action === "logout") {
      handleLogout();
    }

    if (action === "withdraw") {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="w-full flex justify-between bg-blue-300 px-10 py-4 items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold">마이페이지</h3>
          <p className="text-lg font-medium">
            안녕하세요, {user?.name ?? "게스트"}님
          </p>
        </div>

        <nav className="hidden md:flex items-center">
          <ul className="flex gap-2">
            <MenuItems onAction={handleMenuAction} />
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          <HamburgerIcon />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-64 bg-white p-6
            transform transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <button className="mb-6 font-bold" onClick={() => setMenuOpen(false)}>
            닫기 ✕
          </button>

          <nav>
            <ul className="flex flex-col gap-4">
              <MenuItems
                onItemClick={() => setMenuOpen(false)}
                onAction={handleMenuAction}
              />
            </ul>
          </nav>
        </aside>
      </div>

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
