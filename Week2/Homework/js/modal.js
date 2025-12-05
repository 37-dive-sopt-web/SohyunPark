import { MESSAGES } from "./constants.js";
import { saveMembers } from "./storage.js";
import { renderTable } from "./table.js";
import { generateId, validateMember } from "./utils.js";
import { getFormData } from "./utils.js";

export function setupModal(modal, modalForm, closeModalBtn, members, tbody) {
  const hideModal = () => modal.classList.remove("show");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });

  closeModalBtn.addEventListener("click", () => {
    hideModal();
  });

  const closeModal = () => {
    hideModal();
    modalForm.reset();
  };

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = getFormData("modal");

    const newId = generateId(members);

    const newMember = {
      id: newId,
      ...formData,
    };

    if (!validateMember(newMember)) {
      alert(MESSAGES.INVALID_FORM);
      return;
    }

    members.push(newMember);
    saveMembers(members);
    renderTable(tbody, members);
    closeModal();
  });
}
