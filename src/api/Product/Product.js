import { prisma } from "../../../generated/prisma-client";

export default{
    Product:{
        market: ({id}) => prisma.product({id}).market(),
    }
}