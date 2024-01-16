import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.page.html',
  styleUrls: ['./sqlite.page.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonList,
    IonIcon,
  ],
})
export class SqlitePage implements OnInit, OnDestroy {
  sqlite!: SQLiteConnection;
  db!: SQLiteDBConnection;
  open = false;
  persons: { id?: number; name: string; age: number }[] = [];
  person: { id?: number; name: string; age: number } = {
    name: '',
    age: 0,
  };

  async ngOnInit() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db = await this.sqlite.createConnection(
      'testsqlite',
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();
    this.open = true;

    await this.db.execute(`CREATE TABLE IF NOT EXISTS person (
      id integer primary key,
      name text not null,
      age integer not null)`);

    const result = await this.db.query('SELECT * FROM person');
    this.persons = result.values!;
  }

  async ngOnDestroy() {
    if (this.open) {
      console.log('Closing connection');
      await this.sqlite.closeConnection('testsqlite', false);
    }
  }

  async add(personForm: NgForm) {
    if (!this.open) {
      return;
    }

    const addRes = await this.db.run(
      'INSERT INTO person (name, age) VALUES (?,?)',
      [this.person.name, this.person.age]
    );

    const idRes = await this.db.query('SELECT last_insert_rowid()');

    this.person.id = +Object.values<number>(idRes.values![0])[0];
    this.persons.push(this.person);
    this.person = { name: '', age: 0 };
    personForm.resetForm(); // Resets validation styles
  }

  async remove(person: { id?: number; name: string; age: number }, index: number) {
    if (!this.open) {
      return;
    }

    const delRes = await this.db.run('DELETE FROM person WHERE id = ?', [
      person.id,
    ]);

    if (delRes.changes!.changes! > 0) {
      this.persons.splice(index, 1);
    }
  }
}
