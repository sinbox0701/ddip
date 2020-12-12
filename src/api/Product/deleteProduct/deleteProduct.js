import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        deleteProduct: async(_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {id} = args;
            const exist = prisma.$exists.product({id});
            if(exist){
                await prisma.deleteProduct({id});
                return true;
            }else{
                throw Error("You can't delete Product");
            }
        }
    }
}