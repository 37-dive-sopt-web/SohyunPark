import { MESSAGES } from "./constants.js";
import { saveMembers } from "./storage.js";

export function renderTable(tbody, data) {
  tbody.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="8" style="padding: 20px; color: gray;">
        데이터가 없습니다.
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  data.forEach((member) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" id="${member.id}"/></td>
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

export function setupDelete(deleteBtn, tbody, members, selectAll) {
  deleteBtn.addEventListener("click", () => {
    const checked = Array.from(
      tbody.querySelectorAll("input[type='checkbox']:checked")
    );

    if (checked.length === 0) {
      alert(MESSAGES.NO_SELECTION);
      return;
    }

    const checkedIds = checked.map((box) => parseInt(box.id, 10));

    members = members.filter((member) => !checkedIds.includes(member.id));

    saveMembers(members);
    renderTable(tbody, members);

    if (selectAll) selectAll.checked = false;
  });
}

export function resetSelectAll(tbody, selectAll) {
  selectAll.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const checkboxes = tbody.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  tbody.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const checkboxes = tbody.querySelectorAll("input[type='checkbox']");
      const allChecked = [...checkboxes].every((box) => box.checked);
      selectAll.checked = allChecked;
    }
  });
}
