export function valida(input){
    const tipoDeInput = input.dataset.tipo;
   if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input)
   }
   if(input.validity.valid){
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = "";
   } else {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
   }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const mensajeDeError = {
  nombre:{
   valueMissing: "El campo nombre no puede estar vacio",
  },
  email:{
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password:{
    valueMissing: "El campo password no puede estar vacio",
    patternMismatch: "La contraseña debe tener como minimo 6 caracteres y maximo 12, de contener minusculas, mayusculas",
  },
  nacimiento:{
    valueMissing: "La fecha no puede estar vacia",
    customError: "Debes ser mayor de 18"
  },
  numero:{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es XXXXXXXXX 10 numeros"
  },
  direccion:{
    valueMissing: "El campo dirección no puede estar vacio",
    patternMismatch: "La dirección debe contener desde 10 a 40 caracteres"
  },
  ciudad:{
    valueMissing: "El campo ciudad no puede estar vacio",
    patternMismatch: "La ciudad debe contener desde 10 a 40 caracteres"
  },
  estado:{
    valueMissing: "El campo estado no puede estar vacio",
    patternMismatch: "El estado debe contener desde 10 a 40 caracteres"
  }
}


function mostrarMensajeDeError(tipoDeInput, input){
 let mensaje = "";
 tipoDeErrores.forEach((error)=>{
  if(input.validity[error]){
     console.log(tipoDeInput, error);
     console.log(input.validity[error]);
     console.log(mensajeDeError[tipoDeInput][error]);
     mensaje = mensajeDeError[tipoDeInput][error];
  }
 });

 return mensaje;
}


const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

function validarNacimiento (input) {
 const fechaCliente = new Date(input.value);
 let mensaje = "";
 if (!mayorEdad(fechaCliente)){
   mensaje = "debes ser mayor de 18";

 }
 input.setCustomValidity(mensaje);

}

function mayorEdad (fecha){
    const fechaActual = new Date();
    const diferenciasFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    )
  return diferenciasFechas < fechaActual
}