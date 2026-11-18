// Keep conjunctions and punctuation in their surrounding Arabic text node.
export default function BrandText({ text }) {
  return text.split(/(Fopac|ZavodSZ|Gostinets)/g).map((part, index) => /^(Fopac|ZavodSZ|Gostinets)$/.test(part) ? <bdi dir="ltr" key={index}>{part}</bdi> : part);
}
