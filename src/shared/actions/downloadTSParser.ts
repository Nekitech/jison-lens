'use server';

import { readFile } from 'node:fs/promises';
import checkErrorGrammar from '@/shared/actions/checkErrorGrammar';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import downloadFile from '@/shared/actions/downloadFile';

const execPromise = promisify(exec);

export default async function downloadTSParser(filename: string) {
    try {
        const grammar = await readFile(
            'src/shared/generated/grammar.jison',
            'utf-8',
        );
        const validateGrammar = await checkErrorGrammar(grammar);
        if (!validateGrammar.success) {
            throw new Error(validateGrammar.message);
        }
        const command = `npx ts-jison -t typescript -n TsCalc -n TsCalc -o ${filename} grammar.jison`;
        const cwd = 'src/shared/generated';
        await execPromise(command, {
            cwd,
        });

        return await downloadFile(`${cwd}/${filename}`);
    } catch (e: any) {
        console.log(e);
        return {
            success: false,
            message: `Ошибка выполнения команды: ${e.message}`,
            stderr: e.stderr,
        };
    }
}
