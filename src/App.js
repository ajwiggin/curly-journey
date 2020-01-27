import React, { Suspense, lazy, useState, useEffect } from 'react.js';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { routeNames, Loading, Pretty } from './Fields.js';

const App = ({ userPromise }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    userPromise
      .then(res => {
        c(res);
        res.json();
      })
      .then(user => {
        c(user);
        setUser(user);
        setLoading(false);
      })
      .catch(e => {
        throw new Error('app js setState on comp did mount');
      });
  }, [userPromise]);
  return loading ? (
    <Loading />
  ) : (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          {Object.keys(routeNames).map(string => {
            const componentName = string.split(' ').join('');
            return (
              <Route
                key={componentName}
                path={`/${componentName.toLowerCase()}`}
                render={props => {
                  if (!user) return <Redirect to="/login" />;
                  else {
                    const Component = lazy(() =>
                      import(`./${componentName}.js`)
                    );
                    return (
                      <Pretty user={user}>
                        <Component {...props} user={user} />
                      </Pretty>
                    );
                  }
                }}
              />
            );
          })}
          <Route
            path="/login"
            render={() => {
              const Component = lazy(() => import(`./Login.js`));
              return <Component setUser={setUser} user={user} />;
            }}
          />
          <Route>
            <Redirect to={user ? '/addvisit' : '/login'} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
