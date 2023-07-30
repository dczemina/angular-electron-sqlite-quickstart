import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-electron-sqlite-quickstart';

  dataFromApi: string[] = [];

  constructor() {
    // Call the function exposed to Angular from the preloader.js
    window.electronAPI.queryDatabaseExampleTable()
      .then(
        (data: string[]) => {
          // store the data in a variable
          this.dataFromApi = data;
          console.log('dataFromApi', this.dataFromApi);
        },
        (reject: any) => {
          console.log('reject', reject);
        }
      );
  }
}
