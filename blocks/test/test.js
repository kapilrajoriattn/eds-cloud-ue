export default function decorate(block) {
  const [assetDiv, rteDiv, textDiv] = block.children;

  // Handle asset (reference field, usually image)
  if (assetDiv) {
    const img = assetDiv.querySelector('img');
    if (img) {
      img.classList.add('test-image');
    }
  }

  // Handle RTE
  if (rteDiv) {
    rteDiv.classList.add('test-rte');
  }

  // Handle plain text
  if (textDiv) {
    const span = document.createElement('span');
    span.textContent = `${textDiv.textContent.trim()} ok`;
    textDiv.replaceChildren(span);
  }
}
