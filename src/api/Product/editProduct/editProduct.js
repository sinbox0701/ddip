import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        editProduct: async (_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {
                id,
                name,
                manufacturer,
                category,
                image,
                price,
                total_quantity,
                description
            } = args;
            const {user} = request;
            const exist = await prisma.$exists.product({market:{id:user.id}});
            if(exist){
                return prisma.updateProduct({
                    data:{
                        name,
                        manufacturer,
                        category,
                        image,
                        price,
                        total_quantity,
                        description
                    },
                    where:{id}
                });
            }else{
                throw("You can't update Product")
            }
        }
    }
}