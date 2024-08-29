export async function saveToLocalStorage(jsonBlocks, id) {
  localStorage.setItem(`Editor_content_id=${id}`, JSON.stringify(jsonBlocks));
}

export async function getFromLocalStorage(id) {
  const storageString = localStorage.getItem(`Editor_content_id=${id}`);

  return storageString ? JSON.parse(storageString) : undefined;
}

export async function removeFromLocalStorage(id) {
  localStorage.removeItem(`Editor_content_id=${id}`);
}
