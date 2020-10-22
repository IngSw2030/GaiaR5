
export default function () {
  return {
    //variables de prueba
    variable: true,
    drawerState: false,

    //coordenadas del centro de acopio seleccionado
    coordenadas:{
      lat:4.624180,
      lng: -74.064424
    },
    //coordendas del usuario
    ubicacionActual: {
      lat:4.6365476,
      lng: -74.0652501
    },
     //lista de centros de acopio del sistema
    centrosCA: [
      {
        nombre:'Centro de Acopio Villa Maria',
        horario:' L-S 8:00 am-3:30 pm',
        materiales:[
          'residuos toxicos',
          'plastico',
          'carton'
        ],
        direccion:'Cll 7 B No. 12 -17',
        lat:4.632304,
        lng:-74.070685
      },
      {
        nombre:'Centro de Acopio Doña Juana',
        horario:' L-S 7:00 am-6:00 pm',
        materiales:[
          'vidrio',
          'papel'
        ],
        direccion:'Clr 45 B No. 34A -17',
        lat:4.616422,
        lng:-74.068297
      }
    ],
     //centro elegido por el usuario
    centroElegido: {
      nombre:'Centro de Acopio Doña Juana',
      horario:' L-S 7:00 am-6:00 pm',
      materiales:[
        'vidrio',
        'papel'
      ],
      direccion:'Clr 45 B No. 34A -17',
      lat:4.616422,
      lng:-74.068297
    },
     //tags de materiales dentro del sistema
    tags:['residuos toxicos', 'carton', 'plastico','vidrio', 'papel'],
    //historial de semillas de usuario
    historialSemillas:[
      {
        CA:'Centro de Acopio Doña Juana',
        fecha:' 20/10/2020  6:00 pm',
        NoSemillas:10,
      },
      {
        CA:'Centro de Acopio Doña Maria',
        fecha:' 3/10/2020 5:00 pm',
        NoSemillas:10,
      }
    ] ,
    //semillas del usuario
    acumSemillas: 5000

  }
}
