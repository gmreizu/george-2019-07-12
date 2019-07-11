import { Broker } from "./broker";

test("publish should forwanrd messages to subscribers", () => {
    const broker = new Broker()
    const subscriber = (message: number) => {
        expect(message).toBe(1)
    }
    broker.subscribe("test", subscriber)
    broker.publish("test", 1)
})

test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish("test", 1)
})
