import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/Http';
import 'rxjs/add/operator/map';

const STORAGE_KEY = 'TASKS';
declare var require: any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  tasks: any[];
  private form : FormGroup;
  

  constructor(public navCtrl: NavController,  private formBuilder: FormBuilder, private storage: Storage) {
    this.form = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }
  
  ionViewDidLoad() {
    this.getTasks();
    console.log(this.tasks)
    //this.storage.clear();
   // this._loadMockData("100");
  }

//   _loadMockData(file) {

//     var jsonfile;

//     this.http.get('file:///www/assets/db/MOCK_DATA_500.json').map(res => res.json()).subscribe(data => {
//       jsonfile = data;
//   });


//     if(file === "100")
//        jsonfile = require('./test.json')
//     else if(file === "500")
//       jsonfile = fs.readFile('./db/MOCK_DATA_500.json')
//     else if(file === "1000")
//       jsonfile = fs.readFile('./db/MOCK_DATA_1000.json')
//     else
//       return;
  
//     //this.tasks = jsonfile;
//     console.log(jsonfile)
//     //this.updateStorage();
    
// }

  getTasks() {
    return this.storage.get(STORAGE_KEY).then( (tasks) => this.tasks = tasks)
  }


  updateStorage() {
    this.storage.set(STORAGE_KEY, this.tasks)
  }

  addTodo() {
    let notNull = this.form.value.task !== null;

    if(notNull) {
      let notEmpty = this.form.value.task.trim().length > 0;
      if(notEmpty) {
        var task_name = this.form.value;
        if(this.tasks == null)
          this.tasks = [];
        this.tasks.push(task_name);
        this.updateStorage();
        console.log(this.tasks)
        this.form.reset();
      }
    }

  }

  removeTodo(obj) {
    console.log(obj)
    var index = this.tasks.indexOf(obj);
    this.tasks.splice(index, 1);
    this.updateStorage();
  }

  logForm() {
    console.log(this.form.value)
  }

}
