var fs = require('fs');

function envSync() {
    let env = 'dev';
    var data = fs.readFileSync(`src/environments/environment.${env}.ts`, 'utf-8');
    fs.writeFileSync('src/environments/environment.ts',data,'utf-8');
    console.log("Environment Sync Complete");
}

envSync();