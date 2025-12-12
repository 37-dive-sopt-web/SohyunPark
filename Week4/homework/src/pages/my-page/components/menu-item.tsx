import { Link } from "react-router-dom";
import { PATH } from "../../../constants/paths";

const MENU_ITEMS = [
  { label: "내 정보", to: PATH.MY_PAGE },
  { label: "회원 조회", to: PATH.MEMBERS },
  { label: "로그아웃", action: "logout" },
  { label: "회원탈퇴", action: "withdraw" },
] as const;

type MenuAction = "logout" | "withdraw";

interface MenuItemsProps {
  onItemClick?: () => void;
  onAction: (action: MenuAction) => void;
}

export const MenuItems = ({ onItemClick, onAction }: MenuItemsProps) => {
  return (
    <>
      {MENU_ITEMS.map((item) => (
        <li key={item.label} className="hover:font-bold">
          {"to" in item ? (
            <Link to={item.to} onClick={onItemClick}>
              {item.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                onItemClick?.();
                onAction(item.action);
              }}
            >
              {item.label}
            </button>
          )}
        </li>
      ))}
    </>
  );
};
