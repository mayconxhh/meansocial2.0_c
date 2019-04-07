export class Message {
	constructor(
		public _id: string,
		public text: string,
		public emmiter: string,
		public viewed: string,
		public createdAd: string,
		public receiver: string
	){};
}