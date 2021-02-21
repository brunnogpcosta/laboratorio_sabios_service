import express from 'express'
import fs from 'fs'
import cors from 'cors'

//app.set('port', (process.env.PORT || 5000));

const app = express()
app.use(cors())
//const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/allCourses', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFileSync('moldeCursos.json'))
    res.send(data)
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})


app.get('/categories', async (req, res) => {
  const categorias = []
  const categoriasMaked = []
  try {
    const data = JSON.parse(await fs.readFileSync('moldeCursos.json'))

    data.cursos.forEach(element => {
      if (categorias.indexOf(element.categoria) === -1) {
        categorias.push(element.categoria)
      }
    });

    categorias.forEach(element => {
      const achei = data.cursos.find(el => el.categoria == element)
      categoriasMaked.push(achei)
    });

    res.send(categoriasMaked)
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})


app.get('/trails', async (req, res) => {
  const categorias = []
  const categoriasMaked = []
  try {
    const data = JSON.parse(await fs.readFileSync('moldeCursos.json'))

    data.cursos.forEach(element => {
      if (categorias.indexOf(element.categoria) === -1) {
        categorias.push(element.categoria)
      }
    });

    res.send(categorias.sort())
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})





app.listen(process.env.PORT || 3001, () => {
  console.log(`API Iniciada`)
})