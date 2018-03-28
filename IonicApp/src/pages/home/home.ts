import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { DataFinder } from '../../providers/datafinder';

const STORAGE_KEY = 'TASKS';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('content') content:any;

  tasks: any[];
  private form : FormGroup;
  

  constructor(public navCtrl: NavController,  private formBuilder: FormBuilder, private storage: Storage, private dataFinder : DataFinder) {
    this.form = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }
  
  ionViewDidLoad() {
    this.getTasks();
    this.storage.clear();
    this._loadMockData("100");
  }

  async _loadMockData(file) {

    if(file === "100")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_100.json").then(data => {
        this.tasks = data;
      });
    else if(file === "500")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_500.json").then(data => {
        this.tasks = data;
      });
    else if(file === "1000")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_1000.json").then(data => {
        this.tasks = data;
      });
    else
      return;

    this.updateStorage();
    
}

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
        this.form.reset();
      }
    }

    this.content.scrollToBottom(300);

  }

  removeTodo(obj) {
    var index = this.tasks.indexOf(obj);
    this.tasks.splice(index, 1);
    this.updateStorage();
  }

  logForm() {
    console.log(this.form.value)
  }

}
