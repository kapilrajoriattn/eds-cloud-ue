export default function decorate(block) {
  const [child] = block.children;

  // Just wrap the text in a <span> for testing
  const span = document.createElement('span');
  span.textContent = child.textContent + " okay!";
  child.replaceChildren(span);
}
