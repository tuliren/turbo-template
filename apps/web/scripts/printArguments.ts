/**
 * Usage:
 * yarn script scripts/printArguments.ts --messages <number> --type <message-type>
 * 
 * A script that demonstrates message formatting with:
 * - 1st line: timestamp, address, status, type
 * - 2nd line: message text
 * - Extra newline between messages
 */

interface Args {
  [key: string]: string | boolean | undefined;
  messages?: string;
  type?: string;
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

function getCurrentTimestamp(): string {
  const now = new Date();
  return now.toISOString();
}

function getRandomAddress(): string {
  return `0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function getRandomStatus(): string {
  const statuses = ['pending', 'confirmed', 'failed', 'processing'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateSampleMessage(index: number, type: string): void {
  const timestamp = getCurrentTimestamp();
  const address = getRandomAddress();
  const status = getRandomStatus();
  
  console.log(`${timestamp} ${address} ${status} ${type}`);
  
  console.log(`This is sample message #${index} of type ${type}`);
  
  console.log('');
}

(async () => {
  const args = parseArgs();
  const messageCount = args.messages ? parseInt(args.messages as string, 10) : 3;
  const messageType = args.type || 'default';
  
  console.log('Generating formatted messages:\n');
  
  for (let i = 1; i <= messageCount; i++) {
    generateSampleMessage(i, messageType);
  }
  
  console.log('All arguments:');
  console.log(JSON.stringify(args, null, 2));
})();
