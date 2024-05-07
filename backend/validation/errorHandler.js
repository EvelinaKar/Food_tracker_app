const handleError = (res, error) => {
  if (error.name === 'ValidationError') {
    const errors = error.inner.map((err) => ({ [err.path]: err.message }));

    return res.status(400).send({ errors });
  }

  return res.status(500).send({ error: error.message });
};

module.exports = {
  handleError,
};
