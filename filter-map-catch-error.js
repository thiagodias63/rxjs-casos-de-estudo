import { from } from "rxjs";
import { filter, map, catchError } from "rxjs/operators";

const testLibs$ = from(["Jest", "Jasmine", "Mocha", "Chai"]);

testLibs$.pipe(filter((testLib) => testLib === "Jest")).subscribe({
  next: (testLib) => {
    console.log(testLib);
  },
});

testLibs$
  .pipe(
    map(() => {
      throw Error("my error");
    }),
    catchError((error) => error)
  )
  .subscribe({
    error: (error) => {
      console.log("error throw", error.message);
    },
  });
