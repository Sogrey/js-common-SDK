export declare class LimitPromise {
    private limit;
    private count;
    private taskQueue;
    constructor(limit: number);
    private createTask;
    call(asyncFn: Function, ...args: any[]): Promise<unknown>;
}
//# sourceMappingURL=LimitPromise.d.ts.map