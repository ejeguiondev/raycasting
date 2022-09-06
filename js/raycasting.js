/*
Creado por Javier Muñiz @javianmuniz para
el canal de YouTube "Programar es increíble"
Suscríbete para más vídeos y tutoriales:
https://www.youtube.com/channel/UCS9KSwTM3FO2Ovv83W98GTg
Enlace los tutoriales paso a paso:
https://www.youtube.com/watch?v=8XnQq28TRZY&list=PLmD1VB8QabXxMe8khFFnePiJnmdJn8SuR

Basado en el motor creado por Gustavo Pezzi: https://github.com/gustavopezzi/raycasting/blob/master/raycasting-js/raycast.js
*/

var canvas;
var ctx;
var FPS = 50;

//OBJETOS
var escenario;
var jugador = null;

let muerto = false

//inicio

let gameLet = false

//----------------------------------------------------------------------
//TECLADO
document.addEventListener('keydown',function(tecla){
	if (muerto){
	} else {
		if (gameLet == true){
			if (tecla.keyCode === 87){
				jugador.arriba()
				jugador.temblar(1)
			}
			if (tecla.keyCode === 87 && tecla.shiftKey === true){
				jugador.corre()
			}
		
			switch(tecla.keyCode){
				
				case 83:
					jugador.abajo();
					jugador.temblar(1)
				break;
				
				case 68:
					jugador.derecha();
				break;
				
				case 65:
					jugador.izquierda();
				break;
				
			}
		}
	}
	
	
});

document.addEventListener('mousedown', function(e){
	let x = e.offsetX

	if (x < canvasAncho/2){
		jugador.izquierda()
	} else if (x > canvasAncho/2){
		jugador.derecha()
	}
})
document.addEventListener('mouseup', function(e){
	jugador.giraSuelta()
})

document.addEventListener('keyup',function(tecla){
	if (tecla.keyCode === 87){
		jugador.avanzaSuelta()
	}

	if (tecla.keyCode === 87 && tecla.shiftKey === true){
		jugador.avanzaSuelta()
	}

	switch(tecla.keyCode){	
		
		case 83:
			jugador.avanzaSuelta();
		break;
		
		case 68:
			jugador.giraSuelta();
		break;
		
		case 65:
			jugador.giraSuelta();
		break;
	}
});

//----------------------------------------------------------------------
//NIVEL 1

var nivel1 = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//DIMENSIONES EN PIXELS DEL CANVAS
var tamTile = 50;

var canvasAncho = nivel1[0].length * tamTile;
var canvasAlto = nivel1.length * tamTile;

//----------------------------------------------------------------------
//audio

//no se pudo por esto Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD

//----------------------------------------------------------------------
//CLASE PARA EL ESCENARIO

class Level{
	
	constructor(can,con,arr){
		this.canvas = can;
		this.ctx = con;
		this.matriz = arr;
		
		//DIMENSIONES MATRIZ
		this.altoM  = this.matriz.length;
		this.anchoM = this.matriz[0].length;
		
		//DIMENSIONES REALES CANVAS
		this.altoC = this.canvas.height;
		this.anchoC = this.canvas.width;
		
		//TAMAÑO DE LOS TILES
		//this.altoT = parseInt(this.altoC / this.altoM);
		//this.anchoT = parseInt(this.anchoC / this.anchoM);
		this.altoT = tamTile;
		this.anchoT = tamTile;
		
	}
	
	
	//LE PASAMOS UNA CASILLA Y NOS DICE SI HAY COLISIÓN
	colision(x,y){
		var choca = false;
		if(this.matriz[y][x]!=0)
			choca = true;
		return choca;	
	}
	
	
	tile(x,y){
		var casillaX = parseInt(x/this.anchoT);		
		var casillaY = parseInt(y/this.altoT);	
		return(this.matriz[casillaY][casillaX]);
	}
	
	
	
	dibuja(){
		
		var color;
		
		
		for(var y=0; y<this.altoM; y++){
			for(var x=0; x<this.anchoM; x++){
				
				if(this.matriz[y][x]!=0)
					color = '#000000';
				else
					color = '#666666';
				
				this.ctx.fillStyle = color;
				this.ctx.fillRect(x * this.anchoT, y * this.altoT, this.anchoT, this.altoT);
			}
		}
		
	
	}

	
}


//-----------------------------------------------------------------------

//La usaremos para evitar que el ángulo crezca sin control
//una vez pasado de 2Pi, que vuelva a empezar
//usamos la función módulo

function normalizaAngulo(angulo){
	angulo = angulo % (2 * Math.PI);
	
	if(angulo < 0){
		angulo = (2 * Math.PI) + angulo;	//si es negativo damos toda la vuelta en el otro sentido
	}
	
	return angulo;
}


