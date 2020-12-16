import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        addLocation: async (_,args,{request, isAuthenticated}) => {
            isAuthenticated(request);
            const {
                location,
                latitude,
                longitude
            } = args;

            const {user} = request;

            const place = await prisma.createLocation({
                user:{
                    connect:{
                        id:user.id
                    }
                },
                location,
                latitude,
                longitude
            });
            console.log(user);
            console.log(place);
            return place;
        }
    }
}