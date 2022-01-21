const express = require('express')
const app = express()
const port = 3000

var request = require('request'); 

app.get('/albums/', (req, res) => {
  
  request(
    {
      method: 'GET',
      url: 'https://itunes.apple.com/lookup?id=909253&entity=album',
      body: '"feature request"',
      json: true
    },
    function(err, httpResponse, body){
      albums = body.results.filter(element => element.collectionType === 'Album')
      const uniqueAlbums = [];
      console.log(albums)
      albums.map(x => uniqueAlbums.filter(a => a.collectionName.toLowerCase() === x.collectionName.toLocaleLowerCase()).length > 0 ? null : uniqueAlbums.push({ collectionId: x.collectionId, collectionName: x.collectionName, artworkUrl100: x.artworkUrl100, artistName: x.artistName, albumImage: x.artworkUrl100, price: x.collectionPrice }));

      res.send(uniqueAlbums)
      
      
    }
)
})
app.get('/albums/:name', (req, res) => {
  console.log('params', req.params.name)
  request(
    {
      method: 'GET',
      url: `https://itunes.apple.com/lookup?id=909253&entity=album`,
      body: '"feature request"',
      json: true
    },
    function(err, httpResponse, body){
      albums = body.results.filter(element => element.collectionType === 'Album')
      const uniqueAlbums = [];
      albums.map(x => uniqueAlbums.filter(a => a.collectionName.toLowerCase() === x.collectionName.toLocaleLowerCase()).length > 0 ? null : uniqueAlbums.push({ collectionId: x.collectionId, collectionName: x.collectionName, artworkUrl100: x.artworkUrl100, artistName: x.artistName, albumImage: x.artworkUrl100, price: x.collectionPrice }));
      console.log('unique Albums', uniqueAlbums)
      const filteredAlbums = uniqueAlbums.filter(album => album.collectionName.toLowerCase().includes(req.params.name.toLowerCase()))
      res.send(filteredAlbums)
      
    }
)
 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
