import amqp, {Channel, Connection} from "amqplib";
import Event from "../interfaces/event";
import BrokerConnectionError from "../errors/serverErrors/BrokerConnectionError";

const connect = async (): Promise<Connection> => {
    try {
        return await amqp.connect(
            `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`
        );
    } catch (err) {
        throw new BrokerConnectionError();
    }
};

const createChannel = async (connection: Connection, queueName: string): Promise<Channel> => {
    try {
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        return channel;
    } catch (err) {
        throw new BrokerConnectionError();
    }
};

const send = (ch: Channel, queueName: string, msg: string) => {
    ch.sendToQueue(queueName, Buffer.from(msg));
};

const close = async (connection: Connection) => {
    await connection.close();
};


const dispatchEvent = async (event: Event, queue = 'default') => {
    const connection = await connect();
    const channel = await createChannel(connection, queue);
    send(channel, queue, JSON.stringify(event.eventBody));
    await close(connection);
};

export default dispatchEvent;