/* eslint-disable no-console */
export default async function decorate(block) {
  if (!block) return;

  // find the H3 where dropdown should appear (use the specific id if present)
  const targetH3 = block.querySelector('#im-looking-for-jobs-in') || block.querySelector('h3');
  if (!targetH3) {
    // nothing to attach to — bail quietly
    return;
  }

  // build select element
  const select = document.createElement('select');
  select.name = 'dynamic-country';
  select.setAttribute('aria-label', 'Select country');
  select.style.marginLeft = '0.5rem'; // tiny inline spacing so it's visually beside the H3

  // placeholder
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a country';
  select.appendChild(placeholder);

  // insert the select after the H3 so it appears beside/next to it in the DOM
  try {
    targetH3.insertAdjacentElement('afterend', select);
  } catch (e) {
    // fallback: append to block
    // eslint-disable-next-line no-console
    console.warn('Could not insert select after H3, appending to block', e);
    block.appendChild(select);
  }

  // fetch countries from API (adjust apiUrl to your production endpoint)
  const apiUrl = 'https://mocki.io/v1/105615d8-fea5-48bb-8bd6-c09c01d01ebd';

  try {
    const res = await fetch(apiUrl, { credentials: 'omit' });
    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const data = await res.json();
    const countries = Array.isArray(data.countries) ? data.countries : [];

    if (countries.length === 0) {
      const info = document.createElement('option');
      info.value = '';
      info.disabled = true;
      info.textContent = 'No countries available';
      select.appendChild(info);
      return;
    }

    // populate
    countries.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to load countries for dropdown', err);
    const failOpt = document.createElement('option');
    failOpt.value = '';
    failOpt.disabled = true;
    failOpt.textContent = 'Unable to load countries';
    select.appendChild(failOpt);
  }
}
