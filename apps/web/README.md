# Nextjs Web App

## Getting Started

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The `production` branch is automatically deployed to the `production` environment on Vercel.

The `production` branch can be fast-forwarded to the `main` branch by running the `deploy-main.yaml` GitHub action.

## Scripts

```bash
# Run with the .env.development file
npm run script scripts/<script-file>.ts -- <args>

# Run with the .env.production file, proceed with caution
npm run script:prod scripts/<script-file>.ts -- <args>
```

> [!NOTE]
> The script environment, `development` or `production` is exported to the `SCRIPT_ENV` variable. If a script is only meant to be run in one environment, it should check the `SCRIPT_ENV` variable and exit if it is not the correct environment.
