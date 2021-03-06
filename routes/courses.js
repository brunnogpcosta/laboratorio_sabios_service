import express from 'express'
import { promises as fs } from "fs";
import crypto from "crypto";

const { readFile, writeFile } = fs;
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/allCourses', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('moldeCursos.json'))
    res.send(data)
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

router.get('/courses/limit/:id', async (req, res) => {
  try {
    const json = JSON.parse(await readFile('moldeCursos.json'))
    const nCourses = req.url.replace("/courses/limit/", "")
    let contador = 0;
    const cursosDisponiveis = []

    json.cursos.forEach(element => {
      contador = contador + 1;
      if (contador <= nCourses) {
        cursosDisponiveis.push(element)
      }
    });

    res.send(cursosDisponiveis)
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})




router.get('/courses/categories/:name', async (req, res) => {
  try {
    const json = JSON.parse(await readFile('moldeCursos.json'))
    const nCourses = req.url.replace("/courses/limit/", "")
    let contador = 0;
    const cursosDisponiveis = []

    json.cursos.forEach(element => {
      contador = contador + 1;
      if (contador <= nCourses) {
        cursosDisponiveis.push(element)
      }
    });

    res.send(cursosDisponiveis)
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})









router.get('/categories', async (req, res) => {
  const categorias = []
  const categoriasMaked = []
  try {
    const data = JSON.parse(await readFile('moldeCursos.json'))

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


router.get('/course/:id', async (req, res) => {
  try {
    const cursos = JSON.parse(await readFile("moldeCursos.json"))
    const resultCursos = cursos.cursos.find(curso => curso.id === req.params.id)
    res.send(resultCursos)

    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})



router.get('/trails', async (req, res) => {
  const categorias = []
  const categoriasMaked = []
  try {
    const data = JSON.parse(await readFile('moldeCursos.json'))

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

router.delete("/deletar/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile('moldeCursos.json'))
    const verificaSeAchou = data.cursos.find(curso => curso.id === req.params.id)
    if (verificaSeAchou == null) {
      const result = `Não Encontrou o Curso:  ${req.params.id}`
      res.send(result)
    } else {
      data.cursos = data.cursos.filter(curso => curso.id !== req.params.id)
      writeFile('moldeCursos.json', JSON.stringify(data))
      res.send(data)
    }

    res.end()
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

router.put('/altera', async (req, res) => {
  try {
    const dataBody = req.body;
    const data = JSON.parse(await fs.readFile('moldeCursos.json'))
    const index = data.cursos.findIndex(curso => curso.id === dataBody.id);



    data.cursos[index] = {
      "id": dataBody.id,
      "nomeCurso": dataBody.nomeCurso,
      "conteudoCurso": data.cursos[index].conteudoCurso,
      "idioma": data.cursos[index].idioma,
      "emailProdutor": data.cursos[index].emailProdutor,
      "formaDeAcesso": dataBody.formaDeAcesso,
      "formato": dataBody.formato,
      "categoria": dataBody.categoria,
      "precoOriginal": data.cursos[index].precoOriginal,
      "preco": dataBody.preco,
      "temperatura": data.cursos[index].temperatura,
      "blueprint": data.cursos[index].blueprint,
      "satisfacao": data.cursos[index].satisfacao,
      "thumb": data.cursos[index].thumb,
      "divulgacao": {
        "site": data.cursos[index].divulgacao.site
      },
      "comprar": {
        "hotlink": data.cursos[index].comprar.hotlink
      }
    }

    await fs.writeFile('grades.json', JSON.stringify(data));

    res.send(data);
    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message })
  }

})


router.post('/insere', async (req, res) => {
  try {
    let jsonBody = req.body;

    const json = JSON.parse(await fs.readFile('moldeCursos.json'))
    const verificaSeAchou = json.cursos.find(curso => curso.nomeCurso.toLowerCase() === jsonBody.nomeCurso.toLowerCase());


    let guid = crypto.randomBytes(16).toString("hex");

    if (verificaSeAchou == null) {
      jsonBody = { id: guid, ...jsonBody }
      json.cursos.push(jsonBody)
      await fs.writeFile('moldeCursos.json', JSON.stringify(json))

      res.send(jsonBody)
    } else {
      const result = `O Curso ${jsonBody.nomeCurso} já está Cadastrado`
      res.send(result)
    }

    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message })
  }

})






export default router;