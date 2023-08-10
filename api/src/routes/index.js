const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(el => {
        let arrayTemperaments = typeof el.temperament === 'string' ? el.temperament.split(', ') : el.temperament
        return {
            id: el.id,
            name: el.name,
            img: el.image.url,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: arrayTemperaments
        }
    })
    return apiInfo
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['id', 'name'],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllInfo = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo)
    return allInfo 
    // return apiInfo
};

const getTemperaments = async () => {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds')
    const info = await api.data.map(el => {
        return {
            temperament: el.temperament
        }
    })
    return info
};

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllInfo()
    if (name) {
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? 
        res.status(200).send(dogName) :
        res.status(404).send('No existe ese dog')
    } else {
        res.status(200).send(dogsTotal)
    }
});

router.get('/temperaments', async (req, res) => {
    const temperamentsApi = await getTemperaments()
    let tempGroup = temperamentsApi.map(el => el.temperament)
    let tempNotNull = tempGroup.filter(tg => typeof tg === 'string')
    let tempIndividual = tempNotNull.map(g => g.split(', '))
    let tempFlated = tempIndividual.flat()
    let temperaments = [... new Set(tempFlated)]
    temperaments.forEach(el => {
        Temperament.findOrCreate({
            where: {name: el}
        })
    })
    const allTemperaments = await Temperament.findAll()

    res.status(200).send(allTemperaments)
});

router.post('/dogs', async (req, res) => {
    let { name, height, weight, life_span, temperament, image, createdInDb } = req.body
    let dogCreated = await Dog.create({ name, height, weight, life_span, image, createdInDb }) 
    let temperamentDb = await Temperament.findAll({
        where: {name: temperament}
    })
    dogCreated.addTemperament(temperamentDb)
    res.send('Perro creado con exito')
});

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id    // es lo mismo que
    // const {id} = req.parms
    const dogsTotal = await getAllInfo()

    if (id) {
        let dogFound = await dogsTotal.find(el => el.id.toString() === id.toString())
        dogFound ?
        res.status(200).send(dogFound) : 
        res.status(400).send('No hubo chance bro')
    }
});

module.exports = router;
