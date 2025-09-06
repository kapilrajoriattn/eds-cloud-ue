export default function decorate($block) {
  const link = $block.querySelector('a');
  if (!link) return;

  // Prefer the title attribute as the true video URL
  const videoUrl = link.getAttribute('title') || link.getAttribute('href');
  if (!videoUrl || !videoUrl.endsWith('.mp4')) return;

  // Build the <video> element
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.setAttribute('controls', '');
  video.setAttribute('preload', 'metadata');

  // If you want autoplay support, check for a class on the block
  if ($block.classList.contains('autoplay')) {
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
  }

  const source = document.createElement('source');
  source.src = videoUrl;
  source.type = 'video/mp4';
  video.appendChild(source);

  // Replace the authored link with the video player
  link.replaceWith(video);
}
