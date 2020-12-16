import { prisma } from "../../../generated/prisma-client";

export default{
    Location:{
        user: ({id}) => prisma.location({id}).user(),
    }
}