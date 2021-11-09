export const images = [
    { name: 'La Paz', source: 'lapaz.png' },
    { name: 'Oruro', source: 'Oruro.png' },
    { name: 'Potosi', source: 'potosi.png' },
    { name: 'Tarija', source: 'tarija.png' },
    { name: 'Chuquisica', source: 'chuquisaca.png' },
    { name: 'Cochabamba', source: 'cochabamba.png' },
    { name: 'Beni', source: 'beni.png' },
    { name: 'Pando', source: 'pando.png' },
    { name: 'Santa Cruz', source: 'santacruz.png' }
];
export const namesDepartamentos = ['La Paz','Oruro','Potosi','Tarija','Chuquisica','Cochabamba','Beni','Pando','Santa Cruz',];

export const departametsArray = [
    { name: 'La Paz', imageUrl: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6f/46/31.jpg' },
    { name: 'Oruro', imageUrl: 'http://www.chamlaty.com/wp-content/uploads/2019/03/Captura-de-pantalla-2019-03-15-a-las-10.30.43.png' },
    { name: 'Potosi', imageUrl: 'https://www.elcolombiano.com/binrepository/733x562/0c0/0d0/none/11101/WVSQ/potosiimagen_37443608_20210329100749.jpg' },
    { name: 'Tarija', imageUrl: 'https://i.ytimg.com/vi/b2_SfdyiKKM/maxresdefault.jpg' },
    { name: 'Chuquisaca', imageUrl: 'https://mediaim.expedia.com/destination/1/170eb17de2d7bbf1ed92aed5e6b7ffca.jpg?impolicy=fcrop&w=360&h=224&q=mediumLow' },
    { name: 'Cochabamba', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cristo_de_La_Concordia.jpg/295px-Cristo_de_La_Concordia.jpg' },
    { name: 'Beni', imageUrl: 'https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/26.11%20beni.jpg?itok=u3eluHWH' },
    { name: 'Pando', imageUrl: 'https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/cobija2.jpg?itok=k2R_1uLY' },
    { name: 'Santa Cruz', imageUrl: 'https://i.ytimg.com/vi/QTDLMVXDvzs/maxresdefault.jpg' },
];




export const cultureInfo = {
    day: {
        name: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        abbr: ['Dom', 'Lun', 'Martes', 'Mie', 'Jue', 'Vie', 'Sab']
    },
    month: {
        name: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Jului', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        abbr: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
};

export const mapType = [
    'streets-v11',
    'outdoors-v11',
    'light-v10',
    'dark-v10',
    'satellite-v9',
    'satellite-streets-v11',
    'navigation-day-v1',
    'navigation-night-v1',
]
export interface MapStyleInt {
    mapStyle: string,
    mapName: string
}

export const mapTypeStyle: MapStyleInt[] = [
    {
        mapName: 'Mapa de Calles',
        mapStyle: 'streets-v11'
    },
    {
        mapStyle: 'outdoors-v11',
        mapName: 'Mapa al aire libre'
    },
    {
        mapStyle: 'light-v10',
        mapName: 'Mapa Claro'
    },
    {
        mapStyle: 'dark-v10',
        mapName: 'Mapa Oscuro'
    },
    {
        mapStyle: 'satellite-v9',
        mapName: 'Mapa de satélite'
    },
    {
        mapStyle: 'satellite-streets-v11',
        mapName: 'Mapa de satélites y calles'
    },
    {
        mapStyle: 'navigation-day-v1',
        mapName: 'Mapa de navegación'
    },
    {
        mapStyle: 'navigation-night-v1',
        mapName: 'Mapa de noche'
    },
]


export const meses = ['El Año Entero', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];

export const graphTypeArray = [
    'Barras Vertical',
    'Barras Horizontal',
    'Pie',
    'Lineas',
    'Dona',
];