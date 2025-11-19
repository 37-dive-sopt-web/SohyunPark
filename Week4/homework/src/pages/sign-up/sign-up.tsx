import { useState } from "react";
import AuthForm from "../../components/auth-form";
import Label from "../../components/label";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas/sign-up-schema";
import { postUsers } from "../../apis/users/users";

type SignUpForm = z.infer<typeof SignUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    shouldUnregister: false,
  });

  const id = watch("id");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");
  const email = watch("email");
  const age = watch("age");

  const handleClick = async () => {
    if (step === 1) {
      const valid = await trigger("id");
      if (!valid) return;
    }

    if (step === 2) {
      const valid = await trigger(["password", "passwordCheck"]);
      if (!valid) return;
    }

    if (step === 3) {
      const valid = await trigger(["name", "email", "age"]);
      if (!valid) return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    if (step <= 1) {
      navigate("/sign-in");
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: SignUpForm) => {
    const body = {
      username: data.id!,
      password: data.password!,
      name: data.name!,
      email: data.email!,
      age: Number(data.age),
    };

    try {
      await postUsers(body);

      alert(`${data.name}님, 회원가입이 완료되었습니다!`);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  const isStepValid = (() => {
    if (step === 1) return !!id;
    if (step === 2) return !!password && !!passwordCheck;
    if (step === 3) return !!name && !!email && !!age;
    return false;
  })();

  return (
    <div className="min-h-screen flex items-center w-full">
      <AuthForm
        title="회원가입"
        linkTo="/sign-in"
        linkText="로그인으로 돌아가기"
        buttonText={step === 3 ? "회원가입" : "다음"}
        buttonType={step === 3 ? "submit" : "button"}
        onClick={step === 3 ? undefined : handleClick}
        onPrev={handlePrev}
        disabled={!isStepValid}
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 1 && (
          <>
            <Label
              label="아이디"
              placeholder="아이디를 입력해 주세요."
              {...register("id")}
            />
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Label
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <Label
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 확인"
              {...register("passwordCheck")}
            />
            {errors.passwordCheck && (
              <p className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <Label
              label="이름"
              placeholder="이름을 입력해 주세요."
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <Label
              label="이메일"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Label
              label="나이"
              placeholder="숫자로 입력"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </>
        )}
      </AuthForm>
    </div>
  );
};

export default SignUp;
