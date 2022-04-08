interface Event {
    eventType: string;
    eventBody: {
        actor?: {
           id: string
        },
        object?: {
            id: string,
            title: string
        }
    };
}

export default Event;