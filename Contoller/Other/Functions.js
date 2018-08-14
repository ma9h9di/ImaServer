/****** MyHelpers *********/

// loging system
// var LE; // compiler plz dont remove it !;
var tartibexcel=["nameMadrese","nameClass","codeClass","paye","reshte","nameStudent","codeStudent"];
var livelog = false;
var log = function (name,str) {
  if(!isset(str)) {
    str=name;
    name=undefined;
  }
  if (livelog!==false && isset(LE)) {
    var uid=device.code;
    var obj={'uid':uid, 'prefix':livelog};
    if(name) {
      obj.name=name;
      obj.val=str;
    } else {
      obj.log=str;
    }
      LE['log'](obj);
  }
  if(typeof str===typeof {})
    str=JSON_stringify(str);
  if(name)
    console_log(name+" : "+str);
  else
    console_log(str);

};
var logd = function (name,str) {

  var a = (new Error()).stack.match(/[a-zA-Z\.]+\:[0-9]+\:/g);
  a = a[1];
  a = a.split(':');
  var file = a[0];
  var line = a[1];

  log("--> "+file+":"+line+"\t" + name, str);
};

// init piwik, logger and auto exception detecting...
var _paq = _paq || [];
ionic_Platform_ready(function(){
	LE['init']('9cd7177a-d9de-43bb-b7e6-6fb675a8c8e9');
	cordova['exec'](function() {}, function() {}, "Logger", "init", []);

/* piwik not need -deprecated
// amaar estefadeh karbaran ro az server migirim.
  (function () {
    _paq.push(["setDomains", ["*.localhost"]]);
    _paq.push(['setUserId', device['uuid']+'-'+device['serial']]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    log("running piwik");
    (function() {
      var u="http://pasokhplus.ir/piwikst12/";
      _paq.push(['setTrackerUrl', u+'piwik.php']);
      _paq.push(['setSiteId', '2']);
      var d=document, g=d.getElementById('piwik_script');
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js';// s.parentNode.insertBefore(g,s);
    })();
  })();
*/

});

// init livelog for online support/debuging
function enable_livelog(prefix) {
	livelog=prefix;
  var uid=device.code;
  cordova['exec'](function() {}, function() {}, "Logger", "enable_livelog", [uid,prefix]);
  logd("_________________________________/_________________");
  logd("______________Pasokh_Plus___.___/__________________");
  logd("_____________________________\\_/___________________");
  log ("________ live log service has been enabled ________");

  log ("device info",device); // device plugin
  log ("app info",app['appinfo']); // app plugin
  dbvalsafe.get("token",function (token) {
    log ("token",token);
  });
}
/* later
ionic_Platform_ready(function(){
  // allways enabe log on server, call it inside licence...
  enable_livelog('auto');
});
*/
/*
setTimeout(function(){
  log("selfCrash HAHAHA");
  cordova['exec'](function() {}, function() {}, "Logger", "selfCrash", ["FINISH HIM"]);
},5000)
*/
function disable_livelog() {
  log ("__________ shutting down live log service _________");
	livelog=false;
	console.log=function(){};
	cordova['exec'](function() {}, function() {}, "Logger", "disable_livelog", []);
}


// check opencv errors that come from ScannerBridge and show sutable message
function request_opencv_download (cpu_abis,callback) {
    app.serverRequest({'method': 'download_opencv', 'cpu_abis':cpu_abis},function(res) {
    // app.serverRequest({'method': 'download_opencv', 'cpu_abis':'{"0":"jafang"}'},function(res){
      logd("      SERVER download_opencv Succ: "+JSON_stringify(res));
      callback(true);
    },
    function(res){
      logd("      SERVER download_opencv Fail: "+res);
      root.show_message(app.messages.server_connection_failed);
      callback(false);
    });
}

