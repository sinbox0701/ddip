import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default{
    Mutation: {
        createMarket: async(_,args) =>{
            const {
                name,
                password,
                tel_market,
                location
            } = args;

            const num = await prisma.marketsConnection().aggregate().count();
            //console.log(num);
            const login_id = `market${num}`;
            const hashedPassword = await bcrypt.hash(password, 5);

            const market = await prisma.createMarket({
                name,
                password: hashedPassword,
                tel_market,
                location,
                login_id
            });

            return market;
        }
    }
}