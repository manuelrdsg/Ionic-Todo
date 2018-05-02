import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { DataFinder } from '../../providers/datafinder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ipServer } from '../../providers/variables';

const STORAGE_KEY = 'TASKS';
declare var process: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('content') content: any;

  tasks: any[];
  Times = {loadJson: [],
           loadJsonAverage: 0.000000,
           addTasks: [],
           addTasksAverage: 0.000000,
           getTasks: [],
           getTasksAverage: 0.000000,
           removeTasks: [],
           removeTasksAverage: 0.000000
          };
  private form: FormGroup;


  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage, private dataFinder: DataFinder, private http:HttpClient) {
    this.form = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    //this.getTasks();
    //this.storage.clear();


    this._loadMockData("500");

    //this.sendTimes();
  }

  sendTimes(){
    console.log(this.Times);
   
    this.Times.addTasksAverage = this.Times.addTasks.reduce((a, b) => a + b, 0)/this.Times.addTasks.length;
    this.Times.removeTasksAverage = this.Times.removeTasks.reduce((a, b) => a + b, 0)/this.Times.removeTasks.length;
    this.Times.getTasksAverage = this.Times.getTasks.reduce((a, b) => a + b, 0)/this.Times.getTasks.length;
    this.Times.loadJsonAverage = this.Times.loadJson.reduce((a, b) => a + b, 0)/this.Times.loadJson.length;
    console.log("AddTasks() Average", this.Times.addTasksAverage);
    console.log("RemoveTasks() Average", this.Times.removeTasksAverage);
    console.log("GetTasks() Average", this.Times.getTasksAverage);
    console.log("LoadJSON() Average", this.Times.loadJsonAverage);

    this.http.post(ipServer, this.Times).subscribe();
  }

  async _loadMockData(file) {

    var t1 = performance.now();

    if (file === "100")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_100.json").then(data => {
        this.tasks = data;
      });
    else if (file === "500")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_500.json").then(data => {
        this.tasks = data;
      });
    else if (file === "1000")
      await this.dataFinder.getJSONDataAsync("./assets/db/MOCK_DATA_1000.json").then(data => {
        this.tasks = data;
      });
    else
      return;

    this.updateStorage();

    var t2 = performance.now()

    this.Times.loadJson.push(t2-t1);
    console.log("LoadJson: ", this.Times.loadJson.length);

  }

  doRefresh(refresher) {

    this.getTasks();

    setTimeout(() => {
      refresher.complete();
    }, 20);
  }

  scrollTop() {
    this.content.scrollToTop(300);
  }


  getTasks() {
    let t1 = performance.now()

    var a: any;
    a = this.storage.get(STORAGE_KEY).then((tasks) => this.tasks = tasks);

    let t2 = performance.now()

    this.Times.getTasks.push(t2-t1);
    console.log("getTasks: ",this.Times.getTasks.length);
    
    return a;
  }


  updateStorage() {
    this.storage.set(STORAGE_KEY, this.tasks)
  }

  addTodo() {
    let t1 = performance.now()

    let notNull = this.form.value.task !== null;

    if (notNull) {
      let notEmpty = this.form.value.task.trim().length > 0;
      if (notEmpty) {
        var task_name = this.form.value;
        if (this.tasks == null)
          this.tasks = [];
        this.tasks.push(task_name);
        this.updateStorage();
        this.form.reset();
      }
    }

    this.content.scrollToBottom(300);

    let t2 = performance.now()
    this.Times.addTasks.push(t2-t1);
    console.log("addTodo: ", this.Times.addTasks.length);

  }

  removeTodo(obj) {
    let t1 = window.performance.now()

    var index = this.tasks.indexOf(obj);
    this.tasks.splice(index, 1);
    this.updateStorage();

    let t2 = window.performance.now();
    this.Times.removeTasks.push(t2-t1);
    console.log("removeTodo: ",this.Times.removeTasks.length);
  }

  logForm() {
    console.log(this.form.value)
  }

}
