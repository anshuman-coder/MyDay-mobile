const successResponse = (req, res, data = {}, code = 200) => {
  const response = {
    error: false,
    success: true,
    data
  };

  // console.log(data)
  res.status(code).json(response);
};

const failResponse = (req, res, message, code = 400) => { 
  const response = {
    error: false,
    success: false,
    data: message
  }

  // console.log(message)

  res.status(code).json(response)
}

const errorResponse = (req, res, error, code = 500) => { 
  const response = {
    error: true,
    success: false,
    data: error
  }

  console.log(error)

  res.status(code).json(response);
}

module.exports = {
  successResponse,
  errorResponse,
  failResponse
}