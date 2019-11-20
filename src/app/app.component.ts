import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errMessage: "Title and Text both are required fields";
  note: Note = new Note();
  notes: Array<Note> = [];
  title: string;
  text: string;
  constructor(private notelist: NotesService) {
  }
  addNote1() {
    if (this.note.text === '' || this.note.title === '') {
      this.errMessage = "Title and Text both are required fields";
    }
    console.log("In addNote()");
    this.notes.push(this.note);
    this.notelist.addNote(this.note).subscribe((data) => {
    },
      error => {
        this.errMessage = error.message;
        console.log(this.errMessage);
        this.notes.pop();
      });
    // console.log(this.note.text);
  }
  ngOnInit() {
    this.note = new Note();
    this.notelist.getNotes().subscribe(
      data => {
        console.log(data);
        this.notes = data;
      },
      error => {
        this.errMessage = error.message;
      }
    );
  }
}
