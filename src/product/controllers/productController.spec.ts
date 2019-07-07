import { Test} from '@nestjs/testing';
import { mockRepository } from '../repository/fake.repo';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../product.module';

/* A example of an e2e test for 3 api endpoints
*/

describe('ProductController', () => {
    let app: INestApplication;

    /* We create an extra testing module and use the services and 
    providers from the ProductModule for testing
    */
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ProductModule],
        })
        .compile();
        app = module.createNestApplication();
        await app.init();
    });

    /* we check if the database holds the same values as we defined in our 
        mock repository
    */

    it(`/GET all products`, () => {
        return request(app.getHttpServer())
            .get('/products')
            .expect(200)
            .expect(
                mockRepository.getAllProducts(),
            );
    });

    /* we check if the database returns the specified product as we defined in our
    mock repository
    */
    it(`/GET certain product`, () => {
        return request(app.getHttpServer())
            .get('/product/5d221665912e85341c0be954')
            .expect(200)
            .expect(
                mockRepository.getCertainProduct(),
            );
    });

    /* finally we check if the database returns the  the specified product as we defined in our
    mock repository
    */

    it(`/POST create new product`, () => {
        return request(app.getHttpServer())
            .get('/product/')
            .expect(404)
            .expect({
                statusCode: 404,
                error: 'Not Found',
                message: 'Cannot GET /product/'});
    });
    // close the server after testing has finished
    afterAll(async () => {
        await app.close();
    });
});
