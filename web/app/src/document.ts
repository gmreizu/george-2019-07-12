/** Document represents a document stored on the service. */
export class Document {
    constructor(
        public id: string,
        public title: string,
        public size: number,
        public path: string,
        public time: Date = new Date(),
    ) {
    }
}