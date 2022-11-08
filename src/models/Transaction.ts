// Transaction Types
export enum TransactionType {
	Incoming,
	Outgoing,
}

export abstract class Transaction {
	constructor(
		public id: string,
		public memo: string,
		public amount: number,
		public date: Date
	) {}
}

export class IncomingTransaction extends Transaction {
	sign: string;
	type: TransactionType;

	constructor(
		public id: string,
		public memo: string,
		public amount: number,
		public date: Date
	) {
		super(id, memo, amount, date);
		this.sign = "+";
		this.type = TransactionType.Incoming;
	}
}

export class OutgoingTransaction extends Transaction {
	sign: string;
	type: TransactionType;

	constructor(
		public id: string,
		public memo: string,
		public amount: number,
		public date: Date
	) {
		super(id, memo, amount, date);
		this.type = TransactionType.Outgoing;
		this.sign = "-";
	}
}
