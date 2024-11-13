import UserPo from "../../domain/po/UserPo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository } from "typeorm";

class UserRepo implements Repository.User {
    private ormRepository: TypeORMRepository<UserPo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(UserPo);
    }

    // 取得所有未刪除的使用者
    async getUsers(): Promise<UserPo[]> {
        return await this.ormRepository.find({
            where: { is_deleted: 0 }
        });
    }

    // 根據 ID 取得單一使用者
    async getUserById(userData: UserPo): Promise<UserPo | null> {
        const user = await this.ormRepository.findOneBy({ id: userData.id });
        return user || null;
    }

    // 根據 account 取得單一使用者
    async getUserByAccount(userData: UserPo): Promise<UserPo | null> {
        const user = await this.ormRepository.findOneBy({ accout: userData.accout });
        return user || null;
    }

    // 新增使用者
    async add(userData: UserPo): Promise<UserPo> {
        const user = this.ormRepository.create(userData);
        return await this.ormRepository.save(user);
    }

    // 更新使用者
    async update(userData: UserPo): Promise<UserPo | null> {
        const user = await this.getUserById(userData);
        if (!user) {
            return null;
        }
        Object.assign(user, userData);
        user.is_deleted = 0;
        return await this.ormRepository.save(user);
    }

    // 刪除使用者 (軟刪除)
    async delete(userData: UserPo): Promise<boolean> {
        const user = await this.getUserById(userData);
        if (!user) {
            return true;
        }

        Object.assign(user, userData);
        user.is_deleted = 1;

        await this.ormRepository.save(user);
        return true;
    }
}

export default UserRepo