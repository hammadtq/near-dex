use borsh::{BorshDeserialize, BorshSerialize};
use near_bindgen::collections::Map;
use near_bindgen::{env, near_bindgen, Promise,
    PromiseOrValue};
use std::collections::HashMap;


#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

type AccountId = String;
type Balance = u128;
type Price = u128;

#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Account {
    pub balance: Balance,
    pub trade: HashMap<String, Price>,
}

impl Account {
    pub fn total_balance(&self) -> Balance {
        self.balance
    }

    pub fn set_trade(&mut self, token_name: String, price: Price) {
            self.trade.insert(token_name, price);
    }

    pub fn get_trade(&self, token_name: String) -> Price {
        *self.trade.get(&token_name).unwrap_or(&0)
    }

    pub fn get_trades(&self) -> (Vec<String>, Vec<String>) {
        let mut token_vec: Vec<String> = Vec::new();
        let mut string_vec: Vec<String> = Vec::new();
        for (trade) in &self.trade {
            token_vec.push(trade.0.to_string());
            string_vec.push(trade.1.to_string());
        }
        return (token_vec, string_vec)
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Exchange {
    /// AccountID -> Account details.
    pub accounts: Map<AccountId, Account>,
}

impl Default for Exchange {
    fn default() -> Self {
        panic!("Exchange should be initialized before usage")
    }
}

#[near_bindgen]
impl Exchange {
    #[init]
    pub fn DepositEthB(owner_id: AccountId, add_balance: Balance) -> Self {
        
        let mut ft = Self { accounts: Map::new(b"a".to_vec())};
        let mut account = ft.get_account(&owner_id);
        account.balance = add_balance;
        ft.accounts.insert(&owner_id, &account);
        ft
    }

    pub fn SetTrade(&mut self, owner_id: AccountId, price: Balance, token_name: String)  {
        let mut account = self.get_account(&owner_id);
        let (tokens, prices) = account.get_trades();
        let mut price_matched = 0; 

        let i = 0;
        for token in tokens {
            for prev_price in &prices {
                if token == token_name && prev_price == &price.to_string()  {
                    price_matched = 1;
                } 
            }
            i+1;
        }

        if price_matched == 0 {
            account.set_trade(token_name.to_string(), price);
            self.accounts.insert(&owner_id, &account);
        }else {
            // account.set_trade(token_name.to_string(), 900);
            // self.accounts.insert(&owner_id, &account);

            self.transfer_money(owner_id.to_string(), price);
        }
    }

    pub fn GetTrade(&mut self, owner_id: AccountId, token_name: String) -> Balance {
        let account = self.get_account(&owner_id);
        let trade = account.get_trade(token_name.to_string()); 
        return trade;
    }

    pub fn GetTrades(&mut self, owner_id: AccountId) -> (Vec<String>, Vec<String>) {
        let account = self.get_account(&owner_id);
        let trade = account.get_trades(); 
        return trade;
    }

    /// Returns total ethB balance for the `owner_id` account.
    pub fn get_ethB_balance(&self, owner_id: AccountId) -> Balance {
        self.get_account(&owner_id).total_balance()
    }


    pub fn transfer_money(&mut self, account_id: String, amount: u128) {
        Promise::new(account_id).transfer(amount as u128);
    }
    
}

impl Exchange {
    /// Helper method to get the account details for `owner_id`.
    fn get_account(&self, owner_id: &AccountId) -> Account {
        self.accounts.get(owner_id).unwrap_or_default()
    }
}
