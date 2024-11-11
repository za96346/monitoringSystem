import UserPo from "domain/po/UserPo";
import { Repository } from "types/Repository";

class UserRepo implements Repository.User {
    get(): UserPo {
        throw new Error("Method not implemented.");
    }
    update(): UserPo {
        throw new Error("Method not implemented.");
    }
    add(): UserPo {
        throw new Error("Method not implemented.");
    }
    delete(): UserPo {
        throw new Error("Method not implemented.");
    }   
}

export default UserRepo