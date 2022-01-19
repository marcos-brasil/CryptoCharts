import React, { Suspense } from 'react';

import Bg from './components/Background';
import { delay } from './utils';

// import HomeScreen from './Home';
// import MenuScreen from './Menu';
// import FormScreen from './Form';
// import SearchScreen from './Search';
// import FeedbackScreen from './Feedback';

lazyLoad()
async function lazyLoad() {
  await delay(1000)
  await Promise.all([
    import('./screens/SignIn'),
    import('./screens/SignUp'),
    import('./screens/Account'),
  ]);
}

export function LazySignIn(): JSX.Element {
  const Lazy = React.lazy(() => import('./screens/SignIn'));

  return (
    <Suspense fallback={<Bg />}>
      <Lazy />
    </Suspense>
  );
}

export function LazySignUp(): JSX.Element {
  const Lazy = React.lazy(() => import('./screens/SignUp'));

  return (
    <Suspense fallback={<Bg />}>
      <Lazy />
    </Suspense>
  );
}

export function LazyAccount(): JSX.Element {
  const Lazy = React.lazy(() => import('./screens/Account'));

  return (
    <Suspense fallback={<Bg />}>
      <Lazy />
    </Suspense>
  );
}
