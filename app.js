var textualization = require('./lib/textualization').languages(['es','en']);
var formwork = require('./lib/formwork');
var Pillar = require('./lib/Pillar');
var bricks = require('./lib/bricks');
var Beam = require('./lib/Beam');
var beams = require('./lib/beams');


var server = formwork().mongodb('primera')

//textualization.load('crud-example','examples/crud.t12n');

var mymodel = new bricks.Fieldset('system',{
	title : 'System administration',
	details : 'Completa los campos',
	server : server,
	collection : 'system',
	//t12n : './lib/crud.t12n'
	limit : 3,
	filter : ['_id','field1','field2'], 
	headers : [
		{id: '_id',label: 'Identificador'},
		{id: '_img',label: 'Imagen'},
		{id: 'field1',label: 'Field1'},
		{id: 'field2',label: 'Field2'},
		//{id: 'file',label: 'Filetest'},
		{id: 'reverse',label: 'Reverse'}
	]
})
	.addField(new bricks.Text('field1',{
		label : 'Field1',
		details : 'Rellena este campo...',
		keys : {
			see : 'edit_system',
			edit : 'manager'
		}
	}))
	.addField(new bricks.Checkbox('fieldCheck',{
		label : 'Field checkbox',
		details : 'Si o no?'
	}))
	.addField(new bricks.Checkboxes('fieldCheckboxes',{
		label : 'Field checkboxes',
		details : 'Que eliges?',
		values : {
			'A':'Opción 1',
			'B':'Opción 2',
			'C':'Opción 3',
			'D':'Opción 4'	
		}
	}))
	.addField(new bricks.Radios('fieldRadios',{
		label : 'Field radios',
		details : 'Que eliges?',
		values : {
			'A':'Opción 1',
			'B':'Opción 2',
			'C':'Opción 3',
			'D':'Opción 4'	
		}
	}))
	.addField(new bricks.Select('field2',{
		label : 'Field2',
		values : {
			'A':'Opción 1',
			'B':'Opción 2',
			'C':'Opción 3',
			'D':'Opción 4'
		}
	}))
	.addField(new bricks.Time('fieldTime',{
		label : 'Field Time',
		details : 'Seleccione una fecha'
	}))
	.addField(new bricks.Reference('fieldRef',{
		label : 'Field Reference',
		details : 'Seleccione un algo',
		collection : 'system',
		headers : [
			{id: '_id',label: 'Identificador'},
			{id: '_img',label: 'Imagen'},
			{id: 'field1',label: 'Field1'},
			{id: 'field2',label: 'Field2'},
			//{id: 'file',label: 'Filetest'},
			{id: 'reverse',label: 'Reverse'}
		]
	}))
	.addField(new bricks.Img('_img',{
		label : 'Imagen destacada'
	}))
	.addField(new bricks.Reverse('reverse',{
		label : 'Reverse',
		details : 'Este va invertido en la bdd'
	}))
	.addField(new bricks.List('listFiles',{
		label : 'listado de imagenes',
		details : 'esto es un listado de imagenes'
	})
		.addField(new bricks.Img('file',{
			label : 'Imagen',
		}))
		.addField(new bricks.Text('text',{
			label : 'Alt',
			details : 'Describe la imagen'
		}))
	)
	.addField(new bricks.List('list',{
		label : 'listado',
		details : 'esto es un listado',
	})
		.addField(new bricks.File('file',{
			label : 'Imagen',
		}))
		.addField(new bricks.Text('field2',{
			label : 'Field2',
			details : 'Rellena este campo...'
		}))
		.addField(new bricks.Reverse('reverse',{
			label : 'Reverse',
			details : 'Este va invertido en la bdd'
		}))
	)
	.addField(new bricks.Editor('texti18n',{
		label : 'Text i18n',
		i18n : true,
		details : 'Un campo internacional'
	}))
	.addField(new bricks.Text('field3',{
		label : 'Field3',
		details : 'Rellena este campo...'
	}))
	.addField(new bricks.Subset('thesubset',{
		label : 'Un subset',
		details : 'Conjunto de campos independiente'
	})
		.addField(new bricks.Text('subset1',{
			label : 'Campo1'
		}))
		.addField(new bricks.Text('subset2',{
			label : 'Campo2'
		}))
		.addField(new bricks.Text('subset3',{
			label : 'Campo3'
		}))
	)
