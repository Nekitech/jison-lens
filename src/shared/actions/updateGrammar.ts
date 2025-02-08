'use server';

import path from 'node:path';
import * as fs from 'node:fs';
import checkErrorGrammar from '@/shared/actions/checkErrorGrammar';

export default async function updateGrammar(grammar: string) {
    try {
        const filePath = path.join(
            process.cwd(),
            'src',
            'shared',
            'generated',
            'grammar.jison',
        );
        fs.writeFileSync(filePath, grammar, 'utf8');
        const validateGrammar = await checkErrorGrammar(grammar);
        if (!validateGrammar.success) {
            throw new Error(validateGrammar.message);
        }

        return { success: true, message: 'Grammar saved successfully.' };
    } catch (error) {
        console.error('Error saving grammar:', error);
        return { success: false, message: 'Failed to save grammar.' };
    }
}
