#!/usr/bin/env node

const program = require('commander');

// console.log(process.argv);

// program
//   .version('0.1.0')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('--no-water', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log(program.peppers, '  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// if (program.water) console.log('  - water');
// console.log('  - %s cheese', program.cheese);


/* ++++++++++++++++ */

// program
//   .command('rm <dir>')
//   .option('-r, --recursive', 'Remove recursively')
//   .action(function (dir, cmd) {
//     console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
//   })

// program.parse(process.argv)

/* ++++++++++++++++ */

// function range(val) {
//     return val.split('..').map(Number);
//   }
  
//   function list(val) {
//     return val.split(',');
//   }
  
//   function collect(val, memo) {
//     memo.push(val);
//     return memo;
//   }
  
//   function increaseVerbosity(v, total) {
//     return total + 1;
//   }
  
//   program
//     .version('0.1.0')
//     .usage('[options] <file ...>')
//     .option('-i, --integer <n>', 'An integer argument', parseInt)
//     .option('-f, --float <n>', 'A float argument', parseFloat)
//     .option('-r, --range <a>..<b>', 'A range', range)
//     .option('-l, --list <items>', 'A list', list)
//     .option('-o, --optional [value]', 'An optional value')
//     .option('-c, --collect [value]', 'A repeatable value', collect, [])
//     .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
//     .parse(process.argv);
  
//   console.log(' int: %j', program.integer);
//   console.log(' float: %j', program.float);
//   console.log(' optional: %j', program.optional);
//   program.range = program.range || [];
//   console.log(' range: %j..%j', program.range[0], program.range[1]);
//   console.log(' list: %j', program.list);
//   console.log(' collect: %j', program.collect);
//   console.log(' verbosity: %j', program.verbose);
//   console.log(' args: %j', program.args);

/* ++++++++++++++++ */

// program
//   .version('0.1.0')
//   .command('rmdir <dir> [otherDirs...]')
//   .action(function (dir, otherDirs) {
//     console.log('rmdir %s', dir);
//     if (otherDirs) {
//       otherDirs.forEach(function (oDir) {
//         console.log('rmdir %s', oDir);
//       });
//     }
//   });

// program.parse(process.argv);

/* ++++++++++++++++ */

program
  .version('0.1.0')
  .arguments('<cmd> [env]')
  .action(function (cmd, env) {
     cmdValue = cmd;
     envValue = env;
  });

// program.parse(process.argv);

// if (typeof cmdValue === 'undefined') {
//    console.error('no command given!');
//    process.exit(1);
// }
// console.log('command:', cmdValue);
// console.log('environment:', envValue || "no environment given");

/* ++++++++++++++++ */

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });

program.parse(process.argv);