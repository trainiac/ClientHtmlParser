import HttpStatus from 'http-status-codes'

export default function(request, response) {

  const errorData = {
    message: 'Not Found'
  }

  response.status(HttpStatus.NOT_FOUND)
  response.json(errorData)

}
