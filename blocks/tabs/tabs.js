// eslint-disable-next-line import/no-unresolved

export default async function decorate(block) {
  const children = Array.from(block.children);

  // Extract titles and content in [title, content, title, content] order
  const tabTitles = children.filter((element, index) => (index + 1) % 2 !== 0);
  const tabContents = children.filter((element, index) => (index + 1) % 2 === 0);
  // Create containers for tab headers and contents
  const tabsHeader = document.createElement('div');
  tabsHeader.className = 'tabs-header';
  const tabsContentContainer = document.createElement('div');
  tabsContentContainer.className = 'tabs-content';

  // Create tab buttons and content panels
  tabTitles.forEach((titleDiv, idx) => {
    // Create tab button
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = titleDiv.textContent.trim();
    btn.dataset.idx = idx;
    if (idx === 0) btn.classList.add('active');
    tabsHeader.appendChild(btn);

    // Prepare content panel
    const panel = tabContents[idx];
    panel.className = 'tab-panel';
    if (idx !== 0) panel.style.display = 'none';
    tabsContentContainer.appendChild(panel);
  });

  // Clear and rebuild the tabs block
  block.innerHTML = '';
  block.appendChild(tabsHeader);
  block.appendChild(tabsContentContainer);

  // Add JS tab click logic
  tabsHeader.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      const idx = +e.target.dataset.idx;
      // Switch active tab
      [...tabsHeader.children].forEach((btn, i) => {
        btn.classList.toggle('active', idx === i);
        tabsContentContainer.children[i].style.display = (idx === i) ? '' : 'none';
      });
    }
  });
}
