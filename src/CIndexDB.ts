import { BaseObject } from "./BaseObject"
import { DeveloperError } from "./DeveloperError"

// 定义一个回调函数类型
type ConnCallbacks = {
    connError: (e: Event) => void,
    connUpgrade: (db: CIndexDB, e: IDBVersionChangeEvent) => void,
    connSuccess: (db: CIndexDB, e: Event) => void
}

type CreateObjectStoreCallback = (table: IDBObjectStore) => void;


// // 定义接口
// interface GreetingsOptions {
//     name: string;
// }

/**
 * IndexDB 操作类
 * 
 * This is the doc comment for CIndexDB
 *
 * @module CIndexDB
 */
export class CIndexDB extends BaseObject {

    // db: IDBDatabase = null;
    dbName: string = "";
    dbVersion: number = 1;
    db!: IDBDatabase;

    /**
     * IndexDB  操作类的构造函数
     * @param {string} dbName 数据库名称
     * @param {number} dbVersion 版本号
     * @param {ConnCallbacks} connCallbacks 回调
     * @returns 
     */
    constructor(dbName: string, dbVersion: number, connCallbacks: ConnCallbacks) {
        super();
        let that = this;
        this.dbName = dbName;
        this.dbVersion = void 0 === dbVersion ? 1 : dbVersion;

        // In the following line, you should include the prefixes of implementations you want to test.
        // @ts-ignore
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        // DON'T use "var indexedDB = ..." if you're not in a function.
        // Moreover, you may need references to some window.IDB* objects:
        // @ts-ignore
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        // @ts-ignore
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

        if (!window.indexedDB) {
            console.info("Your browser dons't support IndexedDB");
            return;
        }

        let connection = window.indexedDB.open(this.dbName, this.dbVersion);
        connection.onerror = function (e: Event) {
            connCallbacks.connError(e);
        }
        connection.onupgradeneeded = function (e: IDBVersionChangeEvent) {
            console.info("Upgrading");
            if ((e?.target as IDBOpenDBRequest)?.result) {
                const { result } = e.target as IDBOpenDBRequest;
                that.db = result;
                console.log('indexedDb upgrade success!', e);
            } else {
                console.log('indexedDb upgrade fail!', e);
            }
            connCallbacks.connUpgrade(that, e);
        }
        connection.onsuccess = function (e: Event) {
            console.info("open indexed db success");
            that.db = (e.target as IDBOpenDBRequest).result;
            connCallbacks.connSuccess(that, e);
        }
    }

    /**
     * 关闭数据库
     */
    close() {
        this.db.close();
    }

    /**
     * 删除数据库
     * @param {string} dbName 数据库名称
     */
    deleteDatabase(dbName: string) {
        this.close();
        if (dbName == this.dbName) {
            window.indexedDB.deleteDatabase(dbName);
        } else {
            console.error("database name don't match,delete fail")
        }
    }

    /**
     * 创建存储对象（表）
     * @param {string} tableName 表名
     * @param {string} keyPath 主键参数
     * @param {boolean} autoIncrement 主键是否自增长
     * @param {CreateObjectStoreCallback} callback 
     */
    createTableAndKeyAutoIncrement(tableName: string, keyPath: string, autoIncrement: boolean, callback?: CreateObjectStoreCallback) {
        var objectStore = this.db.createObjectStore(tableName, { keyPath: keyPath, autoIncrement: autoIncrement });
        if (void 0 === callback || void 0 === callback) {
            console.info("create success");
        } else {
            callback(objectStore);
        }
    }

    /**
     * 创建存储对象（表）
     * @param {string} tableName 表名
     * @param {string} keyPath 主键参数，默认非自增长
     * @param {CreateObjectStoreCallback} callback 
     */
    createTable(tableName: string, keyPath: string, callback?: CreateObjectStoreCallback) {
        this.createTableAndKeyAutoIncrement(tableName, keyPath, false, callback)
    }

    /**
     * 删除存储对象（表）
     * @param {string} tableName 表名
     */
    deleteTable(tableName: string) {
        this.db.deleteObjectStore(tableName);
    }

