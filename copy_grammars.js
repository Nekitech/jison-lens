import fs from 'fs-extra';
import path from 'node:path'

function copy_grammar() {
  const grammars_input_path = path.resolve(process.cwd(), 'src/shared/grammars/');
  const output_path = '/tmp/';
  fs.copy(grammars_input_path, output_path, (err) => {
    if (err) return console.error('Ошибка копирования:', err);
    console.log('Папка успешно скопирована!');
  });
}

copy_grammar()
