var fs = require('fs');

function envSync() {
    let env = process.env.IONIC_ENV;
    console.log("Environment Sync: IONIC_ENV = ",env);
    if(!process.env.IONIC_ENV) {
        env = 'dev';
    }
    console.log(`Environment Sync: Setting up '${env}'...`)
    var data = fs.readFileSync(`src/environments/environment.${env}.ts`, 'utf-8');
    fs.writeFileSync('src/environments/environment.ts', data, 'utf-8');
    console.log("Environment Sync: Complete");
}

envSync();