function convierteRadianes(angulo){
	angulo = angulo * (Math.PI / 180);
	return angulo;
}


function distanciaEntrePuntos(x1,y1,x2,y2){
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2-y1)*(y2-y1));
}


//============================================================================================

class Rayo{
	
	constructor(con,escenario,x,y,anguloJugador, incrementoAngulo, columna){
		
		this.ctx = con;
		this.escenario = escenario;
		
		this.x = x;
		this.y = y;
		
		this.incrementoAngulo = incrementoAngulo;
		this.anguloJugador = anguloJugador;
		this.angulo = anguloJugador + incrementoAngulo;
		
		
		this.wallHitX =0;
		this.wallHitY = 0;
		
		//LO SUSTITUIREMOS LUEGO POR VARIABLES LOCALES
		this.wallHitXHorizontal = 0;	//colisión con pared
		this.wallHitYHorizontal = 0;	//colisicón con pared
		
		this.wallHitXVertical = 0;	//colisión con pared
		this.wallHitYVertical = 0;	//colisicón con pared
		
		
		this.columna = columna;		//para saber la columna que hay que renderizar
		this.distancia = 0;	//para saber el tamaño de la pared al hacer el render
		
		
		this.pixelTextura = 0;	//pixel / columna de la textura
		this.idTextura = 0;		//valor de la matriz
		
		
		this.distanciaPlanoProyeccion = (canvasAncho/2) / Math.tan(FOV / 2);
		//============================================
		//PRUEBAS
		
		this.hCamara = 0; //movimiento vertical de la camara
		
		
	}
	
	
	//HAY QUE NORMALIZAR EL ÁNGULO PARA EVITAR QUE SALGA NEGATIVO
	setAngulo(angulo){
		this.anguloJugador = angulo;
		this.angulo = normalizaAngulo(angulo + this.incrementoAngulo);
	}
	
	
	cast(){
		
		this.xIntercept = 0;
		this.yIntercept = 0;
		
		this.xStep = 0;
		this.yStep = 0;
		
		
		//TENEMOS QUE SABER EN QUÉ DIRECCIÓN VA EL RAYO
		this.abajo = false;
		this.izquierda = false;
		
		
		if(this.angulo < Math.PI)
		  this.abajo = true;

		if(this.angulo > Math.PI/2 && this.angulo < 3 * Math.PI / 2)
		  this.izquierda = true;

		
		//=======================================================================
		// HORIZONTAL									
		var choqueHorizontal = false;	//detectamos si hay un muro
		

		//BUSCAMOS LA PRIMERA INTERSECCIÓN HORIZONTAL (X,Y)
		this.yIntercept = Math.floor(this.y / tamTile) * tamTile; 						//el Y es fácil, se redondea por abajo para conocer el siguiente
		
		//SI APUNTA HACIA ABAJO, INCREMENTAMOS 1 TILE
		if(this.abajo)
			this.yIntercept += tamTile;		//no se redondea por abajo, sino por arriba, así que sumamos 1 a la Y
		
		
		//SE LE SUMA EL CATETO ADYACENTE
		var adyacente = (this.yIntercept - this.y) / Math.tan(this.angulo);	//calculamos la x con la tangente
		this.xIntercept = this.x + adyacente;



		//------------------------------------------------------------------------
		//CALCULAMOS LA DISTANCIA DE CADA PASO
		this.yStep = tamTile;								//al colisionar con la Y, la distancia al próximo es la del tile
		this.xStep = this.yStep / Math.tan(this.angulo);	//calculamos el dato con la tangente
		
		
		//SI VAMOS HACIA ARRIBA O HACIA LA IZQUIERDA, EL PASO ES NEGATIVO
		
		if(!this.abajo)
			this.yStep = -this.yStep;
		

		//CONTROLAMOS EL INCREMENTO DE X, NO SEA QUE ESTÉ INVERTIDO
		if((this.izquierda && this.xStep > 0) || (!this.izquierda && this.xStep < 0)){
			this.xStep *= -1;
		}


	
		//COMO LAS INTERSECCIONES SON LÍNEAS, TENEMOS QUE AÑADIR UN PIXEL EXTRA O QUITARLO PARA QUE ENTRE
		//DENTRO DE LA CASILLA
		
		var siguienteXHorizontal = this.xIntercept;
		var siguienteYHorizontal = this.yIntercept;
		
		//SI APUNTA HACIA ARRIBA, FORZAMOS UN PIXEL EXTRA
		if(!this.abajo)
			siguienteYHorizontal--;

		
		//BUCLE PARA BUSCAR EL PUNTO DE COLISIÓN
		while(!choqueHorizontal){
			
			//OBTENEMOS LA CASILLA (REDONDEANDO POR ABAJO)
			var casillaX = parseInt(siguienteXHorizontal/tamTile);		
			var casillaY = parseInt(siguienteYHorizontal/tamTile);		
			
			if(this.escenario.colision(casillaX,casillaY)){
				choqueHorizontal = true;
				this.wallHitXHorizontal = siguienteXHorizontal;
				this.wallHitYHorizontal = siguienteYHorizontal;
			}
			
			else{
				siguienteXHorizontal += this.xStep;
				siguienteYHorizontal += this.yStep;
			}
		}
		
		//=======================================================================
		// VERTICAL									
		var choqueVertical = false;	//detectamos si hay un muro
		
		//BUSCAMOS LA PRIMERA INTERSECCIÓN VERTICAL (X,Y)
		this.xIntercept = Math.floor(this.x / tamTile) * tamTile; 		//el x es fácil, se redondea por abajo para conocer el siguiente
		
		//SI APUNTA HACIA LA DERECHA, INCREMENTAMOS 1 TILE
		if(!this.izquierda)
			this.xIntercept += tamTile;		//no se redondea por abajo, sino por arriba, así que sumamos 1 a la X
		
		//SE LE SUMA EL CATETO OPUESTO
		var opuesto = (this.xIntercept - this.x) * Math.tan(this.angulo); 
		this.yIntercept = this.y + opuesto;

		
		//------------------------------------------------------------------------
		//CALCULAMOS LA DISTANCIA DE CADA PASO
		this.xStep = tamTile;								//al colisionar con la X, la distancia al próximo es la del tile
		
		//SI VA A LA IZQUIERDA, INVERTIMOS
		if(this.izquierda)
			this.xStep *= -1;
		
		
		this.yStep = tamTile * Math.tan(this.angulo);	//calculamos el dato con la tangente
		
		//CONTROLAMOS EL INCREMENTO DE Y, NO SEA QUE ESTÉ INVERTIDO
		if((!this.abajo && this.yStep > 0) || (this.abajo && this.yStep < 0)){
			this.yStep *= -1;
		}
		
		//COMO LAS INTERSECCIONES SON LÍNEAS, TENEMOS QUE AÑADIR UN PIXEL EXTRA O QUITARLO PARA QUE ENTRE
		//DENTRO DE LA CASILLA
		
		var siguienteXVertical = this.xIntercept;
		var siguienteYVertical = this.yIntercept;
		
		
		//SI APUNTA HACIA IZQUIERDA, FORZAMOS UN PIXEL EXTRA
		if(this.izquierda)
			siguienteXVertical--;


		//BUCLE PARA BUSCAR EL PUNTO DE COLISIÓN
		while(!choqueVertical && (siguienteXVertical>=0 && siguienteYVertical>=0 && siguienteXVertical <canvasAncho && siguienteYVertical <canvasAlto)){
			
			//OBTENEMOS LA CASILLA (REDONDEANDO POR ABAJO)
			var casillaX = parseInt(siguienteXVertical/tamTile);		
			var casillaY = parseInt(siguienteYVertical/tamTile);		
			
			
			if(this.escenario.colision(casillaX,casillaY)){
				choqueVertical = true;
				this.wallHitXVertical = siguienteXVertical;
				this.wallHitYVertical = siguienteYVertical;
			}
			
			else{
				siguienteXVertical += this.xStep;
				siguienteYVertical += this.yStep;
			}
		}
		
		
		//============================================================
		//MIRAMOS CUÁL ES EL MÁS CORTO ¿VERTICAL U HORIZONTAL?
		
		
		//INICIALIZAMOS CON DISTANCIAS GRANDES PARA QUE SEPA CUAL LE TOCA
		var distanciaHorizontal = 9999;		
		var distanciaVertical = 9999;
		
		if(choqueHorizontal){
			distanciaHorizontal = distanciaEntrePuntos(this.x, this.y, this.wallHitXHorizontal, this.wallHitYHorizontal);
		}
		
		if(choqueVertical){
			distanciaVertical = distanciaEntrePuntos(this.x, this.y, this.wallHitXVertical, this.wallHitYVertical);
		}
		
		//COMPARAMOS LAS DISTANCIAS
		if(distanciaHorizontal < distanciaVertical){
			this.wallHitX = this.wallHitXHorizontal;
			this.wallHitY = this.wallHitYHorizontal;
			this.distancia = distanciaHorizontal;
			
			
			//PIXEL TEXTURA
			var casilla = parseInt(this.wallHitX / tamTile);
			this.pixelTextura = this.wallHitX - (casilla * tamTile);
			
			//ID TEXTURA
			this.idTextura = this.escenario.tile(this.wallHitX, this.wallHitY);
			
		}
		else{
			this.wallHitX = this.wallHitXVertical;
			this.wallHitY = this.wallHitYVertical;
			this.distancia = distanciaVertical;
			
			//PIXEL TEXTURA
			var casilla = parseInt(this.wallHitY / tamTile) * tamTile;
			this.pixelTextura = this.wallHitY - casilla;
			
			//ID TEXTURA
			this.idTextura = this.escenario.tile(this.wallHitX, this.wallHitY);
		}
		
		
		//CORREGIMOS EL EFECTO OJO DE PEZ
		//this.distancia = this.distancia * (Math.cos(this.anguloJugador - this.angulo));
		
		//GUARDAMOS LA INFO EN EL ZBUFFER
		zBuffer[this.columna] = this.distancia;
		
		
	}
	
	
	color(){
		//https://www.w3schools.com/colors/colors_shades.asp
		
		//36 posibles matices
		var paso = 526344;		//Todos son múltiplos de #080808 = 526344(decimal);
		
		var bloque = parseInt(canvasAlto/36);
		var matiz = parseInt(this.distancia / bloque);
		var gris = matiz * paso;

		var colorHex = "#" + gris.toString(16);		//convertimos a hexadecimal (base 16)
		
		return(colorHex);
	}
	
	
	
	
	
	
	renderPared(){
		
		var altoTile = canvasAlto;		//Es la altura que tendrá el muro al renderizarlo

		var alturaMuro = (altoTile / this.distancia) * this.distanciaPlanoProyeccion;
		
		//CALCULAMOS DONDE EMPIEZA Y ACABA LA LÍNEA, CENTRÁNDOLA EN PANTALLA
		var y0 = parseInt(canvasAlto/2) - parseInt(alturaMuro/2);
		var y1 = y0 + alturaMuro;
		var x = this.columna;
		
		//VARIAMOS LA ALTURA DE LA CÁMARA
		
		var altura = 0;	//borrar cuando usemos el código de abajo
		
		
		//DIBUJAMOS CON TEXTURA
		var altoTextura = 64;
		
		var alturaTextura = y0 - y1;
		ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
		ctx.drawImage(tiles,this.pixelTextura,((this.idTextura -1 )*altoTextura),this.pixelTextura,63,x,y1 + altura,1,alturaTextura);	
		
	}
	
	
	
	
	dibuja(){

		//LANZAMOS EL RAYO
		this.cast();
		
		
		
			this.renderPared();
		
		
/*
			//LÍNEA DIRECCIÓN
			var xDestino = this.wallHitX;    
			var yDestino = this.wallHitY;	
			
			this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y);
			this.ctx.lineTo(xDestino, yDestino);
			this.ctx.strokeStyle = "red";
			this.ctx.stroke();
*/
		
	}
	
	
}



