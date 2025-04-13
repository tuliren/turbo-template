/**
 * Usage:
 * yarn script scripts/getUserInfo.ts --user-id <user-id> --type <message-type>
 * 
 * A script that demonstrates user information with formatted output:
 * - 1st line: timestamp, address, status, type
 * - 2nd line: message text
 * - Extra newline between messages
 */

interface Args {
  [key: string]: string | boolean | undefined;
  userId?: string;
  type?: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const result: Args = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
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

function generateUserMessage(userId: string, type: string): void {
  const timestamp = getCurrentTimestamp();
  const address = getRandomAddress();
  const status = getRandomStatus();
  
  console.log(`${timestamp} ${address} ${status} ${type}`);
  
  console.log(`User ${userId} has a ${type} message`);
  
  console.log('');
}

(async () => {
  const args = parseArgs();
  
  if (!args.userId) {
    console.error('Error: --user-id parameter is required');
    process.exit(1);
  }
  
  const userId = args.userId as string;
  const messageType = args.type || 'info';
  
  console.log('User information:\n');
  
  generateUserMessage(userId, 'subscription');
  
  generateUserMessage(userId, messageType);
  
  generateUserMessage(userId, 'status');
  
  console.log('All arguments:');
  console.log(JSON.stringify(args, null, 2));
})();
