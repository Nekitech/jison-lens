'use server';

import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';
import { readFile } from 'node:fs/promises';
import checkErrorGrammar from '@/shared/actions/checkErrorGrammar';

const execPromise = promisify(exec);

export default async function createParser() {
    try {
        const grammar = await readFile(
            'src/shared/generated/grammar.jison',
            'utf-8',
        );
        const validateGrammar = await checkErrorGrammar(grammar);
        if (!validateGrammar.success) {
            throw new Error(validateGrammar.message);
        }
        const type_parser = 'lalr';
        const command = `npx jison grammar.jison -p ${type_parser}`;
        const cwd = 'src/shared/generated';
        await execPromise(command, {
            cwd,
        });

        const generatedCode = readFileSync(`${cwd}/grammar.js`, 'utf-8');
        acorn.parse(generatedCode, { ecmaVersion: 'latest' });

        console.log('Parser generate');
        return {
            success: true,
            message: 'Парсер был успешно создан!',
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
