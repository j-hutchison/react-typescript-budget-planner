export class Filter {
	constructor(
		public name: string,
		public fieldMapping: string,
		public value: string | number | Date
	) {}
}
