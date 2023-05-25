import { of, from, BehaviorSubject } from "rxjs";
import { concatMap, startWith, switchMap, delay, delayWhen } from "rxjs/operators";

const paused$ = new BehaviorSubject(true);
const currentPhotos$ = new BehaviorSubject(['Photo 1', 'Photo 2']); // Photos[];
const currentPhoto$ = currentPhotos$.pipe(
    // Emit one photo at a time
    switchMap((photos) => from(photos)),
    concatMap((photo) =>
        // Create a new stream for each individual photo
        of(photo).pipe(
            // Create a strem for each individual photo
            // will allow us to delay the start of the stream
            delayWhen(() =>
                paused$.pipe(
                    switchMap((isPaused) => isPaused ? of('').pipe(delay(100_000)) : of('').pipe(delay(1_000))
                    )
                )
            )
        )
    )
)

// currentPhoto$.subscribe({
//     next: (result) => { console.log(result) }
// })


// Better undestending of order of operators
// This way, after 2 sec, we will print Hello, we will print There
// const test1$ = of('there').pipe(
//     startWith('Hello'),
//     delay(2_000)
// )
// test1$.subscribe({
//     next: (result) => { console.log(result) }
// })

// This way, we will print Hello, after 2 sec, we will print There
// const test2$ = of('there').pipe(
//     delay(2_000),
//     startWith('Hello'),
// )
// test2$.subscribe({
//     next: (result) => { console.log(result) }
// })

// This is an example of how operators are executed, bottom to top:
// test1$ delay, startWith, of
// test2$ startWith, delay, of