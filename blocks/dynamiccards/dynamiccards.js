export default async function decorate(block) {
  const link = block.querySelector('a');
  if (!link) {
    return;
  }

  const parentPath = link.getAttribute('title');
  if (!parentPath) {
    return;
  }

  // Remove the authored link (clean UI)
  const buttonContainer = link.closest('.button-container');
  if (buttonContainer) {
    buttonContainer.remove();
  }

  const container = document.createElement('ul');

  try {
    const queryUrl = `${window.location.origin}/bin/querybuilder.json?path=${encodeURIComponent(parentPath)}&type=cq:Page&p.limit=50`;
    const res = await fetch(queryUrl, { credentials: 'same-origin' });
    if (!res.ok) {
      throw new Error(`Query failed: ${res.status}`);
    }

    const data = await res.json();

    if (data.hits && data.hits.length > 0) {
      data.hits.forEach((hit) => {
        const li = document.createElement('li');
        li.textContent = `${hit.title} (${hit.name})`;
        container.appendChild(li);
      });
    } else {
      container.textContent = 'No child pages found.';
    }
  } catch (err) {
    // Log for debugging but still show fallback text
    // eslint-disable-next-line no-console
    console.error('Failed to load child pages', err);
    container.textContent = 'Error loading child pages.';
  }

  block.appendChild(container);
}
