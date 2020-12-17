import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createDdip: async (_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);

            const {
                quantity,
                payment,
                productId
            } = args;
            const {user} = request;

            const existProduct = await prisma.$exists.product({id:productId});
            if(existProduct){
                const num = await prisma.ddipsConnection({where:{product:{id:productId}}}).aggregate().count();
                console.log(num);
                const ddip = await prisma.createDdip({
                    userD:{
                        connect:{
                            id:user.id
                        }
                    },
                    product:{
                        connect:{
                            id:productId
                        }
                    },
                    ddip_num:num,
                    quantity,
                    payment
                })
                return ddip;
            }else{
                throw Error("Didn't Product");
            }



        }
    }
}