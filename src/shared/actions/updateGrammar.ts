'use server';

import path from 'node:path';
import * as fs from 'node:fs';

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

        return { success: true, message: 'Grammar saved successfully.' };
    } catch (error) {
        console.error('Error saving grammar:', error);
        return { success: false, message: 'Failed to save grammar.' };
    }
}
