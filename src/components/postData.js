export default async function postData(url, content) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(content)
    })
    const data = await response.json();
    return data;
}