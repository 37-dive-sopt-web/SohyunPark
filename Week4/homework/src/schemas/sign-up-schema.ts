import { z } from "zod";

export const SignUpSchema = z
  .object({
    id: z
      .string()
      .min(1, "아이디는 필수입니다.")
      .max(50, "아이디는 최대 50자까지 가능합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(64, "비밀번호는 최대 64자까지 가능합니다.")
      .regex(/[A-Z]/, "대문자를 최소 1자 포함해야 합니다.")
      .regex(/[a-z]/, "소문자를 최소 1자 포함해야 합니다.")
      .regex(/[0-9]/, "숫자를 최소 1자 포함해야 합니다.")
      .regex(/[^A-Za-z0-9]/, "특수문자를 최소 1자 포함해야 합니다.")
      .regex(/^\S*$/, "공백은 사용할 수 없습니다."),
    passwordCheck: z.string().min(1, "비밀번호 확인은 필수입니다."),
    name: z.string().min(1, "이름은 필수입니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    age: z.string().regex(/^[0-9]+$/, "숫자만 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });
