import { useState } from "react";
import Button from "../../components/button";
import Label from "../../components/label";
import { getUsers } from "../../apis/users/users";
import { AxiosError } from "axios";

const Members = () => {
  const [inputId, setInputId] = useState("");
  const [member, setMember] = useState<{
    name: string;
    username: string;
    email: string;
    age: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId) return;

    try {
      const res = await getUsers(Number(inputId));
      setMember(res);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          alert("해당 회원을 찾을 수 없습니다.");
          setMember(null);
          return;
        }
      }

      alert("회원 조회 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full flex items-center flex-col h-full px-8">
      <form
        className="flex flex-col gap-6 mt-4 w-full pt-10"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-gray-800">회원 조회</h3>

        <Label
          label="회원 ID"
          placeholder="ID를 입력해 주세요."
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />

        <Button type="submit" disabled={!inputId}>
          확인
        </Button>
      </form>

      {member && (
        <dl className="grid grid-cols-2 gap-y-3 mt-6 w-full">
          <dt className="text-gray-700 font-medium">이름</dt>
          <dd className="text-gray-900 font-bold text-end">{member.name}</dd>

          <dt className="text-gray-700 font-medium">아이디</dt>
          <dd className="text-gray-900 font-bold text-end">
            {member.username}
          </dd>

          <dt className="text-gray-700 font-medium">이메일</dt>
          <dd className="text-gray-900 font-bold text-end">{member.email}</dd>

          <dt className="text-gray-700 font-medium">나이</dt>
          <dd className="text-gray-900 font-bold text-end">{member.age}</dd>
        </dl>
      )}
    </div>
  );
};

export default Members;
