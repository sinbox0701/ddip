import { prisma } from "../../../generated/prisma-client";

export default{
    User:{
        locations: ({id}) => prisma.user({id}).locations(),
        ddipsU: ({id}) => prisma.user({id}).ddipsU(),
    }
}