import express, { Request, Response } from "express";
import cors from 'cors'

const app = express()
const PORT = 3001
app.use(express.json())
app.use(cors())

app.get('/proxy', async (req: Request, res: Response) => {
    const { url } = req.query

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Query de URL é um parâmetro obrigatório' })
    }

    try {
        const response = await fetch(url)


        if (response.status != 200) {
            return res.status(response.status).json({
                error: `Não foi possível realizar fetch de ${url}`,
                status: response.status
            })
        }

        const data = await response.json()

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Impossível realizar fetch de dados da API alvo'})
    }
})

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
})

//como as urls da api infodengue usam &, a API só vai receber como a variável url o que estiver antes do primeiro &, tudo o que vem depois
//é armazenado dentro de novas variáveis para cada &, como solução, deve-se codificar o url no frontend
//antes de mandá-lo para a API usando encodeURIComponent(url)
//para realizar uma consulta:
//npm i
//npm run dev
// accessar http://localhost:3001/proxy/?url= insira a url da api aqui

//a linha 7 também está apresentando um erro no vscode, mas não parece impedir a api de compilar e funcionar