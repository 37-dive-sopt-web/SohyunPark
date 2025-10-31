import { loadMembers, saveMembers, clearMembers } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".search");
  const deleteBtn = document.querySelector("#delete-btn");
  const addBtn = document.querySelector("#add-btn");
  const tbody = document.querySelector(".table-section__table-body");
  let members = loadMembers();
  const selectAll = document.querySelector("#select-all");

  const modal = document.querySelector(".modal");
  const closeModalBtn = document.querySelector(".modal__close-btn");
  const modalForm = document.querySelector(".modal__form");

  renderTable(members);

  function renderTable(data) {
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

  renderTable(members);

  form.addEventListener("submit", (e) => {
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

    renderTable(filteredMembers);
  });

  form.addEventListener("reset", () => {
    renderTable(members);
  });

  deleteBtn.addEventListener("click", () => {
    const checkedBoxes = Array.from(
      tbody.querySelectorAll("input[type='checkbox']:checked")
    );

    if (checkedBoxes.length === 0) {
      alert("삭제할 멤버가 없습니다.");
      return;
    }

    const checkedIds = checkedBoxes.map((box) => parseInt(box.id, 10));

    members = members.filter((member) => !checkedIds.includes(member.id));

    saveMembers(members);
    renderTable(members);

    if (selectAll) selectAll.checked = false;
  });

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
      const allChecked = Array.from(checkboxes).every((box) => box.checked);
      selectAll.checked = allChecked;
    }
  });

  addBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#modal-name").value.trim();
    const englishName = document
      .querySelector("#modal-englishName")
      .value.trim();
    const github = document.querySelector("#modal-githubId").value.trim();
    const gender = document.querySelector("#modal-gender").value;
    const role = document.querySelector("#modal-role").value;
    const codeReviewGroup = parseInt(
      document.querySelector("#modal-codeReviewGroup").value,
      10
    );
    const age = parseInt(document.querySelector("#modal-age").value, 10);

    if (
      !name ||
      !englishName ||
      !github ||
      gender === "select" ||
      role === "select" ||
      isNaN(age) ||
      isNaN(codeReviewGroup)
    ) {
      alert("모든 필드를 올바르게 입력해주세요!");
      return;
    }

    const newMember = {
      id: members.length > 0 ? members[members.length - 1].id + 1 : 1,
      name,
      englishName,
      github,
      gender,
      role,
      codeReviewGroup,
      age,
    };

    members.push(newMember);
    saveMembers(members);
    renderTable(members);
    modal.classList.remove("show");
    modalForm.reset();
  });
});