//-----------------------------------------------------------------------

const FOV = 60;

class Player{
	
	constructor(con,escenario,x,y){
		
		this.ctx = con;
		this.escenario = escenario;
		
		this.x = x;
		this.y = y;

		this.casillaY;
		this.casillaX
		
		this.avanza = 0;	//-1 atrás, 1 adelante
		this.gira = 0;		//-1 izquierda, 1 derecha

		this.anguloRotacion = 0;
		
		this.velGiro = convierteRadianes(3);		//3 grados en radianes
		this.velMovimiento = 5;
		
		
		//VISIÓN (RENDER)
		this.numRayos = canvasAncho;		//Cantidad de rayos que vamos a castear (los mismos que tenga el ancho del canvas)
		this.rayos = [];					//Array con todos los rayos
		
		
		//CALCULAMOS EL ANGULO DE LOS RAYOS
		var medioFOV 		 	 = FOV/2;		
		var incrementoAngulo	 = convierteRadianes(FOV / this.numRayos);
		var anguloInicial 	 	 = convierteRadianes(this.anguloRotacion - medioFOV);
		
		var anguloRayo = anguloInicial;
		
		//CREAMOS RAYOS
		for(let i=0; i<this.numRayos; i++){
			
			this.rayos[i] = new Rayo(this.ctx, this.escenario,this.x, this.y, this.anguloRotacion, anguloRayo,i);
			anguloRayo += incrementoAngulo;
		}
	
	}
	
