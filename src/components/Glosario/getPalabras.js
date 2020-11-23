const glosarioData = 'https://spreadsheets.google.com/feeds/list/1CBLLQ8zXA7z6SWbuF7q-bEZZU0YW4fMYDRUW88sYt0M/2/public/values?alt=json'

const fromApiResponse = apiResponse => {
  const {data = []} = apiResponse.feed.entry
  //console.log(data)
  if (Array.isArray(data)) {
    const glosario = data.map(palabras => {
      const {palabra} = palabras.gsx$palabra.$t
      const {descripcion} = palabras.gsx$descripción.$t
      const {fuente} = palabras.gsx$fuente.$t
      return { palabra, descripcion, fuente }
    })
    return glosario
  }
  return []
}

export default async function getPalabras() {
    const res = await fetch(glosarioData)
    const data = await res.json()
    //console.log(data)
    return fromApiResponse(data)
}
