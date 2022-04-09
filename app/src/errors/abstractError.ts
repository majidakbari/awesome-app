abstract class AbstractError extends Error {
    protected constructor(protected statusCode: number, message: string) {
        super(message);
    }

    public getMessage = (): string => this.message;
    public getStatusCode = (): number => this.statusCode;
}

export default AbstractError;