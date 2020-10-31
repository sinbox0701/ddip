import {prisma} from "../../../../generated/prisma-client";
 
export default{
    Query:{
        userByName: async (_,args) => {
            const {username} = args;
            return await prisma.user({username});
        }
    }
}