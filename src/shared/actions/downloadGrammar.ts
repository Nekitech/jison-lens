'use server'

import path from 'node:path'
import * as fs from 'node:fs'

export default async function downloadGrammar(file: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  const file_path = isProduction
    ? path.join('/tmp/', file)
    : path.join(process.cwd(), 'src/shared/grammars', file)

  return fs.readFileSync(file_path, 'utf8')
}  