;

server.addPillar(new Pillar({
	id:'sample-pillar',
	path:'/system'
})
	.addBeam(new Beam('template',{session:true,schema:mymodel},beams.apiTemplate))
	.addBeam(new Beam('search',{path:'/api',session:true,schema:mymodel},beams.apiList))
	.addBeam(new Beam('get',{path:'/api/:_id',session:true,schema:mymodel},beams.apiGet))
	.addBeam(new Beam('update',{path:'/api/:_id',method:'put',upload:true,session:true,schema:mymodel},beams.apiUpdate))
	.addBeam(new Beam('insert',{path:'/api',method:'post',session:true,schema:mymodel},beams.apiInsert))
	.addBeam(new Beam('remove',{path:'/api/:_id',method:'delete',session:true,schema:mymodel},beams.apiRemove))
	.addBeam(new Beam('files',{path:'/files/*:path',method:'get',session:true,schema:mymodel,directory:'./files/system'},beams.apiFiles))
);


server.addPillar(new Pillar({id:'staticfiles'})
	.addBeam(new Beam('css',{path:'/css/*:path',directory:'./static/css'},beams.directory))
	.addBeam(new Beam('file',{path:'/file/*:path',directory:'./static/file'},beams.directory))
	.addBeam(new Beam('img',{path:'/img/*:path',directory:'./static/img'},beams.directory))
	.addBeam(new Beam('js',{path:'/js/*:path',directory:'./static/js'},beams.directory))
	.addBeam(new Beam('data',{path:'/data/*:path',directory:'./static/data'},beams.directory))
	.addBeam(new Beam('uploads',{path:'/uploads/*:path',directory:'./uploads'},beams.directory))
);

server.addPillar(new Pillar({id:'login'})
	.addBeam(new Beam('login',{path:'/login',method:'(get|post)',session:true},function(){
		var gw = this;
		var redirect = gw.params.redirect || gw.referer || gw.host;
		console.log(redirect);
		if(typeof gw.params.user === "string" && typeof gw.params.password === "string"){
			var login = {
				user : gw.params.user,
				password : gw.params.password
			};
			var users = gw.server.database.collection('users');
			users.findOne({user:login.user,password:login.password},function(error, result) {
				if(!error && result){
					gw.session.user = result._id.toString();
					gw.redirect(redirect);
				} else {
					gw.render('templates/login.jade',{redirect:redirect,msg:'login.fail'});
				}
			});
		} else {
			gw.render('templates/login.jade',{redirect:redirect});
		}
	}))
);



var usersSchema = new bricks.Fieldset('users',{
	title : 'Usuarios',
	details : 'Gestión de cuentas de usuario',
	server : server,
	collection : 'users',
	//t12n : './lib/crud.t12n'
	limit : 3,
	filter : ['_id','user','firstname','lastname'], 
	headers : [
		{id: '_id',label: 'Identificador'},
		{id: 'user',label: 'Usuario'},
		{id: 'firstname',label: 'Nombre'},
		{id: 'lastname',label: 'Apellidos'}
	]
})
	.addField(new bricks.Text('user',{
		label : 'Usuario',
		details : 'Nombre para su cuenta y acceso a la misma',
	}))
	.addField(new bricks.Text('firstname',{
		label : 'Nombre',
	}))
	.addField(new bricks.Text('lastname',{
		label : 'Apellidos',
	}))
	.addField(new bricks.Text('password',{
		label : 'Clave',
	}))
	.addField(new bricks.Text('keys',{
		label : 'Llaves',
		details : 'Indicar las llaves separadas por comas sin espacios.'
	}))

