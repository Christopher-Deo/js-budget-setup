class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

//method for submitting the income amount(s) used in budget
submitBudgetForm(){
  const value = this.budgetInput.value;
    if(value === " || value < 0"){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or 
        negative</p>`;
        const self = this;
      setTimeout(function(){
        self.budgetFeedback.classList.remove('showItem');
      }, 4000);
    }else{
      this.budgetAmount.textContent = value; //puts the value from the form into the 'budget' div
      this.budgetInput.value = ''; //resets the form for next use
      this.showBalance(); //calling method to calculate the balance
    }   
}

// method to print balance to page
//must be called AFTER form data has been placed into the DOM. 
showBalance(){
  const expense = this.totalExpense();
  //calculating the balance amount
  const total = parseInt(this.balanceAmount.textContent) - expense;
  //updating the text to show the new balance
  this.balanceAmount.textContent = total;
  //conditional statement to remove the green / black text and replace
  // it with red if balance < 0.
  if(total < 0){
    this.balance.classList.rempve('showGreen', 'showBlack');
    this.balance.classList.add('showRed')
    //showing green text when balance is greater than 0
  }else if(total> 0){
    this.balance.classList.remove('showRed', 'showBlack');
    this.balance.classList.show('addGreen');
    //showing black text if balance is = 0
  }else if(total === 0){
    this.balance.classList.remove('showRed', 'showGreen');
    this.balance.classList.add('showBlack');
  }

}

//method to submit expense form
submitExpenseForm(){
  //declaring variables to hold the values entered into the expense form
  const expenseValue = this.expenseInput.value;
  const amountValue = this.amountInput.value;
  // conditional statements to trigger an error message on form submission if amount is =< 0
  if(expenseValue =="" || amountValue == "" || amountValue < 0){
    this.expenseFeedback.classList.add('showItem');
    this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`
    const self = this;
    setTimeout(function(){
      self.expenseFeedback.classList.remove('showItem');
    },4000)
  }else{
    let amount = parseInt(amountValue);
    this.expenseInput.value = "";
    this.amountInput.value = "";
    
    // creating an object from the expenses and amounts 
    //and pushing it to the itemList array while incrementing the id each time
    let expense = {
      id:this.itemID,
      title:expenseValue,
      amount:amount,
    }
    this.itemID++;
    this.itemList.push(expense);
    this.addExpense(expense);
    this.showBalance();
  }
}

//add Expense method to show expense and amount on the table
addExpense(expense){
  const div = document.createElement('div');
  div.classList.add('expense');
  div.innerHTML = `
  <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
  `;
  this.expenseList.appendChild(div);
}

//method to calculate income -  total expense
totalExpense(){
let total = 0;
if(this.itemList > 0){
  acc = accumulated.value & current.value;
  total = this.itemList.reduce(function(acc, curr){
    acc += curr.amount
    return acc;
  },0);
}
//place the math algorithm here (income - total expenses)
  this.expenseAmount.textContent = total;
    return total;
}

//method to edit a listed expense
editExpense(element){
  //getting the id of the element to be edited
  let id = parseInt(element.dataset.id)//getting the dataset-id from the html file
  //traversing the DOM tp get the correct parent element.
  let parent = element.parentElement.parentElement.parentElement;
  //removing it from the dom
  this.expenseList.removeChild(parent);
  // filtering the expense item to be edited from the list (array)
  let expense = this.itemList.filter(function(item){
    return item.id === id;
  })

  //show value
  this.expenseInput.value = expense[0].title;
  this.amountInput.value = expense[0].amount;

  // remove the item from the expense list
  let tempList = this.itemList.filter(function(item){
    return item.id !== id;
  })
  this.itemList = tempList;
  this.showBalance();
}

//method to delete an expense from the list
deleteExpense(element){
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;
  //remove from DOM
  this.expenseList.removeChild(parent);
  //remove from list
  let tempList = tjos.itemList.filter(function(item){
    return item.id !== id;
  });
  this.itemList = tempList;
  this.showBalance();

}


}  //end of UI class

function eventListeners (){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

//create new instance of the UI
const ui = new UI();

//budget form submit
budgetForm.addEventListener('submit',function(event){
  event.preventDefault();

})

//expense form submit
expenseForm.addEventListener('submit', function(event){
  event.preventDefault();
  ui.submitExpenseForm();
})

//expense click
expenseList.addEventListener('click', function(event){
  if(event.target.parentElement.classList.contains('edit-icon')){
    ui.editExpense(event.target.parentElement)
  }else if (event.target.parentElement.classList.contains('delete-icon')){
    ui.deleteExpense(event.target.parentElement)
  }
});

}

document.addEventListener('DOMContentLoaded', function (){
  eventListeners();
})