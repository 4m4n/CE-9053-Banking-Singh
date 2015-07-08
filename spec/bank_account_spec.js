/*globals describe beforeEach it expect BankAccount */
var BankAccount = require("../app/bank_account");

describe("BankAccount", function(){
    it("exists", function(){
        expect(BankAccount).toBeDefined();
    });
});

describe("Create Account without arguments", function(){
    it("Throws Exception", function(){
       expect(function(){new BankAccount()}).toThrow();
    });
});

describe("Create Default Account", function(){
   var account;
   beforeEach(function(){
       account = new BankAccount({id: 7});
   });
   describe("Create Account with Default Arguments", function(){
        it("Account ID is 7", function(){
          expect(account.id).toEqual(7);
       });
       it("Balance is 0", function(){
          expect(account.balance).toEqual(0); 
       });
       it("Account is Not Locked", function(){
           expect(account.locked).toBeFalsy();
       }); 
   });
});

describe("Create Account", function(){
    var account;
    beforeEach(function(){
       account = new BankAccount({id: 77, balance: 2000, locked: true}); 
    });
    describe("Create Account with Supplied Arguments", function(){
       it("Account ID is 77", function(){
            expect(account.id).toEqual(77);
        });
        it("Account Balance is 2000", function(){
           expect(account.balance).toEqual(2000); 
        });
        it("Account is Locked", function(){
            expect(account.locked).toBeTruthy();
        }); 
    });
    describe("Create Account with Invalid Arguments", function(){
       it("Zero length ID supplied, Throws Exception", function(){
          expect(function(){new BankAccount({id: ""});}).toThrow(); 
       });
       it("Invalid balance supplied, Throws Exception", function(){
           expect(function(){new BankAccount({id: 7, balance: "bar"});}).toThrow();
       });
       it("Invalid locked state supplied, Throws Exception", function(){
          expect(function(){new BankAccount({id: 7, balance: 2000, locked: "Invalid"});}).toThrow(); 
       });
    });
});

describe("Deposit money in Account", function(){
    var account;
    beforeEach(function(){
        account = new BankAccount({id: 7, balance: 5000});
    })
    describe("Account Locked", function(){
        beforeEach(function(){
            account.locked = true;
        });
        it("Deposit amount to locked account, Throws Exception", function(){
           expect(function(){account.deposit(500)}).toThrow(); 
        });
    });
    describe("Deposit invalid Amounts", function(){
        it("Deposit zero amount, Throws Exception", function(){
           expect(function(){account.deposit()}).toThrow(); 
        }); 
        it("Deposit negative amount, Throws Exception", function(){
            expect(function(){account.deposit(-50)}).toThrow();
        });
        it("Deposit invalid amount, Throws Exception", function(){
            expect(function(){account.deposit("abcd")}).toThrow();
        });
    });
    describe("Deposit Transactions", function(){
        it("Deposit $500 to account, Balance is $5500", function(){
            account.deposit(500);
            expect(account.balance).toEqual(5500);
        });
        describe("Deposit Transaction into Locked Account", function(){
           beforeEach(function(){
               account.deposit(500);
               account.locked = true;
           }); 
           it("Account is Locked", function(){
               account.locked = true;
               expect(account.locked).toBeTruthy();
            });
            it("Deposit $500 to locked account, Throws Exception", function(){
               expect(function(){account.deposit(500);}).toThrow();
            });
        });
    });
});

describe("Withdraw money from Account", function(){
    var account;
    beforeEach(function(){
        account = new BankAccount({id: 7, balance: 2000});
    });
    describe("Account Locked", function(){
        beforeEach(function(){
           account.locked = true; 
        });
        it("Withdraw from Locked account, Throws Exception", function(){
           expect(function(){account.withdraw(500)}).toThrow(); 
        });
    });
    describe("Invalid Withdrawls", function(){
       it("Withdraw zero amount, Throws Exception", function(){
           expect(function(){account.withdraw()}).toThrow(); 
        }); 
        it("Withdraw negative amount, Throws Exception", function(){
            expect(function(){account.withdraw(-50)}).toThrow();
        });
        it("Withdraw invalid amount, Throws Exception", function(){
            expect(function(){account.withdraw("abcd")}).toThrow();
        }); 
    });
    describe("Withdrawl Transactions", function(){
        beforeEach(function(){
            account.withdraw(1500);
        })
       it("Withdraw $1500 from account, Balance is $500", function(){
           expect(account.balance).toEqual(500);
       }); 
       it("Withdraw $100 from account, Balance is $399", function(){
           account.withdraw(100);
           expect(account.balance).toEqual(399);
       });
       it("Withdraw $500 from account, Throws Exception", function(){
           expect(function(){account.withdraw(500)}).toThrow();
       });
    });
});

describe("Transactions", function(){
   var account;
   beforeEach(function(){
       account = new BankAccount({id: 7, balance: 5000, locked: false});
       account.withdraw(4500);
       account.withdraw(100);
       account.deposit(500);
       account.withdraw(100);
   });
   it("After transactions, Balance is $798", function(){
       expect(account.balance).toEqual(798);
   });
});