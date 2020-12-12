import { prisma } from "../../../generated/prisma-client";

export default{
    Market:{
        products: ({id}) => prisma.market({id}).products(),
    }
}