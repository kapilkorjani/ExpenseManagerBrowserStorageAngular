import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

  constructor() { }

  //Method to get expense details from the local storage
  public getExpenseDetails() {
    if (JSON.parse(localStorage.getItem('Expenses')) != null) {
      return JSON.parse(localStorage.getItem('Expenses'));
    } else {
      return [];
    }
  }
}
