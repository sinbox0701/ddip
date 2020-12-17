import { prisma } from "../../../generated/prisma-client";

export default{
    Ddip:{
        product: ({id}) => prisma.ddip({id}).product()
    }
}