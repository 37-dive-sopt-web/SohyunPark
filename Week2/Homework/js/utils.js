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

  const name = qs(normalizeId("name"))?.value.trim() || "";
  const englishName = qs(normalizeId("englishName"))?.value.trim() || "";
  const github = qs(normalizeId("githubId"))?.value.trim() || "";
  const gender = qs(normalizeId("gender"))?.value || "select";
  const role = qs(normalizeId("role"))?.value || "select";
  const codeReviewGroup = parseInt(
    qs(normalizeId("codeReviewGroup"))?.value || "",
    10
  );
  const age = parseInt(qs(normalizeId("age"))?.value || "", 10);

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

export const qs = (selector, parent = document) => {
  const el = parent.querySelector(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
};
