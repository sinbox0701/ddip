import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        myMarket: async (_,__,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            return await prisma.market({id:user.id})
        }
    }
};