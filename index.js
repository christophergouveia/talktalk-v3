const res = fetch('https://www.purgomalum.com/service/xml?text=this is some test input', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'oooo sey ffilho da puta' }),
})
  .then((data) => data.json())
  .then((data) => console.log(data));
