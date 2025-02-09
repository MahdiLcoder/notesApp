import { create } from "zustand";

interface Note {
text: string;
color: string;
}

interface NotesState {
notes: Note[];
search: string;
editorContent: string;
noteColor: string;
currentNoteIndex: number | null;
setNotes: (updatedNotes: Note[]) => void;
setSearch: (searchValue: string) => void;
setEditorContent: (content: string) => void;
setNoteColor: (color: string) => void;
setCurrentNoteIndex: (index: number | null) => void;
addOrUpdateNote: () => void;
selectNote: (index: number) => void;
}

const useNoteStore = create<NotesState>((set, get) => ({
notes: [],
search: "",
editorContent: "",
noteColor: "#ffffff",
currentNoteIndex: null,

setNotes: (updatedNotes) => set({ notes: updatedNotes }),
setSearch: (searchValue) => set({ search: searchValue }),
setEditorContent: (content) => set({ editorContent: content }),
setNoteColor: (color) => set({ noteColor: color }),
setCurrentNoteIndex: (index) => set({ currentNoteIndex: index }),

addOrUpdateNote: () => {
    set((state) => {
    const { notes, editorContent, noteColor, currentNoteIndex } = state;
    if (!editorContent.trim()) return state; // Prevent empty notes

    const updatedNotes = [...notes];

    if (currentNoteIndex !== null) {
        // Update existing note (immutable way)
        updatedNotes[currentNoteIndex] = { text: editorContent, color: noteColor };
    } else {
        // Add new note
        updatedNotes.push({ text: editorContent, color: noteColor });
    }

    return {
        notes: updatedNotes,
        editorContent: "",
        noteColor: "#ffffff",
        currentNoteIndex: null,
    };
    });
},

selectNote: (index) => {
    set((state) => {
    if (index < 0 || index >= state.notes.length) return state; // Prevent invalid index access
    return {
        currentNoteIndex: index,
        editorContent: state.notes[index].text,
        noteColor: state.notes[index].color,
    };
    });
},
}));

export default useNoteStore;
