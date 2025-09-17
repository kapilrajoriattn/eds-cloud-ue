export default function decorate(block) {
  const children = [...block.children];
  const heroClass = children[2].querySelector('div p').innerHTML;
  block.classList.add(heroClass);
  block.removeChild(children[2]);
}
