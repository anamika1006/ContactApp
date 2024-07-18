import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  ngOnInit(): void {
    let savedContacts=localStorage.getItem("allSavedContacts");
    this.allContacts=savedContacts?JSON.parse(savedContacts):[];
    
  }

  contactName:string="";
  contactNumber:string="";
  contactEmail:string="";
  isEditing: boolean = false;
  editingContactIndex: number | null = null;


  allContacts:Contact[]=[];


  createContact(){

  let contact:Contact={
    id:this.getRandomTaskId(),
    name:this.contactName,
    phone_number:this.contactNumber,
    email:this.contactEmail

  };

  this.allContacts.push(contact);

  localStorage.setItem("allSavedContacts",JSON.stringify(this.allContacts));


  this.contactName="";
  this.contactNumber="";
  this.contactEmail="";
}

editContact(index:number)
{
 const contact= this.allContacts[index];
 this.contactName=contact.name;
 this.contactNumber = contact.phone_number;
  this.contactEmail = contact.email;
  this.isEditing = true;
  this.editingContactIndex = index;
}

saveContact(): void {
  if (this.editingContactIndex !== null) {
    this.allContacts[this.editingContactIndex] = {
      id: this.allContacts[this.editingContactIndex].id,
      name: this.contactName,
      phone_number: this.contactNumber,
      email: this.contactEmail
    };

    localStorage.setItem("allSavedContacts", JSON.stringify(this.allContacts));
    this.contactName = "";
    this.contactNumber = "";
    this.contactEmail = "";
    this.isEditing = false;
    this.editingContactIndex = null;
  }
}

deleteContact(index:number)
{
  this.allContacts.splice(index,1);
  localStorage.setItem("allSavedContacts",JSON.stringify(this.allContacts));
}

  getRandomTaskId(): string {
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result =
        result +
        characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return result;
  }

}

interface Contact{
  id:string,
  name:string,
  phone_number:string,
  email:string
}
