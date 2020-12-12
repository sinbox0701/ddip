import { prisma } from "../../../../generated/prisma-client";
 
export default{
    Query:{
        searchProduct: async(_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            return prisma.products({
                where:{
                    OR:[
                        {name_contains:args.term},
                        {manufacturer_contains:args.term},
                        {market:{name_contains:args.term}}
                    ]
                } 
            });//검색 단어가 포함된 것이 아닌 그거로 시작하는 단어로 찾기
        }
    }
};
