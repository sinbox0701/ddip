import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        addProduct: async (_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {
                name,
                manufacturer,
                category,
                image,
                price,
                total_quantity,
                description
            } = args;

            const {user} = request;

            const product = await prisma.createProduct({
                market:{
                    connect:{
                        id: user.id
                    }
                },
                name,
                manufacturer,
                category,
                image,
                price,
                total_quantity,
                description
            });
            //console.log(user);

            return product;
        }
    }
}