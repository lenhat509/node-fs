import express from 'express';
import csvtojson from 'csvtojson';
import { promises as promisesFs } from 'fs';
const app = express();
const port = 3000;


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.get('/convert', async (req, res) => {
  const json = await csvtojson().fromFile('./users.csv');
  json.forEach(item => {
    if(item.phone === "")
      item.phone = "Missing data";
  })
  const file = await promisesFs.open('./users.json', 'w+');
  await file.write(JSON.stringify(json));
  res.send("Converted");
})