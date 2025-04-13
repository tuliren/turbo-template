/**
 * Usage:
 * yarn script scripts/printArguments.ts --name <value> --count <value>
 * 
 * A simple script that demonstrates argument parsing.
 */

interface Args {
  [key: string]: string | boolean | undefined;
  name?: string;
  count?: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const result: Args = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1];
        i++; // Skip the value
      } else {
        result[key] = true;
      }
    }
  }
  
  return result;
}

(async () => {
  const args = parseArgs();
  
  if (!args.name) {
    console.error('Error: --name parameter is required');
    process.exit(1);
  }
  
  console.log('Script received the following arguments:');
  console.log('---------------------------');
  console.log(`Name: ${args.name}`);
  
  if (args.count) {
    console.log(`Count: ${args.count}`);
  }
  
  console.log('---------------------------');
  console.log('All command line arguments:');
  console.log(JSON.stringify(args, null, 2));
})();
