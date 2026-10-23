import UserDaoImpl from "@src/components/user/user.dao";
import { asClass } from "awilix";

export const userModule = {
    userDao: asClass(UserDaoImpl).singleton(),
};
