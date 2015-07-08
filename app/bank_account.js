module.exports = BankAccount;

function BankAccount(args)
{
    this.id;
    this.balance = 0;
    this.locked = false;
    
    if(typeof args.id == "undefined" || args.id.length <= 0)
    {
        throw ("Invalid ID");
    }else{
        this.id = args.id;
    }
    
    if(typeof args.balance != "undefined" )
    {
        if(args.balance < 0 || args.balance !== parseInt(args.balance, 10)){
            throw("Invalid Balance");
        }else{
            this.balance = args.balance;
        }
    }
    
    if(typeof args.locked != "undefined")
    {
        if(typeof args.locked == "boolean")
        {
            this.locked = args.locked
        }else{
            throw("Invalid argument Locked");
        }
    }
};

BankAccount.prototype = {
    deposit: function(amount){
        if(this.locked){
            throw("Account Locked")
        }
        if(!this.validAmount(amount))
        {
            throw("Invalid Amount");
        }
        this.balance += amount;
    },
    withdraw: function(amount){
        if(this.locked){
            throw("Account Locked");
        }
        if(!this.validAmount(amount)){
            throw("Invalid Amount");
        }
        if(this.balance <1000 && this.balance-amount <= 0){
            throw("Balance below Minimum");
        }
        if(this.balance < 1000){
            this.balance -= amount + 1;
            return;
        }
        this.balance -= amount;
    },
    validAmount: function(amount){
        if(typeof amount != "undefined" && amount >= 0){
            return true
        }
        return false;
    }
};
