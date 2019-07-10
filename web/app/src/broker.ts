export type Subscriber = (message: any) => void

/** Broker mediates messages between publishers and subscribers. */
export class Broker {
    private subscribersByTopic = new Map<string, Subscriber[]>()

    public subscribe(topic: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || []
        subscribers.push(subscriber)
        this.subscribersByTopic.set(topic, subscribers)
    }

    public unsubscribe(topic: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || []
        const index = subscribers.indexOf(subscriber)
        if (index > 0) subscribers.splice(index, 1)
        this.subscribersByTopic.set(topic, subscribers)
    }

    public publish(topic: string, message: any) {
        const subscribers = this.subscribersByTopic.get(topic)
        if (!subscribers) {
            return
        }
        for (const subscriber of subscribers) {
            subscriber(message)
        }
    }
}
