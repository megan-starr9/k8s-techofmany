
export default function logout(req, res) {
  req.logOut();
  res.status(204).end();
}
