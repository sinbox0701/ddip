import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeLocations: async(_,__,{request,isAuthenticated}) =>{
            isAuthenticated(request);
            const {user} = request;
            return prisma.locations(
                {where: {user}},
                {orderBy:'createdAt_DESC'}
            );
        }
    }
}