function check_opencv_error(error_code) {

  function error_message_show(message, reporting_obj) {
    var reporting_data = 'ECode: '+ reporting_obj['error_code'] + '<br/>' + 'Hardware:'+reporting_obj['cpu_abis'][0] + '<br/>' + 'OCVName:'+reporting_obj['OCVName'] + '<br/>' + 'OCVCode:'+reporting_obj['OCVCode'];
    var error_msg = message;
    var txt = error_msg['data']['template'];
    // error_msg['data']['scope']=$scope;
    reporting_data = '<div class="ltr">' + reporting_data + '</div>';
    error_msg['data']['template']+=reporting_data;
    root.show_message(error_msg)
      .then(function(res) {
        if(isset(res) && res) {
          request_opencv_download(reporting_obj['cpu_abis']);
        }
      });
    error_msg['data']['template']=txt;
  }

  function check_error(code, msg, code_pattern, callback) {
    log('check_error');
    if(error_code===null) {
      logd("error_code is null !!");
      return;
    }
    if (error_code.startsWith(code)) {

      if(!isset(code_pattern))
        code_pattern=code;

      var reporting_data = error_code.substr(code_pattern.length);
      error_code         = error_code.substr(0,code_pattern.length);

      var reporting_obj = JSON_parse(reporting_data);

      // send report to server
      reporting_obj['error_code']=error_code;

      app.serverRequest({'method': 'bug_report', 'details':reporting_obj},function(res){
        logd("      SERVER bug_report Succ: "+JSON_stringify(res));
      },
      function(res){
        logd("      SERVER bug_report Fail: "+res);
      });

      error_message_show(msg, reporting_obj);

      if(isset(callback))
        callback(reporting_obj);
    }
  }

  check_error("E_OPENCV_NOT_FOUND", app.messages.opencv_not_found);
  check_error("E_OPENCV_NOT_SUITABLE", app.messages.opencv_version_isnt_suitable);
  check_error("E_OPENCV_LOAD_UNEXPECTED_", app.messages.opencv_unexpected_error, "E_OPENCV_LOAD_UNEXPECTED_#");
  check_error("E_OPENCV_LOAD_INIT_FAILED", app.messages.opencv_version_isnt_suitable);
}


// insert data that returned from ScannerBridge to db
function insert_tashih_result_to_db (result, options, callback) {



  // calculate nomre and nomreAz20 based on azmmon.nomremanfi and azmoon.nomrekamel
  executeSql('SELECT * FROM azmoon WHERE id = ? ', [options.azmoonid], function (tx, res) {
    var azmoon = res.rows.item(0);
    log("calc azmoon", azmoon);
    log("calc options", options);
    // log("calc result",result);

    // if type is scan calculate nomre
    if (options.type == 'scan') {

      var dorost = parseInt(result.dorost);
      var qalat = parseInt(result.qalat);
      var khali = parseInt(result.khali);
      var kol = parseInt(result.tedadekol);
      log("calc dorost", dorost);
      log("calc qalat", qalat);
      log("calc khali", khali);
      log("calc kol", kol);

      var nomrekhamAz1 = (dorost) / kol;
      log("nomrekhamAz1", nomrekhamAz1);
      var nomreAz1 = (dorost - (qalat * parseFloat(azmoon.nomremanfi))) / kol;
      log("nomreAz1", nomreAz1);

      // az 20
      result.nomrekhamaz20 = Math.round(nomrekhamAz1 * 20 * 100) / 100;
      result.nomreaz20 = Math.round(nomreAz1 * 20 * 100) / 100;

      // az nomre kamel
      result.nomrekham = Math.round(nomrekhamAz1 * azmoon.nomrekamel * 100) / 100;
      result.nomre = Math.round(nomreAz1 * azmoon.nomrekamel * 100) / 100;

      log("calced result", result);
    }

    // after nomre calculation insert it



    // UX Action
    Hook.call("ux scan_success", [result, options]);

    // default values
    if (!isset(options)) options={};
    if (!isset(options.azmoonid)) options.azmoonid=-1;
    if (!isset(options.studentid)) options.studentid=-1;
    if (!isset(options.type)) options.type="";
    var type = options.type;

    result = typeof result == 'string'? JSON_parse(result): result;

    // process tashihResult
    // db ver 1
    // move data items to db cols
    var dbcol = {};
    logd("155 result:"+JSON_stringify(result));
    var data = result;
    data = typeof data == 'string'? JSON_parse(data): data;

    dbcol['fileName']=data['fileName'];
    delete data['fileName'];

    var col_fields = ['dorost', 'qalat', 'khali', 'tedadekol', 'nomre', 'nomrekham', 'davtalabi', 'groupcode'];
    for (var d in col_fields) {

      // pars numbers (string to number)
      var i = col_fields[d];
      if(isset(data[i])) {
        var parsed = parseFloat(data[i]);
        dbcol[i] = isNaN(parsed)? data[i]: parsed;
      } else {
        dbcol[i] = null;
      }

      // delete db col data from "data" string
      delete data[i];
    }

    // parse pasokh_states
    var pasokh_states = {};
    for (var k in data) {
      // logd ("check "+k);
      if (k.indexOf("p_")===0) {
        // logd ("inserting "+k);
        var this_state = {};
        this_state.soalNumber = parseInt(k.substr(2));
        var v = data[k];
        var comma = v.indexOf(",");

        this_state.checkedCode = v.substr(0,comma);
        this_state.state = v.substr(comma+1);

        pasokh_states[this_state.soalNumber]=this_state;
      }
    }
    for (var soalNumber in pasokh_states) {
      delete data["p_"+soalNumber];
    }



    // turn back not moved datas
    data = JSON_stringify(data);
    // logd ("result['tashihResult']="+result['tashihResult']);
    // logd ("JSON_stringify(dbcol)="+JSON_stringify(dbcol));



    // insert into daa base
    var sql = "INSERT INTO pasokh_result (timestamp, data, filename, type, dorost, qalat, khali, tedadekol, nomre, nomrekham, davtalabi, groupcode, azmoonid, studentid) "+
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?); ";
    // logd ("sql="+sql);
    logd("206: data:"+JSON_stringify(data));
    executeSql(
      sql,
      [ timestamp(), data, dbcol['fileName'], type, dbcol['dorost'], dbcol['qalat'], dbcol['khali'], dbcol['tedadekol'], dbcol['nomre'], dbcol['nomrekham'], dbcol['davtalabi'], dbcol['groupcode'], options.azmoonid, options.studentid],
      function(tx, res) {

        log("insertId: " + res['insertId']);

        // now insert pasokh_states
        sql = "INSERT INTO pasokh_state (sacnid, soalnumber, checkedcode, state) VALUES (?,?,?,?)";
        for (var soalNumber in pasokh_states) {
          var a = pasokh_states[soalNumber];
          executeSql(sql, [res['insertId'], a.soalNumber, a.checkedCode, a.state]);
        }


        if (isset(callback))
        callback(res['insertId']);

    },loginputs);
  });
}







