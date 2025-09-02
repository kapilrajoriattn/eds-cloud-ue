import { createOptimizedVideo } from '../../scripts/aem.js';

export default function decorate(block) {
  const [assetDiv] = block.children;
  if (!assetDiv) return;

  const link = assetDiv.querySelector('a');
  if (!link) return;

  const video = createOptimizedVideo(link.href);
  assetDiv.replaceChildren(video);
}
