'use server'

import path from 'node:path'
import * as fs from 'node:fs'

export default async function downloadGrammar(file: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  const file_path = isProduction
    ? path.resolve('/tmp/', file)
    : path.resolve(process.cwd(), 'src/shared/grammars/', file)

  return fs.readFileSync(file_path, 'utf8')
}  
