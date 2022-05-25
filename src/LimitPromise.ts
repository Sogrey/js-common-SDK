/**
 * 异步[并发]数的函数.
 * 
 * 核心思想就是在并发数大于限制的时候，暂时先把操作放入通过promise组装一下，然后放入数组，每次执行完异步回调后就将操作按先入先出的顺序取出，然后执行，保证最大并发数在限制范围内。
 */
export class LimitPromise {
    private limit: number;        // 最大限制数
    private count: number;        // 目前并发的数量
    private taskQueue: any[];     // 如果并发数等于最大限制，则把新加的异步操作用数组存起来

    constructor(limit: number) {
        this.limit = limit;
        this.count = 0;
        this.taskQueue = [];
    }

    private createTask(
        asyncFn: Function,
        args: any[],
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void,
    ) {
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

    public call(asyncFn: Function, ...args: any[]) {
        return new Promise((resolve, reject) => {
            const task = this.createTask(asyncFn, args, resolve, reject);
            if (this.count >= this.limit) {
                this.taskQueue.push(task);
            } else {
                task();
            }
        });
    }
}

//   let limitP = new LimitPromise(3)