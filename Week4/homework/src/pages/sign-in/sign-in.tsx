import { useNavigate } from "react-router";
import { getUsers, postLogin } from "../../apis/users/users";
import AuthForm from "../../components/auth-form";
import Label from "../../components/label";
import { PATH } from "../../constants/paths";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/use-users";

interface SignInForm {
  id: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const { register, handleSubmit } = useForm<SignInForm>();
  const onSubmit = async (data: SignInForm) => {
    try {
      const res = await postLogin({
        username: data.id,
        password: data.password,
      });

      console.log(res);

      if (res?.userId) {
        console.log(res);
        localStorage.setItem("userId", String(res.userId));
        const userData = await getUsers(res.userId);
        setUser(userData);
      }

      alert("로그인되었습니다!");
      navigate(PATH.MY_PAGE);
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center w-full">
      <AuthForm
        title="로그인"
        linkTo="/sign-up"
        linkText="회원가입"
        buttonText="로그인"
        buttonType="submit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label
          label="아이디"
          placeholder="아이디를 입력해 주세요."
          {...register("id")}
        />

        <Label
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          {...register("password")}
        />
      </AuthForm>
    </div>
  );
};

export default SignIn;
