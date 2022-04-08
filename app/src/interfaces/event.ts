interface Event {
    eventType: string;
    eventBody: {
        actor?: {
           id: string
        },
        object?: {
            id: string,
            title: string,
            postId?: string
        }
    };
}

export default Event;