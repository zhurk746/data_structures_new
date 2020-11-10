module.exports = {
  apps : [{
    script: 'app.js',
    watch: 'false', 
//    script: './service-worker/',
  //  watch: ['./service-worker']
  args: 'one two',
    instances: 1,
    autorestart: true,
   // watch: false,
    max_memory_restart: '1G',
  env: {
      NODE_ENV: 'development',
      AWSRDS_EP: 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com',
      AWSRDS_PW: 'ta143hoe',
      PHOTON_ID: '24001d001947393035313138',
      PHOTON_TOKEN: 'cb6136b467441555700c9d8cd8f1157ba397dc71'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
