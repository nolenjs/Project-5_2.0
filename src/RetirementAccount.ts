import { Account } from './Account';
import { displayClassName, displayClassNameWithPurpose } from "./decorators";
import {TransactionOrigin} from "./TransactionOrigin";
import {Transaction} from "./Transaction";
import {AccountType} from "./AccountType";
let d = new Date();

@displayClassNameWithPurpose('to prove typescript wrong')
export class RetirementAccount implements Account {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance: number = 100000;
    accountType: AccountType;
    accountHistory: Transaction[];
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
        let holder = this.accountHolderBirthDate;
        let year = d.getFullYear() - holder.getFullYear();
        //If balance is more than $0 and older than 60
        if (transaction.resultBalance > 0 && year > 60 || (year === 60 && d.getMonth() >= holder.getMonth() &&      d.getDate() >= holder.getDate())){
            transaction.success = true;
            this.accountHistory[this.accountHistory.length] = transaction;
            return transaction;
        }
        //If younger than 60, they need to pay for fee as well
        else if(transaction.resultBalance > amount / 10){
            transaction.resultBalance -= (amount / 10);
            transaction.success = true;
            this.accountHistory[this.accountHistory.length] = transaction;
            return transaction;
        }
        else{
            console.log(transaction.errorMessage);
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
                this.balance *= (1 + .03 / 12);
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