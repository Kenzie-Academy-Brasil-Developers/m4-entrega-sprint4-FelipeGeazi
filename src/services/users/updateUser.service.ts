import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";
import { hash } from "bcrypt";

const updateUserService = async (
  user: Partial<User>,
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id,
  });

  const key = Object.keys(user);

  if (!findUser) {
    return ["User not found", 404];
  }

  if (key.includes("id") || key.includes("isActive") || key.includes("isAdm")) {
    return ["key not valid", 401];
  }

  /* if (user.id !== undefined) {
    return ["You can't update id property", 401];
  }

  if (user.isAdm !== undefined) {
    return ["You can't update isAdm property", 401];
  }

  if (user.isActive !== undefined) {
    return ["You can't update isActive property", 401];
  } */

  await userRepository.update(id, {
    name: user.name ? user.name : findUser.name,
    email: user.email ? user.email : findUser.email,
    password: user.password ? await hash(user.password, 10) : findUser.password,
  });

  const newUser = await userRepository.findOneBy({
    id,
  });

  console.log(newUser);
  return newUser!;
};

export default updateUserService;
