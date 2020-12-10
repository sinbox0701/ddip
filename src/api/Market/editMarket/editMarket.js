import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        editMarket: async (_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {
                name,
                password,
                tel_market,
                location
            } = args;
            const {user} = request;
            return prisma.updateMarket({
                where:{id:user.id},
                data:{
                    name,
                    password,
                    tel_market,
                    location
                }
            });
        }
    }
}