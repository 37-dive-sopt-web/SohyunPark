export function generateId(members) {
  return members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;
}

export function validateMember({
  name,
  englishName,
  github,
  gender,
  role,
  codeReviewGroup,
  age,
}) {
  return (
    name &&
    englishName &&
    github &&
    gender !== "select" &&
    role !== "select" &&
    !isNaN(codeReviewGroup) &&
    !isNaN(age)
  );
}

export function getFormData(prefix = "") {
  const normalizeId = (id) => (prefix ? `#${prefix}-${id}` : `#${id}`);

  const name = document.querySelector(normalizeId("name"))?.value.trim() || "";
  const englishName =
    document.querySelector(normalizeId("englishName"))?.value.trim() || "";
  const github =
    document.querySelector(normalizeId("githubId"))?.value.trim() || "";
  const gender =
    document.querySelector(normalizeId("gender"))?.value || "select";
  const role = document.querySelector(normalizeId("role"))?.value || "select";
  const codeReviewGroup = parseInt(
    document.querySelector(normalizeId("codeReviewGroup"))?.value || "",
    10
  );
  const age = parseInt(
    document.querySelector(normalizeId("age"))?.value || "",
    10
  );

  return {
    name,
    englishName,
    github,
    gender,
    role,
    codeReviewGroup,
    age,
  };
}
