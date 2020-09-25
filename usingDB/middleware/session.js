import db from '../index';

export default async function getauthenticated(req, res, next) {
  if (req.authenticated) {
    const findOneQuery = 'SELECT * FROM parcels WHERE email=$1';
    console.log(req.authenticated);
    try {
      const { rows } = await db.query(findOneQuery, [req.authenticated.id]);
      // if (rows === [] || !rows) {
      //   req.authenticated.reset();
      //   res.redirect('/auth/signin');
      //   console.log(rows);
      // } else
      if (!rows === []) {
        console.log('user', req.authenticated.user);
        [req.user] = rows;
        delete req.user.password; // delete the password from the authenticated
        [req.authenticated.user] = rows; // refresh the authenticated value

        // finishing processing the middleware and run the route
        next();
      } next();
    } catch (err) {
      console.log(err);
      next();
    }
  } else {
    console.log('unset');
    next();
  }
}