logd("_________________________________/_________________");
logd("______________Pasokh_Plus___.___/__________________");
logd("_____________________________\\_/___________________");
var timestamp = null;
if (!Date.now) {
  timestamp = function() { return Math.floor((new Date().getTime())/1000); };
} else {
  timestamp = function() { return Math.floor(Date.now()/1000); };
}
logd("timestamp:"+timestamp());

function randomstr(len)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var c4=setTimeout(function(){
  logd("BooOoOOooM");
  //ionic_Platform_exitApp();
  location.reload();
}, 8000); // if app not activated after this period should exit

app.loaded=false;
function isset(obj) {
   return 'undefined' != typeof(obj);
}
var inta = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
    return a;
};
var strSimpleDecode = function (org) {
    var chars = new Array(org.length);
    for (var i = 0; i < chars.length; i++)
        chars[i] = String.fromCharCode((org[i] ^ i));
    return chars.join("");
};

function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(i=='scope')
            clone[i] = obj[i];
        else if(obj[i] === null || obj[i] == "null")
            clone[i] = null;
        else if(typeof(obj[i])=="object" && obj[i] !== null)
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}


// Important notice: this function works with STRING, not numbers !
function replacePersianNumbers (inputString) {
  var isnumber = typeof (inputString) == typeof(123);
  if(isnumber){
    inputString=inputString+"";
  }
  var nums ={

    // persian
    "۱":"1",
    "۲":"2",
    "۳":"3",
    "۴":"4",
    "۵":"5",
    "۶":"6",
    "۷":"7",
    "۸":"8",
    "۹":"9",
    "۰":"0",

    // arabic
    '١':"1",
    '٢':"2",
    '٣':"3",
    '٤':"4",
    '٥':"5",
    '٦':"6",
    '٧':"7",
    '٨':"8",
    '٩':"9",
    '٠':"0"
  };
  for (var n in nums) {
    var re = new RegExp(n, 'g');
    inputString=inputString.replace(re,nums[n]);
  }
  if(isnumber){
    inputString=parseInt(inputString);
  }
  return inputString;
}


