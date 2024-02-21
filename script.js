// Datos
// FLU = Centimetros cubicos usando la formula correspondiente. (cc/hr)
// MA == Mantenimiento x Medio mantenimiento (cc*1.5)


//    Parte basada en la clase

const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const MOR = document.getElementById('calculadura__caso2');
const MAR = document.getElementById('calculadura__caso3');
const MER = document.getElementById('calculadura__caso1');

CALCULAR.addEventListener('click', () => {
    const DATO = document.getElementById('peso').value
    //validamos que se cargue un dato:
    if (DATO > 0){
        ERROR.style.display = 'none';
        const flujo = calculeHidrate(DATO);
        // Codigo propio, agregando datos usando el método de superficie corporal
        if (DATO > 30) {
            //console.log(DATO)
            //console.log(`${flujo} EL FLUJO`)
            MER.innerHTML = 'Caso de Superficie Corporal';
            let valor1 = flujo * 1500
            let mantenimiento1 = Math.round((valor1/24)*1.5);
            FLU.innerHTML =  Math.round((valor1/24)) + ' cc/hr';
            MAN.innerHTML = 'm+m/2 ' + mantenimiento1 + ' cc/hr';
            FLU.style.display = 'block';
            MAN.style.display = 'block';
            MER.style.display = 'block';

            // Datos por 2litros de agua
            let valor2 = flujo * 2000
            let mantenimiento2 = Math.round((valor2/24)*1.5);
            MOR.innerHTML =  Math.round((valor2/24)) + '   cc/hr';
            MAR.innerHTML = 'm+m/2   ' + mantenimiento2 + '   cc/hr';
            MOR.style.display = 'block';
            MAR.style.display = 'block';
            //console.log(`VALORES  ${valor1} a ${valor2}`)
        } else {
            MER.innerHTML = 'Caso de Holly Day'
            MER.style.display = 'block';
            // Metodo de HollyDay
            let mantenimiento = Math.round(flujo*1.5);
            FLU.innerHTML = flujo + ' cc/hr';
            MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
            FLU.style.display = 'block';
            MAN.style.display = 'block';
            // debbuger
            MOR.style.display = 'none';
            MAR.style.display = 'none';
        };
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    };
});


// Handler de apoyo
function calculeHidrate ( kg ) {
    if (kg){
        if (kg <= 30) {
            let cc = hollydaySegar(kg);
            return Math.round(cc/24);
            //return console.log(`${cc}cc, ${cc/24}cc/hr, ${(cc/24) * 1.5}m+m/2 `)
        } else if (kg > 30){
            return superficiecorporal(kg);
        }
    }
}

// Funcion de la Superficie Corporal ((x * 4 + 7) / x + 90)
function superficiecorporal(kg) {
    let c = parseInt(kg);
    console.log(c+90);
    c = ((c *4)+7)/(c + 90);
    console.log(c);
    return c;

}



//  ----------------------------------------------------------------
// Funcion propia, método de HollyDay
// Si desean probarlo esta disponible en 
// https://alejandroferr54.github.io/hidratacionbasal.github.io/
// Mi repositorio disponible en https://github.com/alejandroferr54
function hollydaySegar(kg) {
    // Parseando a entero para no tener problemas aritmeticos. (el value es una string.)
    let peso = parseInt(kg);
    //Defino el cálculo
    let cc = 0;
    // Si el peso es mayor a veinte se ejecuta el código
    // Caso contrario continua con la proxima condicional.
    if (peso > 20) {
        // Si el peso es mayor a veinte, se asume que minimamente el niño
        // debe tomar 1500cc que es un litro y medio de agua, entonces
        // Se suma la diferencia del peso y se multiplica por 20
        // Ejp: Si el peso es 25, entonces 1500 + 5 x 20, que seria 1600cc
        cc = 1500 + ((peso - 20) * 20);

        // Retorna el valor resultante
        return cc
    } else if ((peso > 10) <= 20) {
        // Si el peso es mayor a 10 y menor o igual a 20, se asume que 
        // minimamente debe tomar 1l de agua, en ese caso se multiplica
        // la diferencia x 50 y se suma por 1000cc
            cc = 1000 + ((peso - 10) * 50);

            // Se retorna el valor resultante
            return cc;
    }  else if (peso <=10){
        // Si el peso es menor o igual a 10, se multiplica por 100
        cc = peso * 100;
        // Se retorna el valor resultante
            return cc;
    }
}
