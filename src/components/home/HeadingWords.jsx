// These runs are rendered into the original prerendered HTML, not created by a
// browser animation/splitting library. Whole Arabic words retain their shaping.
export default function HeadingWords({ children }) {
  return String(children).split(/(\s+)/u).map((word,index) => /\S/u.test(word)
    ? <span className="motion-heading-word" key={index}>{word}</span> : word);
}
