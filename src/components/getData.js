const getData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type':'application/json'},
    })
    const data = await response.json()
    return data
  } catch (e) {console.log(e)}
}

export default getData