server.addPillar(new Pillar({
	id:'users',
	path:'/users'
})
	.addBeam(new Beam('template',{session:true,schema:usersSchema},beams.apiTemplate))
	.addBeam(new Beam('search',{path:'/api',session:true,schema:usersSchema},beams.apiList))
	.addBeam(new Beam('get',{path:'/api/:_id',session:true,schema:usersSchema},beams.apiGet))
	.addBeam(new Beam('update',{path:'/api/:_id',method:'put',upload:true,session:true,schema:usersSchema},beams.apiUpdate))
	.addBeam(new Beam('insert',{path:'/api',method:'post',session:true,schema:usersSchema},beams.apiInsert))
	.addBeam(new Beam('remove',{path:'/api/:_id',method:'delete',session:true,schema:usersSchema},beams.apiRemove))
	.addBeam(new Beam('files',{path:'/files/*:path',method:'get',session:true,schema:usersSchema,directory:'./files/system'},beams.apiFiles))
);

/*
var options = new bricks.Fieldset('options',{
	title : 'Opciones de sistema',
	details : 'Configura tu entorno Pillars',
	server : server,
	collection : 'config',
	panel : 'options'
})
	.addField(new bricks.Text('title',{
		label : 'Titulo',
		details : 'Titulo del sitio'
	}))
	.addField(new bricks.Text('description',{
		label : 'Descripción',
		details : 'Descripción corta del sitio'
	}))

server.addPillar(new Pillar({
	id:'sample-pillar',
	path:'/config'
})
	.addBeam(new Beam('options',{path:'/options',session:true,schema:mymodel},beams.apiPanelTemplate))
	.addBeam(new Beam('options-get',{path:'/options/api',session:true,schema:mymodel},beams.apiPanelGet))
	.addBeam(new Beam('options-update',{path:'/options/api',method:'put',upload:true,session:true,schema:mymodel},beams.apiPanelUpdate))

	.addBeam(new Beam('files',{path:'/files/*:path',method:'get',session:true,schema:mymodel,directory:'./files/config'},beams.apiFiles))
);
*/

function Chain(){
	var chain = this;
	var chainlinks = [];
	var failhandler = false;
	chain.data = {};
	chain.add = function(func){
        var args = Array.slice(arguments,1);
        chainlinks.push({func:func,args:args});
		return chain;
	}
	chain.onfail = function(_failhandler){
		failhandler = _failhandler;
		return chain;
	}
	chain.pull = function(){
		if(chainlinks.length>0){
			chainlinks[0].func.apply(chain,chainlinks[0].args);
		}
	}
	chain.next = function(){
		chainlinks.shift();
		chain.pull();
	}
	chain.fail = function(error){
		if(failhandler){
			failhandler(error,chain);
		}
	}
}


/*

var timetag = ('TranslationTime').cyan;console.time(timetag);
var translations = [
	gw.t12n("general.actionbutton",{context:'post',action:'new',num:5}),
	gw.t12n("general.actionbutton",{context:'post',action:'new',num:1}),
	gw.t12n("general.welcome",{genre:'female',num:3}),
	gw.t12n("general.welcome",{num:2}),
	gw.t12n("general.goobye",{genre:'female',num:3}),
	gw.t12n("general.logout"),
	gw.t12n("general.error",{error:'crashhhh!!!'}),
	gw.t12n("general.you_have_new_messages",0),
	gw.t12n("general.you_have_new_messages",1),
	gw.t12n("general.you_have_new_messages",20),
	gw.t12n("general.noexist",2),
	gw.t12nc(["clasical basic"]),
	gw.t12nc(["clasical %s here %s ..."],["Translation","now"]),
	gw.t12nc(["You have 1 mail","You have %s mails"],[0]),
	gw.t12nc(["You have 1 mail","You have %s mails"],[1]),
	gw.t12nc(["You have 1 mail","You have %s mails"],[30]),
	gw.t12nc("You have 1 message",[0]),
	gw.t12nc("You have 1 message",[1]),
	gw.t12nc("You have 1 message",[30]),
	gw.t12nc(["You no have mails","You have 1 mail","You have %s mails"],[0]),
	gw.t12nc(["You no have mails","You have 1 mail","You have %s mails"],[1]),
	gw.t12nc(["You no have mails","You have 1 mail","You have %s mails"],[18]),
	gw.t12nc("You no have messages",0),
	gw.t12nc("You no have messages",1),
	gw.t12nc("You no have messages",18)
];
console.timeEnd(timetag);

*/

