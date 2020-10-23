import CentroAcopio from "src/api/clases/CentroAcopioBusqueda";

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
    centrosBus:[],
     //lista de centros de acopio del sistema
    centrosCA: [
      {

        nombre:'Centro de Acopio Villa Maria',
        horario:' L-S 8:00 am-3:30 pm',
        tags:["Residuos toxicos","Plastico", "Carton"
        ],
        direccion:'Cll 7 B No. 12 -17',
        lat:4.632304,
        lng:-74.070685
      },
      {
        nombre:'Centro de Acopio Doña Juana',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Vidrio","Papel", "Metal"
        ],
        direccion:'Cll 45 B No. 34A -17',
        lat:4.616422,
        lng:-74.068297
      },
      {
        nombre:'Centro de Acopio Unidos Amor',
        horario:' L-S 10:00 am-6:00 pm',
        tags:["Madera","Papel", "Metal"
        ],
        direccion:'Cra. 54 #65-40 a 65-48',
        lat:4.663611,
        lng:-74.080676,
      },
      {
        nombre:'Centro de Acopio Cielo azul',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Residuos toxicos","Vidrio", "Madera", "Carton"
        ],
        direccion:'Cl. 67a #57-2 a 57-96',
        lat:4.666851,
        lng:-74.081269
      },
      {
        nombre:'Centro de Acopio Una Causa',
        horario:' L-S 8:00 am-6:00 pm',
        tags:["Vidrio","Papel", "Madera"
        ],
        direccion:'Cra. 56 Bis #81',
        lat:4.676348,
        lng:-74.074963
      },
      {
        nombre:'Centro de Acopio Ambiente sostenible',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Metal","Plastico", "Carton"
        ],
        direccion:'Cl. 79 Bis ##62-49',
        lat:4.678829,
        lng:-74.077905
      },
      {
        nombre:'Centro de Acopio Amanecer',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Residuos toxicos","Papel", "Madera", "Metal"
        ],
        direccion:'Clr 45 B No. 34A -17',
        lat:4.681301,
        lng:-74.079193
      },
      {
        nombre:'Centro de Acopio Solo Papel',
        horario:' L-S 8:00 am-5:00 pm',
        tags:["Papel"
        ],
        direccion:'Cra. 71d #74a-2 a 74a-80',
        lat:4.689401,
        lng:-74.092491
      },
      {
        nombre:'Centro de Acopio Morales',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Carton","Papel", "Madera"
        ],
        direccion:'4.699803',
        lat:4.699803,
        lng:-74.102008
      },
      {
        nombre:'Centro de Acopio Contigo',
        horario:' L-S 7:00 am-6:00 pm',
        tags:["Metal","Plastico", "Vidrio"
        ],
        direccion:'Cl. 76 #80a-95 a 80a-11,',
        lat:4.697397,
        lng:-74.099251
      }
    ],
     //centro elegido por el usuario
    centroElegido: {
      nombre:'Centro de Acopio Doña Juana',
      horario:' L-S 7:00 am-6:00 pm',
      tags:["vidrio","papel"],
      direccion:'Clr 45 B No. 34A -17',
      lat:4.616422,
      lng:-74.068297
    },
     //tags de materiales dentro del sistema
    tags:['Residuos toxicos', 'Carton', 'Plastico','Vidrio', 'Papel','Madera', 'Metal'],
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
    acumSemillas: 5000,
    validadorMapa:true

  }
}
