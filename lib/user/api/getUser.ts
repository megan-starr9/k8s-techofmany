
export default function getUser(req, res) {
  res.status(200).json({ success: true, user: { username: 'Another Test' } })
}