	//LÓGICA DEL TECLADO
	arriba(){
		this.avanza = 1;
	}

	corre(){
		this.avanza = 2
	}
	
	abajo(){
		this.avanza = -1;
	}
	
	derecha(){
		this.gira = 1;
	}
	
	izquierda(){
		this.gira = -1;
	}

	temblar(vel){
		canvas.style.animation = 'shake '+vel+'s'+' infinite'
	}
	
	
	avanzaSuelta(){
		this.avanza = 0;
		canvas.style.animation = 'shake 0s infinite'
	}
	
	giraSuelta(){
		this.gira = 0;
	}
	
	
	
	colision(x,y){
		
		var choca = false;
		
		//AVERIGUAMOS LA CASILLA A LA QUE CORRESPONDEN NUESTRAS COORDENADAS
		this.casillaX = parseInt(x/this.escenario.anchoT);
		this.casillaY = parseInt(y/this.escenario.altoT);
		
		if(this.escenario.colision(this.casillaX, this.casillaY))
			choca = true;
		
		return choca;
	}
	
	
	
	//ACTUALIZAMOS LA POSICIÓN
	actualiza(){

		//AVANZAMOS
		var nuevaX = this.x +this.avanza * Math.cos(this.anguloRotacion) * this.velMovimiento;
		var nuevaY = this.y + this.avanza * Math.sin(this.anguloRotacion) * this.velMovimiento;
		
		if(!this.colision(nuevaX,nuevaY)){
			this.x = nuevaX;
			this.y = nuevaY;
		}
		
		//GIRAMOS
		this.anguloRotacion += this.gira * this.velGiro;
		this.anguloRotacion = normalizaAngulo(this.anguloRotacion);	//normalizamos
		
		
		//ACTUALIZAMOS LOS RAYOS
		for(let i=0; i<this.numRayos; i++){
			this.rayos[i].x = this.x;
			this.rayos[i].y = this.y;
			this.rayos[i].setAngulo(this.anguloRotacion);
		}
		
		
	}
	
