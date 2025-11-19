import AuthForm from "../../components/auth-form";
import Label from "../../components/label";
import { useUser } from "../../hooks/use-users";
import { useForm } from "react-hook-form";
import { patchUsers } from "../../apis/users/users";
import { useEffect } from "react";

interface MyPageForm {
  name: string;
  email: string;
  age: number;
}

const MyPage = () => {
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<MyPageForm>({
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        age: user.age,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: MyPageForm) => {
    if (!user) return;

    try {
      await patchUsers(user.id, {
        name: data.name,
        email: data.email,
        age: Number(data.age),
      });

      alert("수정되었습니다!");
    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full flex items-center">
      <AuthForm
        title="내 정보"
        buttonText="저장"
        buttonType="submit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <p>아이디</p>
          <p>{user?.username}</p>
        </div>

        <Label
          label="이름"
          placeholder="이름을 입력해 주세요."
          {...register("name")}
        />
        <Label
          label="이메일"
          placeholder="name@example.com"
          {...register("email")}
        />
        <Label label="나이" placeholder="숫자로 입력" {...register("age")} />
      </AuthForm>
    </div>
  );
};

export default MyPage;
