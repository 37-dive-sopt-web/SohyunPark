import { loadMembers, saveMembers } from "./storage.js";
import { renderTable, resetSelectAll, setupDelete } from "./table.js";
import { setupFiltering } from "./filter.js";
import { setupModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const filteringForm = document.querySelector(".search");
  const deleteBtn = document.querySelector("#delete-btn");
  const addBtn = document.querySelector("#add-btn");
  const tbody = document.querySelector(".table-section__table-body");
  let members = loadMembers();
  const selectAll = document.querySelector("#select-all");

  const modal = document.querySelector(".modal");
  const closeModalBtn = document.querySelector(".modal__close-btn");
  const modalForm = document.querySelector(".modal__form");

  renderTable(tbody, members);
  setupFiltering(filteringForm, members, tbody);
  resetSelectAll(tbody, selectAll);
  setupDelete(deleteBtn, tbody, members, selectAll);

  addBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  setupModal(modal, modalForm, closeModalBtn, members, tbody);
});
