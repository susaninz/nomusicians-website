module.exports = {
  apps: [
    {
      name: 'nomusicians-site',
      cwd: '/Users/ivanslezkin/Nomusicians taplink/nomusicians-website',
      script: 'npm',
      args: 'run dev',
      watch: false,
      env: {
        PORT: 4321
      }
    },
    {
      name: 'nomusicians-studio',
      cwd: '/Users/ivanslezkin/Nomusicians taplink/nomusicians-website/studio',
      script: 'npm',
      args: 'run dev',
      watch: false
    },
    {
      name: 'deepl-proxy',
      cwd: '/Users/ivanslezkin/Nomusicians taplink/nomusicians-website/studio',
      script: 'npm',
      args: 'run proxy',
      watch: false
    },
    {
      name: 'ngrok-tunnels',
      script: 'ngrok',
      args: 'start --all',
      watch: false
    }
  ]
};


