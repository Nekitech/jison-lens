'use server';

import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execPromise = promisify(exec);

export default async function createParser() {
    try {
        const command = `npx jison src/shared/generated/grammar.jison -o grammar.js`;
        await execPromise(command);

        console.log('Parser generate');
        return {
            success: true,
            message: 'Команда выполнена успешно',
        };
    } catch (e: any) {
        console.log(e);
        return {
            success: false,
            message: `Ошибка выполнения команды: ${e.message}`,
            stderr: e.stderr,
        };
    }
}
