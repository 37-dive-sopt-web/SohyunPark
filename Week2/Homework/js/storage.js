import { members } from "./data.js";

const STORAGE_KEY = "membersData";

export function loadMembers() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return members;
}

export function saveMembers(membersData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(membersData));
}

export function clearMembers() {
  localStorage.removeItem(STORAGE_KEY);
}
