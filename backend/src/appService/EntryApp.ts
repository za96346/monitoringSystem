import { AppService, AppServiceParams } from "types/AppService";

class EntryApp implements AppService.EntryApp {
    login({ account, password }: AppServiceParams.EntryAPP["loginParams"]): string {
        throw new Error("Method not implemented.");
    }

}

export default EntryApp