	dibuja(){
		
		//ANTES DE DIBUJAR ACTUALIZAMOS
		this.actualiza();
		
		//RAYOS
		for(let i=0; i<this.numRayos; i++){
			this.rayos[i].dibuja();
		}	

			/*PUNTO
			this.ctx.fillStyle = '#FFFFFF';
			this.ctx.fillRect(this.x-3, this.y-3, 6,6);
			
			
			//LÍNEA DIRECCIÓN
			var xDestino = this.x + Math.cos(this.anguloRotacion) * 50;    //40 es la longitud de la línea
			var yDestino = this.y + Math.sin(this.anguloRotacion) * 50;	
			
			this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y);
			this.ctx.lineTo(xDestino, yDestino);
			this.ctx.strokeStyle = "#FFFFFF";
			this.ctx.stroke();
			//*/
		    
		
	}
	
}

//------------------------------------------------------------------------------------
//MODIFICAMOS EL ESTILO CSS (por eso usamos canvas.style.width y no canvas.width)
function reescalaCanvas(){
	canvas.style.width = '100%';
	canvas.style.height = "100%";
}

//-------------------------------------------------------------------------------------
var ray;
var tiles;
 
var sprites = [];	//array con los sprites
var zBuffer = [];	//array con la distancia a cada pared (con cada rayo)
 
//-------------------------------------------------------------------------------------
//SPRITES


const FOVRadianes = convierteRadianes(FOV);
const FOV_medio	  = convierteRadianes(FOV/2);


class Sprite{

	constructor(x,y,imagen){
		
		this.x 		 = x;
		this.y 		 = y;
		this.imagen  = imagen;
		
		this.distancia = 0;
		this.angulo  = 0;
		
		this.visible = false;
		
	}
	
	
	
	//CALCULAMOS EL ÁNGULO CON RESPECTO AL JUGADOR
	calculaAngulo(){


			var vectX = this.x - jugador.x;
			var vectY = this.y - jugador.y;
			

			var anguloJugadorObjeto = Math.atan2(vectY, vectX);
			var diferenciaAngulo = jugador.anguloRotacion - anguloJugadorObjeto;
			
			
			
			if (diferenciaAngulo < -3.14159)
				diferenciaAngulo += 2.0 * 3.14159;
			if (diferenciaAngulo > 3.14159)
				diferenciaAngulo -= 2.0 * 3.14159;
			
			
			diferenciaAngulo = Math.abs(diferenciaAngulo);
			

			if(diferenciaAngulo < FOV_medio)
				this.visible = true;
			else
				this.visible = false;


	}
	
	
	