    // add(storeName: string, data, callback) {
    //     var transaction = this.db.transaction([storeName], "readwrite");
    //     var objectStore = transaction.objectStore(storeName);
    //     var request = objectStore.add(data);
    //     request.onsuccess = function (e) {
    //         if (void 0 === callback || void 0 === callback.success) {
    //             console.info("add success")
    //         } else {
    //             callback.success(e);
    //         }

    //     }
    //     transaction.oncomplete = function (e) {
    //         if (void 0 === callback || void 0 === callback.complete) {
    //             console.info("add complete");
    //         } else {
    //             callback.complete(e);
    //         }
    //     }
    //     transaction.onerror = function (e) {
    //         if (void 0 === callback || void 0 === callback.error) {
    //             console.error(e.target.error);
    //         } else {
    //             callback.error(e);
    //         }
    //     }
    // }


    //     indexedDB: (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB),

    // IDBTransaction: (window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction),

    //     IDBKeyRange : (window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange),

    //         IDBCursor : (window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor);

    // /**
    //  * 初始化数据库，创建表和建立链接
    //  * @param  {[type]} dbName    [description]
    //  * @param  {[type]} dbVersion [description]
    //  * @param  {[type]} storeObjs [description]
    //  * @return {[type]}           [description]
    //  */
    // initDB: function (dbName, dbVersion, storeObjs) {
    //     this.dbName = dbName;
    //     this.dbVersion = dbVersion;

    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);

    //     var self = this;
    //     dbConnect.onsuccess = function (e) {
    //         self.idb = e.target.result;
    //         self.log('数据库链接成功！');
    //     }
    //     dbConnect.onerror = function (e) {
    //         console.log(e)
    //         self.log('数据库链接失败!');
    //     }
    //     dbConnect.onupgradeneeded = function (e) {
    //         self.idb = e.target.result;
    //         var ts = e.target.transaction;
    //         var oldVersion = e.oldVersion;
    //         var newVersion = e.newVersion;
    //         self.log('数据库更新成功，旧的版本号为：' + oldVersion + ",新的版本号为：" + newVersion);
    //         if (storeObjs) {
    //             for (var k = 0, len = storeObjs.length; k < len; k++) {
    //                 var storeObj = storeObjs[k];
    //                 var storeName = storeObj.storeName;
    //                 var key = storeObj.key;
    //                 var idxs = storeObj.idxs;

    //                 self.createTable(storeName, key, idxs)
    //             }
    //         }
    //     }
    // },

    // /**
    //  * 创建数据库存储对象（表）
    //  * @param  {[type]} key [description]
    //  * @param  {[type]}     [description]
    //  * @return {[type]}     [description]
    //  */
    // createTable: function(storeName, key, idxs) {
    //     var self = this;
    //     var idb = self.idb;
    //     if (!idb) {
    //         self.log('数据库没有链接');
    //         return;
    //     }
    //     if (!key || !idxs) {
    //         self.log('参数错误');
    //         return;
    //     }
    //     if (!storeName) {
    //         self.log('storeName必须');
    //         return;
    //     }

    //     try {
    //         var store = idb.createObjectStore(storeName, key);
    //         self.log('数据库存储对象(table)创建成功');
    //         for (var i = 0; i < idxs.length; i++) {
    //             var idx = idxs[i];
    //             store.createIndex(idx.indexName, idx.keyPath, idx.optionalParameters);
    //             self.log('索引' + idx.indexName + '创建成功');
    //         }
    //     } catch (e) {
    //         self.log('建表出现错误');
    //         console.log(JSON.stringify(e))
    //     }
    // },

    // /**
    //  * [add description]
    //  * @param {[type]} storeName [description]
    //  * @param {[type]} values    [description]
    //  */
    // add: function(storeName, values) {
    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);
    //     var self = this;
    //     dbConnect.onsuccess = function (e) {
    //         var idb = e.target.result;
    //         var ts = idb.transaction(storeName, "readwrite");
    //         var store = ts.objectStore(storeName);
    //         for (var i = 0; i < values.length; i++) {
    //             (function (i) {
    //                 var value = values[i];
    //                 var req = store.put(value);
    //                 req.onsuccess = function () {
    //                     self.log("添加第" + i + "个数据成功");
    //                 }
    //                 req.onerror = function (e) {
    //                     self.log("添加第" + i + "个数据失败");
    //                     self.log(JSON.stringify(e));
    //                 }
    //             })(i)

    //         }
    //         ts.oncomplete = function () {
    //             self.log('添加数据事务结束！');
    //         }

    //     }

    // },

    // /**
    //  * [select description]
    //  * @param  {[type]}   storeName [description]
    //  * @param  {[type]}   count     [description]
    //  * @param  {Function} callback  [description]
    //  * @param  {[type]}   indexName [description]
    //  * @return {[type]}             [description]
    //  */
    // select: function(storeName, count, callback, indexName) {
    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);
    //     var self = this;
    //     var total = 0;
    //     var data = [];
    //     dbConnect.onsuccess = function (e) {
    //         self.log("数据库链接成功！");
    //         var idb = e.target.result;
    //         var ts = idb.transaction(storeName, "readonly");
    //         var store = ts.objectStore(storeName);
    //         var req = store.count();
    //         var req2 = null;
    //         req.onsuccess = function () {
    //             total = this.result;
    //             var realCount = (count <= total) ? count : total;
    //             if (typeof indexName == 'undefined') {
    //                 var range = IDBKeyRange.bound(0, "9999999999999999999999");
    //                 req2 = store.openCursor(range, 'prev');
    //                 var cc = 0;
    //                 req2.onsuccess = function () {
    //                     var cursor = this.result;
    //                     if (total == 0) {
    //                         callback([]);
    //                         return;
    //                     }
    //                     if (cursor) {
    //                         cc++;
    //                         data.push(cursor.value);
    //                         if (cc == realCount) {
    //                             callback(data);
    //                             return;
    //                         }
    //                         cursor.continue();
    //                     }
    //                 }
    //                 req2.onerror = function () {
    //                     self.log("检索出错")
    //                 }
    //             } else {
    //                 //待写
    //             }
    //         }

    //     }
    // },

    // /**
    //  * [delete description]
    //  * @param  {[type]} storeName [description]
    //  * @param  {[type]} key       [description]
    //  * @return {[type]}           [description]
    //  */
    // delete: function(storeName, key, callback) {
    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);
    //     let self = this;
    //     dbConnect.onsuccess = function (e) {
    //         var idb = e.target.result;
    //         var ts = idb.transaction(storeName, 'readwrite');
    //         var store = ts.objectStore(storeName);
    //         store.delete(key);
    //         self.log('删除成功！');
    //         if (callback) {
    //             callback();
    //         }
    //     }
    // },
    // /**
    //  * [funciton description]
    //  * @param  {[type]} storeName    [description]
    //  * @param  {[type]} key          [description]
    //  * @param  {[type]} existCall    [description]
    //  * @param  {[type]} notExistCall [description]
    //  * @return {[type]}              [description]
    //  */
    // isExist: function(storeName, key, existCall, notExistCall) {
    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);
    //     dbConnect.onsuccess = function (e) {
    //         var idb = e.target.result;
    //         var ts = idb.transaction(storeName, 'readonly');
    //         var store = ts.objectStore(storeName);
    //         var req = store.get(key);
    //         req.onsuccess = function () {
    //             if (this.result == undefined) {
    //                 notExistCall();
    //             } else {
    //                 existCall(this.result);
    //             }
    //         }
    //         req.onerror = function () {
    //             notExistCall();
    //         }
    //     }
    // },
    // /**
    //  * clear
    //  * @param  {[type]} storeName [description]
    //  * @return {[type]}           [description]
    //  */
    // clear: function clearObjectStore(storeName) {
    //     var dbConnect = this.indexedDB.open(this.dbName, this.dbVersion);
    //     dbConnect.onsuccess = function (e) {
    //         var idb = e.target.result;
    //         var ts = idb.transaction(storeName, 'readwrite');
    //         var store = ts.objectStore(storeName);
    //         store.clear();
    //     }
    // },
    // /**
    //  * 删除数据库
    //  * @param  {[type]} dbName [description]
    //  * @return {[type]}        [description]
    //  */
    // dropDatabase: function(dbName) {
    //     this.indexedDB.deleteDatabase(dbName);
    //     this.log('成功删除数据库:' + dbName);
    // },
    /**
     * 打印日志
     * @param {string} msg 日志信息
     */
    log(msg: string) {
        console.log((new Date()).toTimeString() + ":" + msg)
    }

}