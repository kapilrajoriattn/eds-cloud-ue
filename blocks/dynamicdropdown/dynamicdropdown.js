/* eslint-disable no-console */
export default async function decorate(block) {
  // remove authoring wrappers
  block.innerHTML = '';

  // create select
  const select = document.createElement('select');
  select.name = 'dynamic-country';
  select.setAttribute('aria-label', 'Select country');

  // placeholder option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a country';
  select.appendChild(placeholder);

  block.appendChild(select);

  // helper to populate select from array of strings
  function populateCountries(arr) {
    // remove existing non-placeholder options
    [...select.querySelectorAll('option')].forEach((opt, idx) => {
      if (idx === 0) return; // keep placeholder
      opt.remove();
    });

    arr.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  }

  // Try sessionStorage first (shared by dynamiccards block)
  try {
    const stored = sessionStorage.getItem('dynamiccards:countries');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        populateCountries(parsed);
        return;
      }
    }
  } catch (err) {
    // ignore storage errors and fall back to API
  }

  // Fallback: fetch the API to get countries (adjust apiUrl as needed)
  const apiUrl = 'https://mocki.io/v1/105615d8-fea5-48bb-8bd6-c09c01d01ebd';

  try {
    const res = await fetch(apiUrl, { credentials: 'omit' });
    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const data = await res.json();
    const countries = Array.isArray(data.countries) ? data.countries : [];

    if (countries.length === 0) {
      // show a disabled informative option
      const info = document.createElement('option');
      info.value = '';
      info.disabled = true;
      info.textContent = 'No countries available';
      select.appendChild(info);
      return;
    }

    // cache for other blocks
    try {
      sessionStorage.setItem('dynamiccards:countries', JSON.stringify(countries));
    } catch (e) {
      // ignore storage errors
    }

    populateCountries(countries);
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
