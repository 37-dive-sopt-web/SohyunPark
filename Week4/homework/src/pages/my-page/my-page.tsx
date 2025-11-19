import AuthForm from "../../components/auth-form";
import Label from "../../components/label";

const MyPage = () => {
  return (
    <div className="w-full flex items-center">
      <AuthForm title="내 정보" buttonText="저장" buttonType="submit">
        <p>아이디</p>
        <Label label="이름" placeholder="이름을 입력해 주세요." />
        <Label label="이메일" placeholder="name@example.com" />
        <Label label="나이" placeholder="숫자로 입력" />
      </AuthForm>
    </div>
  );
};

export default MyPage;