/* *
var memwatch = require('memwatch');
var hd = new memwatch.HeapDiff();
var leaks = [];
var stats = [];
memwatch.on('stats', function(_stats) {
	_stats.diff = hd.end();
	stats.push(_stats);
	hd = new memwatch.HeapDiff();
});
memwatch.on('leak', function(info) {
	leaks.push(info);
});
.addBeam(new Beam('stats',{path:'/stats'},function(){
	var gw = this;
	gw.send(stats);
}))
.addBeam(new Beam('leaks',{path:'/leaks'},function(){
	var gw = this;
	gw.send(leaks);
}))
/* */

/*

.addBeam(new Beam('download',{path:'/file',session:true},function(){
	var gw = this;
	gw.file('./uploads/exquisite0002.png','prueba.txt',false);
}))
.addBeam(new Beam('form',{path:'/form',method:'(get|post)',session:true,upload:true},function(){
	var gw = this;
	if(!gw.session.counter){gw.session.counter=0;}
	gw.session.counter++;

	var body = templates.render('./form.jade',{
		trace: util.format(gw),
		title:'Method test',
		h1:'Method testing:'
	});
	gw.send(body);	
}))

*/

//var filepath = path.replace(/[^\\\/]*$/,'');
//var filename = path.replace(/^.*[\\\/]/,'').replace(/\..*$/,'');
//var fileext = path.replace(/^.*[\.]/,'');

/* Emitter-mod *
var EventEmitter = require('events').EventEmitter;
EventEmitter.prototype.__emit = EventEmitter.prototype.emit;
EventEmitter.prototype.__onAll = function(type){console.log('{Event}--'+this.constructor.name+'('+type+')');}
EventEmitter.prototype.emit = function(){
	this.__onAll.apply(this,arguments);
	return this.__emit.apply(this,arguments);
}
/* */

/* *

function isUndefined(arg) {
  return arg === void 0;
}

function isString(arg) {
  return typeof arg === 'string';
}
function isBuffer(arg) {
  return arg instanceof Buffer;
}
function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

/* */

/*

 else {
			gw.setHeader('Allow',gw.beam.getConfig().methods.join(', ').toUpperCase());
			gw.error(405,'Method not allowed');
		}

*/
		/*
		if(/^\/contenido\/?$/.test(gw.path)){

			if(!gw.session.counter){gw.session.counter=0;}
			gw.session.counter++;

			var body = tiles.render('./form.jade',{
				//trace: util.format(gw),
				title:'Method test',
				h1:'Method testing:'
			});
			gw.send(body);	

		} else if(/^\/yalotengo\/?$/.test(gw.path)){
			if(!gw.cacheck(new Date(false))){
				gw.send('Este contenido es fijo y se cachea');
			}
		} else if(/^\/espera\/?$/.test(gw.path)){
			// Force timeout!
		} else if(/^\/redirecciona\/?$/.test(gw.path)){
			gw.redirect('http://localhost:3000/yalotengo');
		} else if(/^\/auth\/?$/.test(gw.path)){
			gw.authenticate();
		} else if(/^\/malapeticion\/?$/.test(gw.path)){
			gw.error(400,'Bad Request');// 405 Method not allowed 	Allow: GET, HEAD
		} else if(/^\/archivo\/?$/.test(gw.path)){
			gw.file('./uploads/exquisite0002.png','prueba.txt',false);
		} else if(/^\/error\/?$/.test(gw.path)){
			throw new Error("Crashhh!");
		} else {
			return false;
		}
		return true;
		*/
