module.exports = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body
  })
}
