import Button from "./Button";

const Header = () => {
  return (
    <header className="flex justify-between bg-blue-100 items-center h-14 p-2 m-4 rounded-xl">
      <h1>숫자 카드 짝 맞추기</h1>
      <div className="flex gap-2">
        <Button>게임</Button>
        <Button>랭킹</Button>
      </div>
    </header>
  );
};

export default Header;
