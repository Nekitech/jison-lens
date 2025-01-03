'use server';
import { TsCalcParser } from './ts-calculator';

export async function ParserAction() {
    const text = `3+5`;
    const res = new TsCalcParser().parse(text);

    console.log(res);
}