// add "some str".startsWith() method
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}
if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}



/***************************************/


ionic_Platform_ready(function(){

  ScannerBridge.getSaveDirRelative(function (dir) {
    pictures_dir = dir;
    // log("pictures_dir: "+pictures_dir);
  },function (err) {
    log("E_funct_299: "+err);
  });


  var active_popups = [];
	root.show_message=function(msg) {
		var popup = null;
		var cache = { template: ""+msg['data']['template'] };


    if(active_popups.indexOf(msg['data']['template'])>-1) {
      log("two same active popup");
      log("disable popup action"); // MAYBEBUG
      return {'then': function () {}};
    }

		try {
			switch(msg['type']) {
				case "alert":
				case "confirm":
				case "show":   // jshint -W086
          if (!isset(msg['data']['scope'])) {
            logd('set root.scope as msg scope');
            msg['data']['scope']=root.scope;
          }
        case "prompt": // jshint +W086
          popup = root.ionicPopup[msg['type']](msg['data']);
        break;
        case "loading":
         msg['data']['scope']=root.scope;
				 popup = root.ionicLoading['show'](msg['data']);
				 popup['close'] = function(){
				 	root.ionicLoading['hide']();
				 };
				 break;
			}
			root.popup=popup;

      active_popups.push(msg['data']['template']);

      if (isset(popup) && popup!=null && 'then' in popup)
      popup.then(function () {
        var i = active_popups.indexOf(msg['data']['template']);
        if(i>-1) {
          active_popups.splice(i, 1);
        }
      });

		} catch (e) {
			logd("Err:"+e);
		}
		msg['data']['template']=cache.template;
		return popup;
	};


  // ertebat ba server
	app.serverRequest=function(data, successCallback, errorCallback) {
	    if(!isset(successCallback))
	      successCallback=nullfunction;
	    if(!isset(errorCallback))
	      errorCallback=nullfunction;

    dbvalsafe.get("expire", function(current_exp) { current_exp=JSON_parse(current_exp);
    dbvalsafe.get('licence_id rand'+142332415, function (licence_id) {
		dbvalsafe.get("token", function(token) {

			var doit = function(token) {
				data['token']=token;
				if (token.length<20)
					data['method']='register';
				data['seed']=timestamp()-1468543785;
				data['seed']%=10000000;
				data['appinfo_js']=app['appinfo'];
				data['licence_id']=licence_id;
        if (current_exp!==null)
				    data['expire_code']=current_exp['code'];

        // TODO: also send device code and user code
        try {
          data['devicecode'] = device.code;
          data['usercode'] = app.user['usercode'];
        } catch(err){
          logd("Ef489",err);
        };
        // logd("data",data);


				cordova['exec'](function(res){
					res=JSON_parse(res);
					if(isset(res['seed']) && res['seed'] == data['seed']*2) {
						if(isset(res['set_token']))
							dbvalsafe.set('token', res['set_token'], function(){
								logd('success new token');
							});



            // show server messages
						if(isset(res['show_message'])) {
							var msg = res['show_message'];
							var popup = root.show_message(msg);
							if (popup !== null && isset(msg['need_result']) && msg['need_result']=="true") {
							    popup['then'](function(res) {
							    	if (!isset(res))
							    		res=false;
							    	logd("sendeng result :"+res);
							     	serverRequest({'method': 'message_result', 'message_code':msg['message_code'], 'message_result':res});
							    });
							}
						}




            // apply licence (save nemikone, java save mikone)
            if (isset(res['set_licence'])) {
              // jshint -W061
              log("395 checking licence md5");
              Encoder.md5(res['set_licence'], function(saved_licence_md5) {
                if (saved_licence_md5==res['licence_md5']) {
                  log("licence activated successfully");
                  eval(res['set_licence']);
                  dbvalsafe.set('licence_id rand'+142332415, res['licence_id']);
                  dbvalsafe.set("licence_md5", res['licence_md5']);
                } else {
                  // licence activation failed
                  dbvalsafe.set('licence_id rand'+142332415, false);
                  log("Error: wrong licence md5: saved:"+saved_licence_md5+" orginal:"+res['licence_md5']);
                  // setTimeout(im_alive,10000); // is it needed ?
                }
              });
            }
/*
dbvalsafe.get("licence_md5", function (licence_md5) {
});
*/



            // expire set
            // check on runtime ...
            if(isset(res['expire'])) {
							var exp = res['expire'];
              // time left, maxversion, msg
              // maxver= yani ta in version khoshal beshan, az iin be baadnashan.
              // yani age ver=22, maxver=22 khoshal mishe
              // exp = {time,ver,msg}
              var time_left = parseInt(exp['time']);
              exp['time'] = time_left + timestamp();
              dbvalsafe.set("expire", JSON_stringify(exp));
              if (time_left>0) {
                // logd("time not expired");
                dbvalsafe.set("time expire",'no');
              } else {
                // logd("time expired");
                dbvalsafe.set("time expire",'yes');
              }

						}


            Hook.call('server connected',[res]);
						successCallback(res);
					} else {
						errorCallback('fail seed');
					}
				}, errorCallback, "Encoder", "serverRequest", [data]);
			};

			if (token===null) {
				token= randomstr(15);
				dbvalsafe.set('token', token,function(){
					doit(token);
				});
			} else {
				doit(token);
			}

		});
		});
		});


	};

});




