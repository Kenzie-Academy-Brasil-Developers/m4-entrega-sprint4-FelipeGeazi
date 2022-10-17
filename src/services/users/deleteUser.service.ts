import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";

const deleteUserService = async (
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  if (!findUser.isActive) {
    return ["User not found", 400];
  }

  await userRepository.update(id, {
    isActive: false,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default deleteUserService;
