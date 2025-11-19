import Button from "../../components/button";
import Label from "../../components/label";

const Members = () => {
  return (
    <div className="w-full flex items-center flex-col h-full px-8">
      <form className="flex flex-col gap-6 mt-4 w-full pt-10">
        <h3 className="text-2xl font-bold text-gray-800">회원 조회</h3>
        <Label label="회원 ID" placeholder="ID를 입력해 주세요." />
        <Button type="submit">확인</Button>
      </form>
      <dl className="grid grid-cols-2 gap-y-3 mt-6 w-full">
        <dt className="text-gray-700 font-medium">이름</dt>
        <dd className="text-gray-900 font-bold text-end">이름</dd>

        <dt className="text-gray-700 font-medium">아이디</dt>
        <dd className="text-gray-900 font-bold text-end">아이디</dd>

        <dt className="text-gray-700 font-medium">이메일</dt>
        <dd className="text-gray-900 font-bold text-end">이메일</dd>

        <dt className="text-gray-700 font-medium">나이</dt>
        <dd className="text-gray-900 font-bold text-end">나이</dd>
      </dl>
    </div>
  );
};

export default Members;
