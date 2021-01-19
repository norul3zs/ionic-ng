import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStorage } from '../services/storage/storage.model';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: TaskStorage[]; 

    constructor(
      private router: Router,
      private storageService: StorageService,
    ) {}

    ngOnInit(){

    }

    //rujuk ionic life cycle
    ionViewDidEnter(){
      this.getTasks();
    }

    ionViewDidLeave(){
      console.log();
    }

    // clickMe(){
    //   alert("Hello I'm Nurul");
    //     if(this.buttonColor == "danger"){
    //       this.buttonColor = "primary" ;
    //     } else {
    //       this.buttonColor = "danger";
    //     }

    toForm(){
      const url = "/form";
      this.router.navigateByUrl(url); //tak perlu letak"" sbb kita guna string"
    }

    async getTasks(){
      this.tasks = await this.storageService.read();

    }

    async deleteTask(index: number){
      // console.log(index);
      this.tasks.splice(index,1);
      await this.storageService.update(this.tasks);
    }

    async clearAll(){
      this.tasks = await this.storageService.delete();
    }    
    
}
