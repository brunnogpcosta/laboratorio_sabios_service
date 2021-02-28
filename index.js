import express from 'express'
import courses from './routes/courses.js'
import cors from 'cors'
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/laboratorio', courses)

app.listen(process.env.PORT || 3001, async () => {
  try {
    await readFile("moldeCursos.json")
    console.log()
    console.log("########################")
    console.log("##### API started ######")
    console.log("########################")
    console.log()
  } catch (err) {
    console.log(err);
  }
})