import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeProducts: async(_,__,{request,isAuthenticated}) =>{
            isAuthenticated(request);
            return prisma.products({orderBy:'createdAt_DESC'});
        }
    }
}