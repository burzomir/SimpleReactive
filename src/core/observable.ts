export type Observable<T> = (onNext: (value: T) => void) => () => void;
export type OnNext<T> = (value: T) => void;

export function create<T>(source: (onNext: OnNext<T>) => () => void): Observable<T> {
    return (onNext: OnNext<T>) => source(onNext);
};

export function map<I, O>(callback: (value: I) => O) {
    return (observable: Observable<I>) => (onNext: OnNext<O>) => {
        const newOnNext = (value: I) => {
            const mappedValue: O = callback(value);
            onNext(mappedValue);
        }
        return observable(newOnNext);
    };
}

const intervalObservable = create<void>((onNext) => {
    const interval = setInterval(onNext, 1000);
    return () => clearInterval(interval);
});
