export class LimitPromise {
    constructor(limit) {
        this.limit = limit;
        this.count = 0;
        this.taskQueue = [];
    }
    createTask(asyncFn, args, resolve, reject) {
        return () => {
            asyncFn(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                this.count--;
                if (this.taskQueue.length) {
                    let task = this.taskQueue.shift();
                    task();
                }
            });
            this.count++;
        };
    }
    call(asyncFn, ...args) {
        return new Promise((resolve, reject) => {
            const task = this.createTask(asyncFn, args, resolve, reject);
            if (this.count >= this.limit) {
                this.taskQueue.push(task);
            }
            else {
                task();
            }
        });
    }
}
//# sourceMappingURL=LimitPromise.js.map