// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // // const children = [...block.children];
  // // for (let i = 0; i < children.length; i += 2) {
  // //   // Create a new wrapper div
  // //   const wrapper = document.createElement('div');
  // //   wrapper.className = 'wrapper'; // optional: for styling

  // //   // Move the next two children into the wrapper
  // //   if (children[i]) wrapper.appendChild(children[i]);
  // //   if (children[i + 1]) wrapper.appendChild(children[i + 1]);

  // //   // Insert the wrapper before the first child being wrapped
  // //   block.appendChild(wrapper);
  // // }
  // // build tablist
  // const tablist = document.createElement('div');
  // tablist.className = 'tabs-list';
  // tablist.setAttribute('role', 'tablist');

  // // decorate tabs and tabpanels
  // // const tabs = [...block.children].map((child) => child.firstElementChild);
  // const tabs = [...block.children].filter((element, index) => (index + 1) % 2 !== 0);

  // tabs.forEach((tab, i) => {
  //   const id = toClassName(tab.textContent);

  //   // build tab button
  //   const button = document.createElement('button');
  //   button.className = 'tabs-tab';
  //   button.id = `tab-${id}`;
  //   button.innerHTML = tab.innerHTML;
  //   button.setAttribute('aria-controls', `tabpanel-${id}`);
  //   button.setAttribute('aria-selected', !i);
  //   button.setAttribute('role', 'tab');
  //   button.setAttribute('type', 'button');

  //   // decorate tabpanel
  //   const tabspanel = [...block.children].filter((element, index) => (index + 1) % 2 === 0);
  //   console.log('tabspanel ', tabspanel);
  //   tabspanel.forEach((tabpanel) => {
  //     tabpanel.className = 'tabs-panel';
  //     tabpanel.id = `tabpanel-${id}`;
  //     tabpanel.setAttribute('aria-hidden', !!i);
  //     tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
  //     tabpanel.setAttribute('role', 'tabpanel');
      
  //     // button.addEventListener('click', () => {
  //     //   block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
  //     //     panel.setAttribute('aria-hidden', true);
  //     //   });
  //     //   tablist.querySelectorAll('button').forEach((btn) => {
  //     //     btn.setAttribute('aria-selected', false);
  //     //   });
  //     //   tabpanel.setAttribute('aria-hidden', false);
  //     //   button.setAttribute('aria-selected', true);
  //     // });
  //     tablist.append(button);
  //     tab.remove();
  //   });
  // });
  // block.prepend(tablist);

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
