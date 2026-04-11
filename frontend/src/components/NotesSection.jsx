import "./NotesSection.css";

function NotesSection() {
    const notes = [
  {
    id: 1,
    name: "Sarah & Ciaran",
    text: "Anouska managed to capture, not only our love but that of our families in her photography...",
    image: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg",
    position: "top-left",
  },
  {
    id: 2,
    name: "Maria & Adrian",
    text: "Words can't truly capture how grateful we are...",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
    position: "top-right",
  },
  {
    id: 3,
    name: "Alexandra & Casey",
    text: "For my bridal portraits, it was ridiculously easy to turn on my personality and confidence...",
    image: "https://images.pexels.com/photos/1850603/pexels-photo-1850603.jpeg",
    position: "bottom-left",
  },
];
  return (

    <section className="love-notes" aria-labelledby="love-notes-title">
      <h2 id="love-notes-title" className="love-notes__title">
        LOVE NOTES
      </h2>
      <span className="love-notes__line" />

      {notes.map((note) => (
        <article key={note.id} className={`love-note love-note--${note.position}`}>
          <img src={note.image} alt={note.name} className="love-note__photo" />
          <div>
            <p className="love-note__text">"{note.text}"</p>
            <p className="love-note__author">- {note.name}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default NotesSection