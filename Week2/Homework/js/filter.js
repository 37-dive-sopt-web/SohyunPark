import { renderTable } from "./table.js";
import { getFormData } from "./utils.js";

export function setupFiltering(filteringForm, members, tbody) {
  filteringForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, englishName, github, gender, role, codeReviewGroup, age } =
      getFormData();

    const filteredMembers = members.filter((member) => {
      return (
        (name === "" || member.name.includes(name)) &&
        (!englishName ||
          member.englishName
            .toLowerCase()
            .includes(englishName.toLowerCase())) &&
        (!github ||
          member.github.toLowerCase().includes(github.toLowerCase())) &&
        (gender === "all" || member.gender === gender) &&
        (role === "all" || member.role === role) &&
        (isNaN(codeReviewGroup) ||
          member.codeReviewGroup === codeReviewGroup) &&
        (isNaN(age) || member.age === age)
      );
    });

    renderTable(tbody, filteredMembers);
  });

  filteringForm.addEventListener("reset", () => {
    renderTable(members);
  });
}
