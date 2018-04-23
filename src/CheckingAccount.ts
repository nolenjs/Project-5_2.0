import { Account } from './Account';
import { displayClassName, displayClassNameWithPurpose } from "./decorators";
import {AccountType} from "./AccountType";
import {Transaction} from "./Transaction";
import {TransactionOrigin} from "./TransactionOrigin";

@displayClassNameWithPurpose('to prove typescript wrong')
export class CheckingAccount implements Account {
  accountHolderName: string;
  accountHolderBirthDate: Date;
  balance: number = 1000;
  accountType: AccountType;
  accountHistory: Transaction[];
  dateOpened: Date;
  currentDate: Date = new Date();

  withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
      let transaction = {
          success: false,
          amount: amount,
          resultBalance: this.balance - amount,
          transactionDate: new Date(),
          description: description,
          errorMessage: "I'm sorry, we were not able to complete your transaction."
      };
      if (transaction.resultBalance > 0){
          transaction.success = true;
          this.accountHistory[this.accountHistory.length] = transaction;
          return transaction;
      }
      else{
          // console.log(transaction.errorMessage);
      }
  }

  depositMoney(amount: number, description: string): Transaction {
      let transaction = {
          success: true,
          amount: amount,
          resultBalance: this.balance + amount,
          transactionDate: new Date(),
          description: description,
          errorMessage: "I'm sorry, we were not able to complete your transaction."
      };
      this.accountHistory[this.accountHistory.length] = transaction;
      this.balance = transaction.resultBalance;
      return transaction;
  }

  advanceDate(numberOfDays: number) {
      for (let i = 0; i < numberOfDays; i++){
          if(this.currentDate.getDay() === 1){
              //calculate interest
              this.balance *= (1 + .01 / 12);
          }
          addDays(this.currentDate, numberOfDays);
      }
      function addDays(date, days) {
          let result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
      }
  }
}