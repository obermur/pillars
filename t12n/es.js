
'statusCodes':function(){
	switch(code){
		case 400:
			return 'Bad Request';
		case 404:
			return 'Not Found';
		case 406:
			return 'Not Acceptable';
		case 408:
			return 'Request Timeout';
		case 413:
			return 'Request Entity Too Large';
		case 500:
			return 'Internal Server Error';
		default:
			return 'Unknow code';
	}
},
'server':{
	'error':"Server error on %(hostname)s:%(port)s",
	'listening':"Server listening on %(hostname)s:%(port)s",
	'closed':"Server closed on %(hostname)s:%(port)s",
	'socket-closed': "%(poolid)s Socket closed",
	'socket-open': "%(poolid)s Socket open",
	'database':{
		'connection-ok':"Database '%(dbname)s' connected on %(url)s:%(port)s",
		'connection-error':"Database '%(dbname)s' error on %(url)s:%(port)s"
	}
},
'textualization':{
	'langs':function(){
		if(langs && langs.length>0){
			return "Textualization languages: "+langs.join(',');
		} else {
			return "Textualization languages empty";
		}
	},
	'load-ok':"Textualization sheet loaded for domain:'%(domain)s', path:'%(path)s', locale:'%(locale)s'",
	'load-error':"Textualization sheet fail load for domain:'%(domain)s', path:'%(path)s', locale:'%(locale)s'"
},
'templates':{
	'cache-ok':"Template '%(path)s' loaded",
	'cache-error':"Fail on load template '%(path)s'"
},
'gangway':{
	'unlinktemp':{
		'ok':"Temp 'file %(file)s' deleted",
		'error':"Fail on delete temp file '%(file)s'"
	},
	'error':{
		'h1':"Error %(code)s %(explain)s"
	}
},
general:{
	welcome:{ // genre, num
		'genre=="female" && num==1':'Bienvenida',
		'genre=="female"':'Bienvenidas todas vosotras que sois %(num)s',
		'num>1':'Bienvenidos',
		'default':'Bienvenido'
	},
	goobye:{ // genre, num
		'genre=="female" && num==1':'Chao chica',
		'genre=="female"':'Chao %(num)s chicas',
		'num>1':'chao tios',
		'default':'chao tio'
	},
	logout:"Salir y cerrar sesión",
	error:"Ha ocurrido un error: %(error)s",
	you_have_new_messages:["Tienes un mensaje nuevo","Tienes %s mensajes nuevos"],
	actionbutton:function(){ // context, action, num
		if(context=="post"){
			if(action=="new"){
				if(num==1){
					return "Crear un Post";
				} else if(num>1){
					return "Crear %(num)s Posts";
				}
			}
		}
		return "Unknow context";
	}
},
"clasical basic":"Formato clasico",
"clasical %s here %s ...":"%s clasica aqui %s ...",
"You have 1 message":["Tienes un mensaje","Tienes %s mensajes"],
"You no have messages":["No tienes mensajes","Tienes un mensaje","Tienes %s mensajes"]
