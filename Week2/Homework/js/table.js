import { MESSAGES } from "./constants.js";
import { saveMembers } from "./storage.js";

// 공통 td 생성 함수
function createTd(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

// 링크 td 생성 함수
function createLinkTd(url, label) {
  const td = document.createElement("td");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = label;
  td.appendChild(a);
  return td;
}

// 체크박스 td 생성
function createCheckboxTd(id) {
  const td = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  td.appendChild(checkbox);
  return td;
}

export function renderTable(tbody, data) {
  tbody.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.style.padding = "20px";
    td.style.color = "gray";
    td.textContent = "데이터가 없습니다.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  data.forEach((member) => {
    const tr = document.createElement("tr");

    const cells = [
      createCheckboxTd(member.id),
      createTd(member.name),
      createTd(member.englishName),
      createLinkTd(`https://github.com/${member.github}`, member.github),
      createTd(member.gender),
      createTd(member.role),
      createTd(member.codeReviewGroup),
      createTd(member.age),
    ];

    tr.append(...cells);
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
