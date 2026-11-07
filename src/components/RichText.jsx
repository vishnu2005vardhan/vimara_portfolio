// Tiny renderer: **bold**, links and newlines — safe (no innerHTML).
export default function RichText({ text }) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block min-h-[1em]">
      {line.split(/(\*\*[^*]+\*\*|https?:\/\/\S+|\S+@\S+\.\w+)/g).map((part, j) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>
        if (/^https?:\/\//.test(part)) return <a key={j} href={part} target="_blank" rel="noreferrer" className="text-neon-cyan underline decoration-dotted break-all">{part.replace(/^https?:\/\/(www\.)?/, '')}</a>
        if (/^\S+@\S+\.\w+$/.test(part)) return <a key={j} href={`mailto:${part}`} className="text-neon-cyan underline decoration-dotted">{part}</a>
        return part
      })}
    </span>
  ))
}
