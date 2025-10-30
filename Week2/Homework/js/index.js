import { loadMembers, saveMembers, clearMembers } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".table-section__table-body");
  let members = loadMembers();

  renderTable(members);

  function renderTable(data) {
    tbody.innerHTML = "";
    data.forEach((member) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${member.name}</td>
        <td>${member.englishName}</td>
        <td><a href="https://github.com/${member.github}" target="_blank">${member.github}</a></td>
        <td>${member.gender}</td>
        <td>${member.role}</td>
        <td>${member.codeReviewGroup}</td>
        <td>${member.age}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
