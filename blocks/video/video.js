export default function decorate(block) {
  // Grab the first (and only) authored field
  const [assetDiv] = block.children;

  if (!assetDiv) return;

  // Look for a link inside the authored div (usually reference fields render as <a> or direct URL)
  const link = assetDiv.querySelector('a');
  let videoUrl = null;

  if (link) {
    videoUrl = link.href;
  } else {
    // Sometimes the URL might be plain text
    videoUrl = assetDiv.textContent.trim();
  }

  if (videoUrl) {
    const video = document.createElement('video');
    video.setAttribute('controls', true);
    video.setAttribute('playsinline', true);

    // optional: preload metadata only
    video.setAttribute('preload', 'metadata');

    // Source
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4'; // adjust if you expect webm/ogg
    video.appendChild(source);

    // Replace the authored div with your <video>
    assetDiv.replaceChildren(video);
  }
}
