import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ExpenseServiceService } from '../expense-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl:'./add-expense.component.html',
  styles: []
})
export class AddExpenseComponent implements OnInit {

  expenseForm:FormGroup = this.fb.group({
    type:[''],
    friends:this.fb.array(['']),
    name:['',[Validators.required,Validators.minLength(3)]],
    date:['',Validators.required],
    amount:['',Validators.required]
  });
  expenseDetails:{type:string , friends:string[],name:string,date:Date,amount:number}[];
  expenseMsg:boolean = false;
  operation = "Add";

  get name(){
    return this.expenseForm.get('name'); 
  }
  get date(){
    return this.expenseForm.get('date'); 
  }
  get amount(){
    return this.expenseForm.get('amount');
  }
  get friends(){
    return this.expenseForm.get('friends') as FormArray;
  }
  constructor(private fb:FormBuilder, private _expenseService:ExpenseServiceService,private router:Router) { }

  ngOnInit(): void {

    // this.expenseForm 
    this.expenseDetails  = this._expenseService.getExpenseDetails();
    
  }

  arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}

  deleteExpense(data){
    console.log(data);
    this.expenseDetails =  this.arrayRemove(this.expenseDetails,data);
    localStorage.setItem('Expenses',JSON.stringify(this.expenseDetails));
  }

  updateExpense(data){
    console.log(data);
    this.expenseDetails =  this.arrayRemove(this.expenseDetails,data);
    localStorage.setItem('Expenses',JSON.stringify(this.expenseDetails));
    this.operation = "Update";
    this.expenseForm.setValue(data);
  }

  addFriend(){
    this.friends.push(this.fb.control(['']));
  }
  removeFriend(){
    if(this.friends.length > 1){
      this.friends.removeAt(this.friends.length-1);
    }
  }
  addExpense(data){
   this.expenseDetails.push(data);
   this.expenseMsg = true;
   this.expenseDetails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    localStorage.setItem('Expenses',JSON.stringify(this.expenseDetails));
    this.expenseForm.reset();
    this.operation = "Add";
  }
  
  close() {
    this.expenseMsg = false;
  }
}
