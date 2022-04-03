import amqp, {Channel, Connection} from "amqplib";
import Event from "../interfaces/event";
import BrokerConnectionError from "../errors/BrokerConnectionError";

const connect = async (): Promise<Connection | null> => {
    try {
        return await amqp.connect(
            `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`
        );
    } catch (err) {
        throw new BrokerConnectionError();
    }
};

const createChannel = async (connection: Connection, queueName: string): Promise<Channel | null> => {
    const channel = await connection.createChannel();
    if (!channel) {
        throw new BrokerConnectionError();
    }
    await channel.assertQueue(queueName);
    return channel;
};

const send = (ch: Channel, queueName: string, msg: string) => {
    ch.sendToQueue(queueName, Buffer.from(msg));
};

const close = async (connection: Connection) => {
    await connection.close();
};


const dispatchEvent = async (event: Event, queue: string): Promise<boolean> => {
    const connection = await connect();
    if (!connection) {
        return false;
    }
    const channel = await createChannel(connection, queue);
    if (!channel) {
        return false;
    }
    send(channel, queue, event.eventBody);
    await close(connection);
    return true;
};

export default dispatchEvent;