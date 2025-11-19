import { z } from "zod";

export const SignUpSchema = z
  .object({
    id: z.string().min(1, "아이디는 필수입니다.").optional(),

    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
      .regex(/[a-z]/, "소문자를 포함해야 합니다.")
      .regex(/[0-9]/, "숫자를 포함해야 합니다.")
      .regex(/[^A-Za-z0-9]/, "특수문자를 포함해야 합니다.")
      .optional(),

    passwordCheck: z.string().optional(),

    name: z.string().min(1, "이름은 필수입니다.").optional(),

    email: z.string().email("유효한 이메일이 아닙니다.").optional(),

    age: z
      .string()
      .regex(/^[0-9]+$/, "숫자만 입력해주세요.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password || data.passwordCheck) {
      if (data.password !== data.passwordCheck) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치하지 않습니다.",
          path: ["passwordCheck"],
        });
      }
    }
  });
