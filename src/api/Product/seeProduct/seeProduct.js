import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeProduct: async (_,args,{request, isAuthenticated}) =>{
            isAuthenticated(request);
            const {id} = args;
            return prisma.product({id});
        }
    }
}