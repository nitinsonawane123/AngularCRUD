import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { PersonModel } from './person.model';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  
  
  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel(); 
  personData : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Name : [''],
      email : [''],
      dob : [''],
      avatar : [''],
      country : ['']

    })
    this.getAllPerson();
  }
  clickAddPerson(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postPersonDetails(){
    this.personModelObj.Name = this.formValue.value.Name;
    this.personModelObj.email = this.formValue.value.email;
    this.personModelObj.dob = this.formValue.value.dob;
    this.personModelObj.avatar = this.formValue.value.avatar;
    this.personModelObj.country = this.formValue.value.country;
    this.api.postPerson(this.personModelObj)
    .subscribe(res=>{
      console.log(res);
    
      //alert("Person Add Succesfully");
      this.toastr.success("Person Add Succesfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllPerson();
    },
     _err=>{
       //alert("Something Went Wrong")
       this.toastr.warning("Something Went Wrong");
     })
  }
  getAllPerson(){
    this.api.getperson()
    .subscribe(res=>{
        this.personData = res;
    })
  }
  deletePerson(row:any){
    this.api.deletePerson(row.id)
    .subscribe(res=>{
      this.toastr.warning("person Deleted Successfully");
      this.getAllPerson();
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.personModelObj.id = row.id;
    this.formValue.controls['Name'].setValue(row.Name)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['dob'].setValue(row.dob)
    this.formValue.controls['avatar'].setValue(row.avatar)
    this.formValue.controls['country'].setValue(row.country)
  }
  updatePersonDetails(){
    this.personModelObj.Name = this.formValue.value.Name;
    this.personModelObj.email = this.formValue.value.email;
    this.personModelObj.dob = this.formValue.value.dob;
    this.personModelObj.avatar = this.formValue.value.avatar;
    this.personModelObj.country = this.formValue.value.country;

    this.api.updatePerson(this.personModelObj,this.personModelObj.id)
    .subscribe(res=>{
     // alert("Update Successfully")
      this.toastr.success("Updated Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllPerson();
    })
}
}