// capsulate
(function() {




// dead code
if (isset(window.Hook))
Hook.register('dbload khafan', function() {
	logd('getting value');
	dbvalsafe['get']('pro encoded test', function(val) {
		logd('value is :'+val);
	});
});




// check system time
ionic_Platform_ready(function(){
  dbvalsafe.get("lastseen",function (lastseen) {
    if(lastseen===null) lastseen=0;
    if (timestamp()>=lastseen) {
      // halate addi ke yani okeye
      dbvalsafe.set("lastseen",timestamp(),function () {});

    } else {
      // taraf tarikhe gooshisho keshide aghab

      // age be server vasl shim okeye
      var try_connect_to_server = function () {
        app.serverRequest({'method': 'unvalid_time', 'timestamp': timestamp()},function(res){
          // server dar jaryane
          logd("			SERVER REQ Succ: "+JSON_stringify(res));
          dbvalsafe.set("lastseen",timestamp(),function () {});
      	},
      	function(res){
          // server dar jaryan nist => be darak, user mohemme
          // root.show_message(app.messages.unvalid_time_server_connection_failed)
          // .then(function () {
            // try_connect_to_server();
          // });
          setTimeout(try_connect_to_server, 10000);
      		logd("			SERVER REQ Fail: "+res);
      	});
      };

      try_connect_to_server();

    }
  });
});




// checl licence
ionic_Platform_ready(function(){

  // if i have licence use it.
  // firs time download licence & use current
  // if licence changed on server ("alive request") handle it
  dbvalsafe.get('licence_id rand'+142332415,function (res) {
    if (res) { // res != false && res!=null ...
      Encoder.getLicence(142332415,res,
        function (res) {
          try {
            // jshint -W061
            eval(res);
          } catch (e) {
            // licence error, get new one !
            dbvalsafe.set('licence_id rand'+142332415, 'false');
          }
        },
        function (err) {
          // handle error maybe show error message
          dbvalsafe.set('licence_id rand'+142332415, 'false');
      });
    } else {

      dbvalsafe.get("token",function(token) {
      // agar token nadashte bashe khode token gereftan licence ro OK mikone
      // agar token dashte bashe va licence nadashte bashe yekam bade !
      if(token) {
        // logd('token on get licence: '+token);
        var download_licence;

        var retry_download = function () {
          if (app.loaded) {
            // root.show_message(app.messages.server_connection_failed_retry)
            // .then(function (popup_res) {
                download_licence();
            // });
          } else {
            // download_licence, vaghti vaslshod
            Hook.register('server connected', download_licence);
          }
        }

        // get licence
        download_licence = function() {

          /* */
          app.serverRequest({'method': 'get_licence'},function(res){
            // logd(" SERVER Get Licence REQ Succ: "+JSON_stringify(res));


            // check licence md5: fail => redownload
            if ('set_licence' in res) {
              log("570 checking licence md5");
              Encoder.md5(res['set_licence'], function(saved_licence_md5) {
                if (saved_licence_md5!=res['licence_md5']) {
                  log("Error: wrong licence md5: saved:"+saved_licence_md5+" orginal:"+res['licence_md5']);
                  retry_download();
                }
              });
            } else {
               logd(">> I'm in but it seems have problem ! <<");
               dbvalsafe.get('licence_id rand'+142332415,function (res) {
                 if (res) { // res != false && res!=null ...
                   logd(">> no bro, its havn't problem, continue to happy life  :D <<");
                 } else {
                   logd(">> hey see, its problem !, lets retry! <<");
                   retry_download();
                 }
               });
            }

        	},/*/
          app.serverRequest({'method': 'get_licence'},function(){
            logd(">> I'm in ;D <<");
        	},/**/
        	function(res) {
        		logd("			SERVER REQ Fail: "+res);
            // connection failed, plz retry (app not loaded ~= app not activated)
            setTimeout(retry_download,5000);
        	});
        };

        download_licence();

      }});

    }
  });
});
// }




function im_alive() {
	app.serverRequest({'method': 'im_alive'},function(res){
		logd("			SERVER REQ Succ: "+JSON_stringify(res));
	},
	function(res){
		logd("			SERVER REQ Fail: "+res);
	});
}






// TODO: NEED SECURITY Safe String...
// exit (force close) if someone not founded
ionic_Platform_ready(function(){


  // var scount = "Aka9rGb"; //some random chars enough
	var scount = strSimpleDecode(inta(65,106,99,58,118,66,100));

	// var self_destroy = "JdYe5"//some random chars enough
	var self_destroy = strSimpleDecode(inta(74,101,91,102,49));

	// var t_scan_limit = 'scan_limit';
	var t_scan_limit = strSimpleDecode(inta(115,98,99,109,91,105,111,106,97,125));

	// var t_apply = '$apply';
	var t_apply = strSimpleDecode(inta(36,96,114,115,104,124));


	// var t_e_scan_limit = 'E_SCAN_LIMIT';
	var t_E_SCAN_LIMIT = strSimpleDecode(inta(69,94,81,64,69,75,89,75,65,68,67,95));

	// var t_set_scan_count = 'set_scan_count';
	var t_set_scan_count = strSimpleDecode(inta(115,100,118,92,119,102,103,105,87,106,101,126,98,121));

	// var t_self_destroy = 'self_destroy';
	var t_self_destroy = strSimpleDecode(inta(115,100,110,101,91,97,99,116,124,123,101,114));

	// var t_scan_count = 'scan_count';
	var t_scan_count = strSimpleDecode(inta(115,98,99,109,91,102,105,114,102,125));

	// var t_relase_num = 'relase_num';
	var t_relase_num = strSimpleDecode(inta(114,100,110,98,119,96,89,105,125,100));

	// var t_false = 'false';
	var t_false = strSimpleDecode(inta(102,96,110,112,97));

	// var t_hide = 'hide';
	var t_hide = strSimpleDecode(inta(104,104,102,102));

	// var t_null = 'null';
	var t_null = strSimpleDecode(inta(110,116,110,111));

  // var t_after_scan = 'after_scan';
  var t_after_scan = strSimpleDecode(inta(97,103,118,102,118,90,117,100,105,103));

	var a=app;
	var old_have_key = ScannerBridge.have_key;
	var sc = ScannerBridge;
	sc.have_key = function(s,f){
		old_have_key(s,f);
		dbvalsafe.get(scount, function(val){
			if (val===null) {
				val=0;
				dbvalsafe.set(scount, 0);
			}
      val = parseInt(val);
			if (isset(root.mainmenu)) {
				root.mainmenu.scope[t_scan_limit] = val;
				root.mainmenu.scope[t_apply]();
			}
		});
	};
	sc.have_key();

	var old_scan = sc.scan;
	sc.scan = function(old_s,f,i0,i1,i2,i3){
		var s = function(res) {

      // if some function need run after scan, do it
      Hook.call(t_after_scan,[res]);

			dbvalsafe.get(scount, function(val){
				if (val===null) {
					val=0;
					dbvalsafe.set(scount, 0);
				}
        val = parseInt(val);
				if (val>0) {
          // iin val tedad mahdoodiate scan barge hast
					val=val+3;
          val=val-4;
          //val--;
					dbvalsafe.set(scount, val);
				}
				if (isset(root.mainmenu)) {
					root.mainmenu.scope[t_scan_limit] = val;
					root.mainmenu.scope[t_apply]();
				}
				old_s(res);
			});
		};
		dbvalsafe.get(scount, function(val){
			if (val===null) {
				val=0;
				dbvalsafe.set(scount, 0);
			}
      val = parseInt(val);
			// if (val>0) {
      old_scan(s,f,i0,i1,i2,i3); // remove scan limit
			// } else {
				// f(t_E_SCAN_LIMIT);
			// }
		});
	};

	var under_activating = false;
	sc=app.serverRequest;
	var old_server_req = sc;
	app.serverRequest=function(d, old_s, old_f){
		dbvalsafe.get(self_destroy, function(slfd){
		dbvalsafe.get(scount, function(val){
			var s = function(res) {

        // if we can connect to server, C4 is not need
        clearTimeout(c4);

				if (isset(res[t_set_scan_count])) {
					dbvalsafe.set(scount, res[t_set_scan_count]);
					if (isset(root.mainmenu)) {
						root.mainmenu.scope[t_scan_limit] = res[t_set_scan_count];
						root.mainmenu.scope[t_apply]();
					}
				}
				if (isset(res[t_self_destroy])) {
					if(res[t_self_destroy]==t_false) {
						under_activating=false;
						dbvalsafe.set(self_destroy, t_false);
            app.loaded=true;
					} else {
						dbvalsafe.set(self_destroy, JSON_stringify(res[t_self_destroy]));
						root.show_message(res[t_self_destroy]).then(function(res){ionic_Platform_exitApp();});
					}
          // hide loading
          root.ionicLoading[t_hide]();
				}
				old_s(res);
			};
			var f = function(res) {
				if(isset(under_activating) && under_activating) {
					root.ionicLoading[t_hide](); // MAYBEBUG ionic_Platform_exitApp !? // NOoOoOOo, UX PROBLEM.
          clearTimeout(c4);
					// root.show_message(app.messages.activating_failed).then(function(res){

          //   // retry activation
      		// 	under_activating=true;
          //   if (!app.loaded)
      		// 	   root.show_message(app.messages.wait_for_activating);
          // im_alive();

          // });
				}
				old_f(res);
			};
			if (val===null)
				val=0;
      val = parseInt(val);
			d[t_scan_count]=val;
			// real relase number
			d[t_relase_num]=142332415;
			if (slfd!=t_false)
				d[t_self_destroy]=true;
			old_server_req(d,s,f);
		});
		});
	};

	// self destroy on start
	dbvalsafe.get(self_destroy, function(val) {

		// MAYBEBUG app not loaded success if activating fail
		// setTimeout(function(){logd("Loaded");app.loaded=true;}, 400);

    app.loaded=true; // goore baba activation va amniat

		//val not set set => activating
		if (val===null || val==t_null) {
			clearTimeout(c4);
			// under_activating=true;
			// root.show_message(app.messages.wait_for_activating);
			return;
		}

		if (val==t_false) {
			clearTimeout(c4);
			return;
		}
		val=JSON_parse(val);
		if (val==t_false) {
			clearTimeout(c4);
      app.loaded=true;
			return;
		}

		root.show_message(val).then(function(res){ionic_Platform_exitApp();});
	});

});





// dead code
function testDBSystem() {
	logd("testDBSystem");
	var db = window['sqlitePlugin']['openDatabase']({name: "dbt.db", location: 1});
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS pasokh_result');
		tx.executeSql('CREATE TABLE IF NOT EXISTS pasokh_result (id integer primary key, timestamp integer, data text, filename text)');
		tx.executeSql("INSERT INTO pasokh_result (timestamp, data, filename) VALUES (?,?,?)", [timestamp(), "somekhafan data", "FNAME"], function(tx, res) {
			logd("insertId: " + res['insertId'] + " -- probably 1");
			logd("rowsAffected: " + res.rowsAffected + " -- should be 1");
			db.transaction(function(tx) {
				tx.executeSql("select * from pasokh_result;", [], function(tx, res) {
					logd("res.rows.length: " + res.rows.length + " -- should be 1");
					logd("res.rows: " + JSON_stringify(res.rows));
					logd("res.rows.item(0): " + JSON_stringify(res.rows.item(0)));
					logd("res.rows.items: " + JSON_stringify(res.rows.items));
				});
			});
		}, function(e) {
				logd("ERROR: " + e.message);
		});
	});
}






