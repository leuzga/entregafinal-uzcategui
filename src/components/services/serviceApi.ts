const url = 'https://api.themoviedb.org/3/movie/popular?api_key=aa1107ffdfa53f6a40b0efceacc9427c&language=en-US&page=1'
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}
async function serviceApi () {
  console.log("SERVICE API GET")
  return await fetch(url, options).then(resp => resp.json())
}

export default serviceApi
