import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Response {
    const response = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return response;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce((sum, income) => {
      if (income.type === 'income') {
        return sum + income.value;
      }
      return sum;
    }, 0);

    const outcomeSum = this.transactions.reduce((sum, income) => {
      if (income.type === 'outcome') {
        return sum + income.value;
      }
      return sum;
    }, 0);

    const total = incomeSum - outcomeSum;

    const balance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
