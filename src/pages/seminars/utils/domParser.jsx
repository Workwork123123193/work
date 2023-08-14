export const domParser = (description) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, 'text/html');
  const listItems = Array.from(doc.querySelectorAll('li')).map((li) => li.textContent);

  return listItems;
};
