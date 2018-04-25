var $$ = Dom7;

var app = new Framework7({
	root: '#app',
	name: 'ProjectUTS',
	id: 'com.ubaya.ProjectUTS',
	panel: { swipe: 'left' },
	theme: 'md',
	routes: [
	{
		path: '/ticket/',
		url: 'ticket.html'
	},
	{
		path: '/home/',
		url: 'home.html',
		on: {
			pageInit: function (e, page) {
				app.request.post('http://localhost:1310/phpProjectUTS/home.php', {}, function(data){
					var film = JSON.parse(data);
					for(var i=0; i < film.length; i++) {
		      			$$('#kontenfilm').append(
		      				"<li><img src='gambar/"+film[i]['gambar']+".jpg'><br><label>"+film[i]['judul']
		      				+"</label><p>Jam tayang: 13.00, 16.00, 19.00</p><div>"+film[i]['deskripsi']+"</div><a href='/ticket/'>Buy Ticket</a></li>"
		      			);
		    }	
				})
			},		
			pageAfterIn: function (event, page) {	
				if(!localStorage.username) {				
					page.router.navigate('/login/');
				}
			}
		}	
	},
	{
		path: '/driverlist/',
		url: 'driverlist.html'
	},
	{
		path: '/login/',
		url: 'login.html',
		on: {
			pageInit: function(e,page){
				$$('#btnLogin').on('click', function(){
					var un = $$('#username').val();
					var n = new FormData($$(".form-ajax-submit")[0]);
					app.request.post('http://localhost:1310/phpProjectUTS/login.php', n, function(data){
						if(data=="sukses"){
							localStorage.username = un;
							page.router.navigate('/home/');
						}
						else{
							app.dialog.alert(data);
						}
					})
				})
			}
		}
	},
	{
		path: '/register/',
		url: 'register.html',
		on: {
			pageInit: function(e,page){
				$$('#btnRegister').on('click', function(){
					var n = new FormData($$(".form-ajax-submit1")[0]);
					app.request.post('http://localhost:1310/phpProjectUTS/register.php', n, function(data){
						if(data==='sukses'){
							page.router.navigate('/login/');
							app.dialog.alert("Register berhasil");
						}
						else{
							app.dialog.alert(data);
						}
					})
				})
			}
		}
	},
	]
});

var mainView = app.views.create('.view-main',{url: '/home/'});
