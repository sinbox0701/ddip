import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        deleteLocation: async(_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {id} = args;
            const exist = prisma.$exists.location({id});
            if(exist){
                await prisma.deleteLocation({id});
                return true;
            }else{
                throw Error("You can't delete Location");
            }
        }
    }
}