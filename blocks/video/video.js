export default function decorate(block) {
  const [assetDiv] = block.children;
  if (!assetDiv) return;

  const link = assetDiv.querySelector('a');
  if (!link) return;

  // authored DAM URL (e.g., /content/dam/...)
  const damUrl = link.href;

  // Franklin runtime normally rewrites /content/dam/... to /media_<hash>...
  // For UE blocks, we can just use the link directly:
  const videoUrl = damUrl;

  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';

  const source = document.createElement('source');
  source.src = videoUrl;
  source.type = 'video/mp4';
  video.appendChild(source);

  assetDiv.replaceChildren(video);
}
