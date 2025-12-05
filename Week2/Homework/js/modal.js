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
      name: formData.name,
      englishName: formData.englishName,
      github: formData.github,
      gender: formData.gender,
      role: formData.role,
      codeReviewGroup: formData.codeReviewGroup,
      age: formData.age,
    };

    if (!validateMember(newMember)) {
      alert("모든 필드를 올바르게 입력해주세요!");
      return;
    }

    members.push(newMember);
    saveMembers(members);
    renderTable(tbody, members);
    closeModal();
  });
}