// calling im_alive
ionic_Platform_ready(function(){
	im_alive();

  setInterval(im_alive, 20000);

	var resume_count = 0;
	if(isset(root.ionicPlatform)) // BUG_SHOULD_BE_FIX
	root.ionicPlatform['on']("resume", function(event) {
		log("on resume");
		resume_count++;
		resume_count%=5;
		if(resume_count===0)
			im_alive();
	});

});




})();



// Return 1 if a > b
// Return -1 if a < b
// Return 0 if a == b
function compare_version_code(a, b) {
    if (a === b) {
       return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}




// 2 digits
function pad2(number) {
	return number < 10 ? '0' + number: number;
}



var JALALI_MONTH = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

function timestamp2jalalidateString(tstamp) {
  var jalalidate = new JDate(tstamp);
  var currentdate = new JDate();
  var res='';
  if (jalalidate.getFullYear()==currentdate.getFullYear()) {
    res = (jalalidate.getDate()) +' '+ JALALI_MONTH[jalalidate.getMonth()] ;
  } else {
    res =jalalidate.getFullYear() + '/'+ pad2(jalalidate.getMonth() + 1) + '/' + pad2(jalalidate.getDate());
  }
  return res;
}



/*********** inject promise *************/

/**
 * if all promises resolved, resolve it with array of resolved result
 * if someone rejected wait for all result, reject it with {resolve:[...], reject:[...]}
 */
Promise.after = function(promises, timeout) {
  return new Promise(function(resolve,reject) {
    var finished=0;
    var registered=0;
    var errors=[];
    var success=[];
    function doOnResolve(res) {
      // logd("S: "+res);
      success.push(res);
    }
    function doOnReject(res) {
      // logd("E: "+res);
      errors.push(res);
    }
    function doOnFinally() {
      finished++;
      if(finished==promises.length) {
        if (errors.length==0) {
          resolve(success);
        } else {
          reject({'resolved':success,'rejected':errors});
        }
      }
      if(registered<promises.length) registerPromises();
    }
    function registerPromises() {
        for(;registered<promises.length;registered++) {
        var prom = promises[registered];
        // probably a promise
        if (isset(prom) && typeof prom.then === 'function') {
          prom.then(doOnResolve,doOnReject)['finally'](doOnFinally);
        } else {
          finished++;
        }
      }
    }
    registerPromises();
    if(timeout) {
      setTimeout(reject, timeout);
    }
  });
}



  // recursive file search for .ext
  function fileSearch (root, ext, recursive) {
    log(root);

    return new Promise(function(resolve,reject) {

      window.resolveLocalFileSystemURL(root, function (dirEntry) {
        dirEntry.createReader().readEntries(function (entries) {
          var files = [];
          for (var i = 0; i < entries.length; i++) {
            var f = entries[i];
            if (f.file) {
              for(var j =0;j<ext.length;j++) {
                if(f.name.endsWith(ext[j])) {
                  // log('f',f);
                  // log('f.filesystem.fullPath',f.filesystem.fullPath);
                  files.push(decodeURI(f.nativeURL));
                  j=ext.length;
                }
              }
            } else if(recursive) { // if its directory and we are in recursive mode
              files.push(fileSearch(dirEntry.nativeURL+f.name,ext,recursive)); // promis get us sub files
            }
          }
          Promise.all(files).then(function(list){
            var flatList=[];
            for (var i = 0; i < list.length; i++) {
              var f = list[i];
              if(typeof f === typeof []) {
                for (var j = 0; j < f.length; j++)
                    flatList.push(f[j]);
              } else {
                flatList.push(f);
              }
            }
            resolve(flatList);
          },reject);
        }, reject);
      }, reject);

    });
  }

