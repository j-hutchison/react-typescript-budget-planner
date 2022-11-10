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
		public date: Date,
		public isCredit: boolean
	) {}
}

export class IncomingTransaction extends Transaction {
	type: TransactionType;

	constructor(
		public id: string,
		public memo: string,
		public amount: number,
		public date: Date
	) {
		super(id, memo, amount, date, true);
		this.type = TransactionType.Incoming;
	}
}

export class OutgoingTransaction extends Transaction {
	type: TransactionType;

	constructor(
		public id: string,
		public memo: string,
		public amount: number,
		public date: Date
	) {
		super(id, memo, amount, date, false);
		this.type = TransactionType.Outgoing;
	}
}