	calculaDistancia(){
		this.distancia = distanciaEntrePuntos(jugador.x,jugador.y,this.x,this.y)
	}
	
	
	actualizaDatos(){
		this.calculaAngulo();
		this.calculaDistancia();
	}
	
	
	dibuja(){
		
		this.actualizaDatos();
		
		
		/*punto mapa (Borrar)
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(this.x-3, this.y-3, 6,6);
		*/
		
		if(this.visible == true){
			
			
			var altoTile = canvasAlto;		//Es la altura que tendrá el sprite al renderizarlo
			var distanciaPlanoProyeccion = (canvasAncho/2) / Math.tan(FOV / 2);
			var alturaSprite = (altoTile / this.distancia) * distanciaPlanoProyeccion;

			
			
			//CALCULAMOS DONDE EMPIEZA Y ACABA LA LÍNEA, CENTRÁNDOLA EN PANTALLA (EN VERTICAL)
			var y0 = parseInt(canvasAlto/2) - parseInt(alturaSprite/2);
			var y1 = y0 + alturaSprite;
			
			if (this.imagen.src.includes('smiler')){
				var altoTextura = 500;
				var anchoTextura = 500;
			} else if (this.imagen.src.includes('planta')){
				var altoTextura = 64;
				var anchoTextura = 64;
			} else if (this.imagen.src.includes('smiler2')){
				var altoTextura = 500;
				var anchoTextura = 500;
			}
					
			var alturaTextura = y0 - y1;
			var anchuraTextura = alturaTextura;	//LOS SPRITES SON CUADRADOS
			
			

			//---------------------------------------------------------------------------
			// CALCULAMOS LA COORDENADA X DEL SPRITE
			
			var dx = this.x - jugador.x;
			var dy = this.y - jugador.y;
			
			var spriteAngle = Math.atan2(dy, dx) - jugador.anguloRotacion;
			
			var viewDist = canvasAncho;
			
			var x0 = Math.tan(spriteAngle) * viewDist;
			var x = (canvasAncho/2 + x0 - anchuraTextura/2);
			
			
			//-----------------------------------------------------------------------------
			ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
			
			
			//proporción de anchura de X (según nos acerquemos, se verán más anchas las líneas verticales)
			var anchuraColumna = alturaTextura/altoTextura;	
			

			//DIBUJAMOS EL SPRITE COLUMNA A COLUMNA PARA EVITAR QUE SE VEA TRAS UN MURO
			//LO HAGO CON DOS BUCLES, PARA ASEGURARME QUE DIBUJO LÍNEA A LÍNEA Y NO TIRAS DE LA IMAGEN 
			
			for(let i=0; i< anchoTextura; i++){
				for(let j=0; j<anchuraColumna; j++){
					
					var x1 = parseInt(x+((i-1)*anchuraColumna)+j);	
					
					//COMPARAMOS LA LÍNEA ACTUAL CON LA DISTANCIA DEL ZBUFFER PARA DECIDIR SI DIBUJAMOS
					if(zBuffer[x1] > this.distancia){
						ctx.drawImage(this.imagen,i,0,1,altoTextura-1,x1,y1,1,alturaTextura);
					}
					
					
				}
			}
			
			
	
	
		
		}
	
	}

}

//-------------------------------------------------------------------------------------
//texto

let tilesFuente;

const oscilacionEntreLetras = 10;
const velocidadLetras = 0.3;
const amplitudMovimiento = 3;


class Texto{

	constructor(){
		this.clipX; 	//posición x clipping
		this.clipY;	//posicion y clipping

		this.tamX; 	//tamaño X
		this.tamY;	//tamaño Y

		this.espacio = 0;

		this.yMov = 0;

	}


	letra(caracter,x,y){
		this.clipX = atlas[caracter].x;
		this.clipY = atlas[caracter].y;

		this.tamX = atlas[caracter].w;
		this.tamY = atlas[caracter].h;

		ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
		ctx.drawImage(tilesFuente,this.clipX,this.clipY,this.tamX,this.tamY,(x + this.espacio),y,this.tamX + 15,this.tamY + 30);
	}


	frase(cadena,x,y){
		this.espacio = 0;	//inicializamos a cero los espacios

		var yMovAux = this.yMov;
		var desplazamiento = 0;

		for(var a=0; a<cadena.length; a++){

			desplazamiento = Math.sin(yMovAux)*amplitudMovimiento;
			yMovAux += oscilacionEntreLetras;

			this.letra(cadena[a],x,(y+desplazamiento)/*y*/);
			this.espacio += this.tamX + 15;
		}

		this.yMov += velocidadLetras;

	}

}

let texto1Seconds = new Texto()
let texto2MoveCamara = new Texto()
let texto3Move = new Texto()
let texto4Aviso = new Texto()
let texto5Click = new Texto()
let texto6Muerte = new Texto()
let texto7Record = new Texto()

//-------------------------------------------------------------------------------------
 
 //ALGORITMO DEL PINTOR, ORDENAMOS LOS SPRITES DE MÁS LEJANO AL JUGADOR A MÁS CERCANO
 let morir = 0
 let vel = 5

