/* eslint-disable no-console */
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

  const list = document.createElement('ul');
  list.className = 'dynamiccards-list';
  block.appendChild(list);

  const apiUrl = 'https://mocki.io/v1/105615d8-fea5-48bb-8bd6-c09c01d01ebd';

  try {
    const res = await fetch(apiUrl, { credentials: 'omit' });
    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const data = await res.json();

    // Save countries for use by other blocks (if present)
    if (Array.isArray(data.countries) && data.countries.length > 0) {
      try {
        sessionStorage.setItem('dynamiccards:countries', JSON.stringify(data.countries));
      } catch (e) {
        // ignore storage errors
      }
    }

    // Render children
    const children = Array.isArray(data.children) ? data.children : [];

    if (children.length === 0) {
      list.textContent = 'No child pages found.';
      return;
    }

    children.forEach((child) => {
      const li = document.createElement('li');

      // Title
      const titleEl = document.createElement('div');
      titleEl.className = 'dynamiccard-title';
      titleEl.textContent = child.title || 'Untitled';
      li.appendChild(titleEl);

      // Description
      if (child.description) {
        const descEl = document.createElement('div');
        descEl.className = 'dynamiccard-desc';
        descEl.textContent = child.description;
        li.appendChild(descEl);
      }

      // Thumbnail (if provided)
      if (child.thumbnail) {
        const img = document.createElement('img');
        img.className = 'dynamiccard-thumb';
        img.setAttribute('alt', child.title || 'thumbnail');
        img.setAttribute('loading', 'lazy');
        img.src = child.thumbnail;
        li.insertBefore(img, titleEl); // show thumbnail before title
      }

      list.appendChild(li);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch dynamic children', err);
    list.textContent = 'Error loading child pages.';
  }
}
