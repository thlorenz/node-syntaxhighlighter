var child_process =  require('child_process')
  , exec          =  child_process.exec
  , spawn         =  child_process.spawn
  , log           =  require('npmlog')
  , util          =  require('util')
  ;

function execute (command, args, callback) {
  var errors  =  []
    , infos   =  []
    , spawned =  spawn (command, args)
    ;

  spawned.stdout.on('data', function(data) {
    var msg = util.format('%s', data.toString());
    if (msg.length === 0) return;

    log.info(command, msg);
    infos.push(msg);
  });
  spawned.stderr.on('data', function(data) {
    var msg = util.format('%s', data.toString());
    log.error(command, msg);
    errors.push(msg);
  });
  spawned.on('exit', function(code) {
    log.verbose(command, 'exited with: ' + code);
    callback((errors.length > 0 ? errors : null), infos);
  });
}

function gitClone(url, targetFolder, callback) {
  execute ('git', [ 'clone', url, targetFolder ], callback);
} 


log.info('nodify', 'It succeeded if it ends wit OK.');

// First we need to get the repo

// Clean old copy


// Clone new version


// Generate css files and place inside styles folder

// Pull scripts into lib folder


// Fix require statements in scripts


// XRegXp needs to export its constructor


// Fix shCore require statement


log.info('nodify', 'Everything is OK');

