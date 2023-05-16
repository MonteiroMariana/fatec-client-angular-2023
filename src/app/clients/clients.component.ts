import { Client } from './../client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Client[] = [];
  formGroupClient : FormGroup;
  isEditing : boolean = false;

  constructor (private clientService: ClientService,
               private formBuilder: FormBuilder
              ){

    this.formGroupClient = formBuilder.group({
          id : [''],
          name : [''],
          email : ['']
    });

  }




  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
      this.clientService.getClients().subscribe(
        {
            next:  data =>  this.clients = data,
            error: msg  => console.log("Erro ao chamar o endpont " + msg)
        }
      )
  }

  save(){
    if(this.isEditing){

    this.clientService.update(this.formGroupClient.value).subscribe(
      {
        next: data => {
          this.loadClients();
           this.formGroupClient.reset();
            this.isEditing = false;
        }
    });
}

else{

this.clientService.save(this.formGroupClient.value).subscribe(
      {
        next: data => {
            this.clients.push(data);
            this.formGroupClient.reset();
        }
      }
    );
  }
}

remove(clients: Client): void{
  this.clientService.remove(clients).subscribe({
    next: () => this.loadClients()
  });
}

edit(clients: Client): void{
this.formGroupClient.setValue(clients);
this.isEditing = true;
}

}














