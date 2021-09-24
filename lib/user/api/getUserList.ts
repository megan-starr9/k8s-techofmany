
export default function getUserList(req, res) {
  res.status(200).json({ success: true, users: [
    { username: 'User A' },
    { username: 'User B' },
    { username: 'User C' },
  ],
  })
}
