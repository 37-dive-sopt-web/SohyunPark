import { loadMembers } from "./storage.js";
import { renderTable, resetSelectAll, setupDelete } from "./table.js";
import { setupFiltering } from "./filter.js";
import { setupModal } from "./modal.js";
import { qs } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const filteringForm = qs(".search");
  const deleteBtn = qs("#delete-btn");
  const addBtn = qs("#add-btn");
  const tbody = qs(".table-section__table-body");
  let members = loadMembers();
  const selectAll = qs("#select-all");

  const modal = qs(".modal");
  const closeModalBtn = qs(".modal__close-btn");
  const modalForm = qs(".modal__form");

  renderTable(tbody, members);
  setupFiltering(filteringForm, members, tbody);
  resetSelectAll(tbody, selectAll);
  setupDelete(deleteBtn, tbody, members, selectAll);

  addBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  setupModal(modal, modalForm, closeModalBtn, members, tbody);
});
