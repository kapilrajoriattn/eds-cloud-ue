export default function decorate(block) {
  const [child] = block.children;

  // Wrap the text in a <span> for testing
  const span = document.createElement('span');
  span.textContent = `${child.textContent} ok`; // template literal with backticks
  child.replaceChildren(span);
}
