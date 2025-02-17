
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICES_HOST: string;
    PRODUCTS_MICROSERVICES_PORT: number;
    ORDER_MICROSERVICES_HOST: string;
    ORDER_MICROSERVICES_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    ORDER_MICROSERVICES_HOST: joi.string().required(),
    ORDER_MICROSERVICES_PORT: joi.number().required()
})
.unknown(true);

const {error, value} = envsSchema.validate(process.env);

if( error ) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value; 

export const envs = {
    port: envVars.PORT,
    productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
    productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
    orderMicroservicesHost: envVars.ORDER_MICROSERVICES_HOST,
    orderMicroservicesPort: envVars.ORDER_MICROSERVICES_PORT,
}