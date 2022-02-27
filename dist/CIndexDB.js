import { BaseObject } from "./BaseObject";
export class CIndexDB extends BaseObject {
    constructor(dbName, dbVersion) {
        super();
        this.idb = undefined;
        this.dbName = "";
        this.dbVersion = "";
        this.dbName = dbName;
        this.dbVersion = dbVersion;
    }
}
//# sourceMappingURL=CIndexDB.js.map