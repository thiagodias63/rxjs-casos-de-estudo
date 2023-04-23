import { forkJoin, from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

const users$ = new Promise((resolve) => {
  resolve({ name: "user1" });
});

const posts$ = new Promise((resolve) => {
  resolve({ empresaNome: "posts1" });
});

const comments$ = new Promise((resolve) => {
  //   resolve([{ name: "comment1" }, { name: "comment2" }, { name: "comment3" }]);
  resolve({ empresaNome: "post2" });
});

async function getUsers() {
  return await users$;
}

async function getUserPosts(userId) {
  return await posts$;
}

async function getPostComments(postId) {
  return await comments$;
}

// from(getUsers())
//   .pipe(
//     switchMap((users) => {
//       console.log("usuário encontrado");
//       return of(users).pipe(
//         mergeMap(async (user) => {
//         from(forkJoin(getUserPosts, getPostComments))
//         console.log("empresas: ");
//           //   const postsWithComments = await Promise.all(
//           //     userPosts.map(async (post) => {
//           //       const comments = await getPostComments(post.id);
//           //       return { ...post, comments };
//           //     })
//           //   );
//           return { ...user, posts: userPosts };
//         })
//       );
//     })
//   )
//   .subscribe((result) => {
//     console.log(result);
//   });

const obs1 = from(getUsers());
const obs2 = from(getUserPosts());
const obs3 = from(getPostComments());

const result$ = obs1.pipe(
  tap(() => {
    console.log("usuário encontrado");
  }),
  tap(() => {
    console.log("encontrando empresas...");
  }),
  switchMap((value1) => {
    console.log(value1.name);
    return forkJoin([obs2, obs3]).pipe(
      map(([value2, value3]) => [value1, value2, value3])
    );
  }),
  tap(() => {
    console.log("empresas encontradas...");
  }),
  map(([value1, value2, value3]) => {
    return { ...value1, empresa: { ...value2, ...value3 } };
  }),
  tap(() => {
    console.log("finalizando...");
  })
);

result$.subscribe((result) => {
  console.log(result);
});
