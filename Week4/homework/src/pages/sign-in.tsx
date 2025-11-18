import AuthForm from "../components/auth-form";
import Label from "../components/label";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center w-full">
      <AuthForm
        title="로그인"
        linkTo="/sign-up"
        linkText="회원가입"
        buttonText="로그인"
        buttonType="submit"
      >
        <Label label="아이디" name="id" placeholder="아이디를 입력해 주세요." />
        <Label
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
      </AuthForm>
    </div>
  );
};

export default SignIn;