var imgSmiler;
var imgPlanta;
 
 function renderSprites(){
	 
	 
	//NOTA: HACER EL ALGORITMO DE ORDENACIÓN MANUAL
	 
	//ALGORITMO DE ORDENACIÓN SEGÚN DISTANCIA (ORDEN DESCENDENTE)
	//https://davidwalsh.name/array-sort

	sprites.sort(function(obj1, obj2) {
		// Ascending: obj1.distancia - obj2.distancia
		// Descending: obj2.distancia - obj1.distancia
		return obj2.distancia - obj1.distancia;
	});
	
	//DIBUJAMOS LOS SPRITES UNO POR UNO
	for(a=0; a<sprites.length; a++){
		sprites[a].dibuja();
		if (sprites[a].imagen.src.includes('smiler')){
		let smilers = {
				x: sprites[a].x,
				y: sprites[a].y,
				vel: Math.floor(Math.random() * vel),
				url: sprites[a].imagen,
				jCasillaX: jugador.casillaX,
				jCasillaY: jugador.casillaY,
				jX: jugador.x,
				jY: jugador.y,
				buscar: function(){
						if (this.jX > this.x){
							this.x += this.vel
						} else {
							this.x -= this.vel
						}
		
						if (this.jY > this.y){
							this.y += this.vel
						} else {
							this.y -= this.vel
						}

						if (parseInt(this.x/escenario.anchoT) === this.jCasillaX && parseInt(this.y/escenario.altoT) === this.jCasillaY){
							morir += 0.007
							jugador.temblar(0.01)
						} else {
							if (morir > 0.9){
								
								setTimeout(() => muerto = true,1500)
							} else {
								if (morir < 0.001){
									morir = 0
								} else {
									morir -= 0.001
								}
							}

					}
				},
				mover: function(){
					sprites[a].x = this.x
					sprites[a].y = this.y
				}
	
			}
			smilers.buscar()
			smilers.mover()
		}

	}
  
 }

 function inicializaSprites(){
 
  //CARGAMOS SPRITES
  imgSmiler = new Image();
  imgSmiler.src = "img/smiler.png";
  
  imgPlanta = new Image();
  imgPlanta.src = "img/planta.png";
  
  //CREAMOS LOS OBJETOS PARA LAS IMÁGENES
  sprites[0] = new Sprite(300,120,imgSmiler);
  sprites[1] = new Sprite(150,150,imgSmiler);
  sprites[2] = new Sprite(320,300,imgPlanta);
  sprites[3] = new Sprite(300,380,imgPlanta);
  sprites[4] = new Sprite(100,380,imgSmiler);
  
 }
 
 
//============================================================================ 
function inicializa(){
  
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  
  //CARGAMOS TILES
  tiles = new Image();
  tiles.src= "img/walls.png";

  //texto
  tilesFuente = new Image()
  tilesFuente.src = 'img/boxy_bold_font.png'

  escenario = new Level(canvas,ctx,nivel1);
  jugador = new Player(ctx,escenario,200,200);

  //CARGAMOS LOS SPRITES DESPUÉS DEL ESCENARIO Y EL JUGADOR
  inicializaSprites();
	

  //EMPEZAMOS A EJECUTAR EL BUCLE PRINCIPAL
	game()
  //AMPLIAMOS EL CANVAS CON CSS
  reescalaCanvas();
}



function borraCanvas(){
  canvas.width = canvasAncho - tamTile * Math.round(tamTile / nivel1[0].length) / 2;
  canvas.height = canvasAlto - tamTile * Math.round(tamTile / nivel1.length) / 2;
}


//PINTA COLORES BÁSICOS PARA SUELO Y TECHO
function sueloTecho(){
	ctx.fillStyle = '#0F1123';
	ctx.fillRect(0, 0, canvasAncho, canvasAlto/2);
	
	ctx.fillStyle = '#261C2C';
	ctx.fillRect(0, canvasAlto/2, canvasAncho, 500);
	
}

function vhsEfect(){
	ctx.globalAlpha = morir;
	let img = new Image()
	img.src = 'img/vhs.png'
	ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
	ctx.drawImage(img,0,0,canvasAncho,canvasAlto);
}

function punto(){

	ctx.globalAlpha = 1
	ctx.beginPath();
	ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
	ctx.arc(canvasAncho/2 - tamTile,canvasAlto/2,nivel1[0].length/5,0,2 * Math.PI,true)
	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'black'
	ctx.lineWidth = 2
	ctx.stroke()
	ctx.fill()

}

  //mapa random
function mapaRandom(){
	for (let x = 0; x < nivel1[0].length; x ++){
		for (let y = 0; y < nivel1.length; y ++){

			let tipo = 0
			let random = Math.floor(Math.random() * 10)
			if (random == 1){
				let random2 = Math.floor(Math.random() * 4)
				if (random2 == 0){
					tipo = 1
				} else {
					tipo = random2
				}
			} else {
				tipo = 0
			}
			nivel1[y][x] = tipo

			nivel1[jugador.casillaY][jugador.casillaX] = 0

			let random3 = Math.floor(Math.random() * 4)
			if (random3 == 0){
				random3 = 1
			}
			nivel1[0][x] = random3
			nivel1[nivel1.length - 1][x] = random3
			nivel1[y][0] = random3
			nivel1[y][nivel1.length - 1] = random3

		}
	}
}

