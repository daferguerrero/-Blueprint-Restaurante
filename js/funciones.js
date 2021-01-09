var ancho_pantalla,alto_pantalla,alto_menu;

new WOW().init();

var acciones = {
	listo:function(){
		jQuery("#lacarta .boton-amarillo").click(acciones.clickbtnamarillo);
		jQuery(".cabecera .menu a[href*='#']").click(acciones.irancla);
		jQuery(".btn-enviar").click(acciones.enviar);
		jQuery(".cabecera .hamb").click(acciones.abrirmenu);
		jQuery(".cerrarimagen").click(acciones.cerrarimagen);
		jQuery(".titulo-acordeon").click(acciones.abriracordeon);
		jQuery(".saltarina").click(acciones.irsaltarina);

		jQuery('.owl-carousel').owlCarousel({
		    loop:true,
		    margin:10,
		    nav:false,
		    responsive:{
		        0:{
		            items:1
		        },
		        768:{
		            items:1
		        },
		        1200:{
		            items:1
		        }
		    }
		})

		jQuery("#frmcontacto").validate({
			rules: {
				nombre: "required",
				email: {
					required: true,
					email: true
				},
				asunto: "required",
				mensaje: "required"
			},
			messages: {
				nombre: "Por favor, ingrese un nombre",
				email:{
					required: "Por favor, ingrese un e-mail",
					email: "Por favor, ingrese un e-mail válido",
				},
				asunto: "Por favor, ingrese un asunto",
				mensaje: "Por favor, ingrese un mensaje",
			},
			submitHandler: function(form) {

		jQuery.ajax(
		{
			method : "POST",
			url : "registro.php",
			data : jQuery("#frmcontacto").serialize(),
			dataType: "json"
		}).done(function(data)
		{
			/*jQuery("#respuesta").html(data);

			if (data.tipo == 1) {
				jQuery("#respuesta").css({"color":"green"}).html(data.mensaje);
			}else{
				jQuery("#respuesta").css({"color":"red"}).html(data.mensaje);
			}*/
		jQuery("#respuesta").html("");
		jQuery("label.error").remove();
		jQuery(".form-input.error").removeClass("error");
		if (data.tipo == 1) {
				jQuery("#respuesta").css({"color":"green"}).html(data.mensaje);
			}else if(data.tipo == 2) {
				jQuery.each(data.errores,function(indice,elemento){
					var html = "<label id='error-"+elemento.id+"' class='error'>"+elemento.mensaje+"</label>";
					jQuery("#"+elemento.id).addClass("error");
					jQuery("#"+elemento.id).closest(".form-bloques").append(html);
				});
			}else{
				alert(data.mensaje);
			}
			}).fail(function(error){
				jQuery("#respuesta").css({"color":"red"}).html(error.responseText);
		})
		}
		});
	},
	
	enviar:function()
	{
	/*	var nombre = jQuery("#nombre").val();
		var email = jQuery("#email").val();
		var asunto = jQuery("#asunto").val();
		var mensaje = jQuery("#mensaje").val();

		jQuery.ajax(
		{
			method : "POST",
			url : "registro.php",
			data : {
				"nombre" : nombre,
				"email" : email,
				"asunto" : asunto,
				"mensaje" : mensaje
			},
			dataType: "json"
		}).done(function(data)
		{
			/*jQuery("#respuesta").html(data);

			if (data.tipo == 1) {
				jQuery("#respuesta").css({"color":"green"}).html(data.mensaje);
			}else{
				jQuery("#respuesta").css({"color":"red"}).html(data.mensaje);
			}
		})*/

		/*jQuery("#respuesta").html("");
		jQuery(".error").remove();
		jQuery(".error-input").removeClass("error-input");
		if (data.tipo == 1) {
				jQuery("#respuesta").css({"color":"green"}).html(data.mensaje);
			}else{
				jQuery.each(data.errores,function(indice,elemento){
					var html = "<span class='error error-"+elemento.id+"'>"+elemento.mensaje+"</span>";
					jQuery("#"+elemento.id).addClass("error-input");
					jQuery("#"+elemento.id).closest(".form-bloques").append(html);
				});
			}
			}).fail(function(error){
				jQuery("#respuesta").css({"color":"red"}).html(error.responseText);
		})
		}
		});*/
	},
	
	irsaltarina:function()
	{
		var posicion = jQuery(this).closest("section").next("section").offset().top;
		jQuery("html,body").animate({
				"scrollTop" : posicion
			},800);
	},
	
	abriracordeon:function()
	{
		//jQuery(this).next("cuerpo-acordeon").slideDown("slow");

		if (jQuery(this).find("i").hasClass("fa-chevron-up")) 
		{
			jQuery(this).find("i").removeClass("fa-chevron-up");
		}else{
			jQuery(".titulo-acordeon").find("i").removeClass("fa-chevron-up");
			jQuery(this).find("i").addClass("fa-chevron-up")
		}
		jQuery(".cuerpo-acordeon").slideUp("slow");
		jQuery(this).next(".cuerpo-acordeon").stop().slideToggle("slow");
	},

	abrirmenu:function(e)
	{
		e.preventDefault();

		//****** Opcion 1 *****
		jQuery(".cabecera .menu").toggleClass("abierto");
		jQuery("body").toggleClass("abierto");
		jQuery(this).find("i").toggleClass("fa-times");


		//****** Opcion 2 *****
		/*if(jQuery(".cabecera .menu").hasClass("abierto"))
		{
			jQuery(".cabecera .menu").removeClass("abierto");
		}else{
			jQuery(".cabecera .menu").addClass("abierto");
		}*/

	},
	
	irancla:function(e)
	{
		e.preventDefault();
		var ancla = this.hash;
		var url = jQuery(this).attr("href");

		if (jQuery(ancla).length > 0) 
		{
			acciones.detalleancla(ancla);
		}else{
			window.location.href = url;
		}

		/*if (jQuery(ancla).length > 0) 
		{
			jQuery("html,body").animate({
				"scrollTop" : jQuery(ancla).offset().top
			},800);
		}else
		{
			window.location.href = url;
		}*/
	},
	
	detalleancla:function(ancla)
	{
		jQuery("html,body").animate({
			"scrollTop" : jQuery(ancla).offset().top
		},800,function(){
			/*jQuery(ancla).animate({
				"background-color":"red"
			}800);*/
			});
	},
	
	clickbtnamarillo:function(e)
	{
		e.preventDefault();
		var src = jQuery(this).closest(".contenedor-cuadrado").find("img").attr("src");

		jQuery(".cuerpoimagen").find("img").attr("src",src);
		jQuery(".trama").fadeIn("slow", function(){
			jQuery(".cuerpoimagen").fadeIn("fast");
		});
	},
	
	cerrarimagen:function(e)
	{
		e.preventDefault();
		jQuery(".cuerpoimagen").fadeOut("slow", function(){
			jQuery(".cuerpoimagen").find("img").attr("src","");
			jQuery(".trama").fadeOut("fast");
		});
	},
	
	precarga:function()
	{
		jQuery(".trama-2").fadeOut("slow");
		jQuery(".logo-load").fadeOut("slow",function()
		{
			jQuery("body").toggleClass("abierto");
		});
		setTimeout(function(){
			var ancla = window.location.hash;
			if (jQuery(ancla).length > 0)
			{
				acciones.detalleancla(ancla);
			}
		},1000);
		acciones.redimensionar();
	},
	
	redimensionar:function()
	{
		var cabecera = jQuery(".cabecera");
		var posicion_menu = cabecera.offset().top;
		alto_menu = cabecera.innerHeight();
		ancho_pantalla = jQuery(window).width();
		//alto_menu = jQuery(".cabecera").innerHeight();
		if(ancho_pantalla < 768)
		{
			jQuery(".cabecera .menu").css({"padding-top":alto_menu,"padding-bottom":alto_menu});
		}else{
			jQuery(".cabecera .menu").css({"padding-top":0,"padding-bottom":0});
		}

		if(posicion_menu > alto_menu)
		{
			cabecera.addClass("fondo");
		}else{
			cabecera.removeClass("fondo");
		}
	},
	
	scrollventana:function()
	{
		if (jQuery(window).scrollTop() > alto_menu)
		{
			jQuery(".cabecera").addClass("fondo");
		}else{
			jQuery(".cabecera").removeClass("fondo");
		}
	}
};

jQuery(window).on("load",acciones.precarga);
jQuery(window).resize(acciones.redimensionar);
jQuery(window).scroll(acciones.scrollventana);
jQuery(document).ready(acciones.listo);