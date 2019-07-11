/** Document represents a document stored on the service. */
export class Document {
    public static compareByTime(a: Document, b: Document) {
        return b.time.getTime() - a.time.getTime()
    }

    constructor(
        public id: string,
        public title: string,
        public path: string,
        public size: number,
        public time: Date = new Date(),
    ) {
    }
}