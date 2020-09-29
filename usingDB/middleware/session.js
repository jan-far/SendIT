import db from '../index';

export default async function getauthenticated(req, res) {
  if (req.authenticated) {
    const findOneQuery = 'SELECT * FROM users WHERE email=$1';
    try {
      const { rows } = await db.query(findOneQuery, [req.authenticated.email]);
      if (rows !== []) {
        [req.user] = rows;
        delete req.user.password; // delete the password from the authenticated
        [req.authenticated] = rows; // refresh the authenticated value
        console.log('user', req.authenticated);

        // finishing processing the middleware and run the route
        return next();
      }
      // console.log('okay!', req.authenticated);
      return next();
    } catch (err) {
      console.log(err);
      return next();
    }
  } else {
    console.log('unset');
    res.redirect('/UI/redirect.html')
  }
}
