import {closeConnection, userTagRepository} from "../../../integrations/dbConnection";

describe('attach tag to user service should act as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it('should do nothing when userTag record already exists.', async () => {

    });
});
