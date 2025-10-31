import { renderTable } from "./table.js";

export function setupFiltering(filteringForm, members, tbody) {
  filteringForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const englishName = document.querySelector("#englishName").value.trim();
    const github = document.querySelector("#githubId").value.trim();
    const gender = document.querySelector("#gender").value;
    const role = document.querySelector("#role").value;
    const codeReviewGroup = parseInt(
      document.querySelector("#codeReviewGroup").value,
      10
    );
    const age = parseInt(document.querySelector("#age").value, 10);

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
