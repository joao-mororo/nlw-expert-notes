import { ChangeEvent, useState } from "react";
import Logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCard";

interface Note {
  id: string;
  date: Date;
  content: string;
}

function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });
  const filteredNotes = notes.filter((note) =>
    note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const newNotesArray = [newNote, ...notes];

    setNotes(newNotesArray);
    localStorage.setItem("notes", JSON.stringify(newNotesArray));
  };

  const onNoteDeleted = (id: string) => {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    localStorage.setItem("notes", JSON.stringify(newNotesArray));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={Logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas"
          value={search}
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  );
}
export default App;