let seconds = 0
let miliseconds = 0
let contador = 10

if (localStorage.getItem('seconds')){
} else {
	parseInt(localStorage.setItem('seconds',seconds))
}
if (localStorage.getItem('miliseconds')){
} else {
	parseInt(localStorage.setItem('miliseconds',miliseconds))
}

let activarMilisecond = false
setInterval(() => {
	if (gameLet == true){
			if(document.hidden){
			} else {
				seconds += 1
				if (seconds > parseInt(localStorage.getItem('seconds'))){
					parseInt(localStorage.setItem('seconds',seconds))
					activarMilisecond = true
				}
				if (seconds > contador){
					contador += 10
					let img = new Image()
					img.src = 'img/smiler.png'
					sprites.push(new Sprite(Math.floor(Math.random() * nivel1[0].length),Math.floor(Math.random() * nivel1.length),img))
				}
				if (seconds == 10){
					vel += 1
				}
				if (seconds == 20){
					vel += 1
				}
				if (seconds == 25){
					vel += 1
				}
			}
	}

}, 1000);
setInterval(() => {
	if (gameLet == true){
		if(document.hidden){
	    } else {
			miliseconds += 1
			if (activarMilisecond){
				if (miliseconds > parseInt(localStorage.getItem('miliseconds'))){
					parseInt(localStorage.setItem('miliseconds',miliseconds))
				}	
			}
			if (miliseconds >= 10){
				miliseconds = 0
				if (activarMilisecond){
					parseInt(localStorage.setItem('miliseconds',miliseconds))
				}
			}

	    }
	}

}, 100);
function crearTiempo(){
	ctx.globalAlpha = 1
	texto1Seconds.frase(seconds+'.'+miliseconds+' segundos :)',10,10)
}

function efectSmiler(){
	ctx.globalAlpha = morir;
	let img = new Image()
	img.src = 'img/smiler.png'
	ctx.imageSmoothingEnabled = false;	//PIXELAMOS LA IMAGEN
	ctx.drawImage(img,0,0,canvasAncho,canvasAlto);
}

let newMessage = new Texto()
let comfirNoM = false
let comfirRun = false
let comfirQson = false
setInterval(() => {
	let random = Math.floor(Math.random() * 20)

	if (random == 10){
		ctx.globalAlpha = 1;

		let random2 = Math.floor((Math.random() * 3) + 1)
		if (random2 === 1){			
			comfirNoM = true
			setTimeout(() => comfirNoM = false,2000)
		} else if (random2 === 2) {
			comfirRun = true
			setTimeout(() => comfirRun = false,2000)
		} else if (random2 === 3){
			comfirQson = true
			setTimeout(() => comfirQson = false,2000)
		}
	}

}, 500);

let cargado = 0
function game(){
	requestAnimationFrame(game)
	borraCanvas();
	if (muerto){
		jugador.temblar(0)
		texto6Muerte.frase('* :)',canvasAncho/2 - 60,200)
				setTimeout(() => {
					location.reload()
				},3000)
	} else {
		if (gameLet == true){
					//escenario.dibuja();
					sueloTecho();
					jugador.dibuja();
					renderSprites();
					crearTiempo()
					vhsEfect()
					efectSmiler()
					cargado += 1
					if (cargado == 1){
					  mapaRandom()
					}
					punto()

				if (comfirNoM)
					newMessage.frase('* no mires atras!',canvasAncho/2 - 190,250)
				if (comfirRun)
					newMessage.frase('* no pares de correr!',canvasAncho/2 - 140,250)
				if (comfirQson)
					newMessage.frase('* que son esas cosas',canvasAncho/2 - 150,250)

		} else {
			texto4Aviso.frase('recuerda: cuando empieses deveras correr!',canvasAncho/2 / tamTile,canvasAlto/2)
			texto5Click.frase('click para empesar',canvasAncho/2 - 220,200)
	
			document.addEventListener('click', function(e){
				gameLet = true
			})
		}
		texto2MoveCamara.frase('mover camara: a y d',10,canvasAlto - 200)
		texto3Move.frase('mover: w y s',10,canvasAlto - 120)
		texto7Record.frase('tu record: ' + parseInt(localStorage.getItem('seconds')) + "." + parseInt(localStorage.getItem('miliseconds')) + " segundos",350,100)
	}
}

console.log(parseInt(localStorage.getItem('miliseconds')))

//cuando salgas de la pantalla no te siga sumando segundos


//despues del juego meterme con lo de pishics