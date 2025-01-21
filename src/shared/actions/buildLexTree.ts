'use server';

import { LexNodeType } from '@/shared/types/lex';
import { NodeBase } from '@xyflow/system/dist/esm/types/nodes';
import { v4 as uuidv4 } from 'uuid';
import { EdgeBase } from '@xyflow/system/dist/esm/types/edges';

/**
 * Преобразует дерево лексем в формат, подходящий для визуализации с использованием React Flow.
 * Функция добавляет уникальные идентификаторы (`id`) для каждого узла, рассчитывает координаты
 * для отображения узлов без перекрытий и создает связи между узлами на основе их иерархии.
 *
 * @param {LexNodeType} data - Корневой узел дерева лексем. Дерево должно иметь структуру:
 *   - `name` (string): Имя узла.
 *   - `children` (LexNodeType[]): Дочерние узлы.
 *   - Дополнительные пользовательские свойства (например, `subtitle`, `output` и т.д.).
 *
 * @returns {{
 *   nodes: NodeBase[],
 *   edges: EdgeBase[]
 * }} - Объект, содержащий:
 *   - `nodes`: Массив узлов, где каждый узел имеет:
 *     - `id` (string): Уникальный идентификатор узла.
 *     - `data` (object): Данные узла, включая `label` (имя узла).
 *     - `position` (object): Координаты узла `{ x: number, y: number }`.
 *   - `edges`: Массив связей между узлами, где каждая связь имеет:
 *     - `id` (string): Уникальный идентификатор связи.
 *     - `source` (string): Идентификатор узла-источника.
 *     - `target` (string): Идентификатор узла-назначения.
 *
 * @example
 * const lexTree = {
 *   name: 'Root',
 *   children: [
 *     { name: 'Child1', children: [] },
 *     { name: 'Child2', children: [] }
 *   ]
 * };
 *
 * const { nodes, edges } = await buildLexTree(lexTree);
 * console.log(nodes); // [{ id: 'Root_...', data: { label: 'Root' }, position: { x: 0, y: 0 } }, ...]
 * console.log(edges); // [{ id: 'Root_... -> Child1_...', source: 'Root_...', target: 'Child1_...' }, ...]
 */
export default async function buildLexTree(data: LexNodeType | null) {
    const nodes: NodeBase[] = [];
    const edges: EdgeBase[] = [];

    // Функция для добавления уникальных id
    function addUniqueIds(node: LexNodeType | null) {
        node!.id = `${node?.name}_${uuidv4()}`;

        if (node?.children && node?.children.length > 0) {
            node?.children.forEach((child) => addUniqueIds(child));
        }
    }

    // Рекурсивная функция для расчета координат и добавления узлов и связей
    const recursive = (
        node: LexNodeType | null,
        coords: { x: number; y: number },
        level: number,
    ) => {
        if (node?.children.length === 0) return;

        const baseHorizontalSpacing = 200;
        // Увеличиваем расстояние между узлами на каждом уровне
        const horizontalSpacing = baseHorizontalSpacing * (level + 1);

        const verticalSpacing = 100;

        // Начальная позиция для первого дочернего узла

        const len = node!.children.length;
        let childX = coords.x - ((len - 1) * horizontalSpacing) / 2;

        for (let i = 0; i < len; i++) {
            const nextNode = node!.children[i];

            const newCoords = {
                x: childX,
                y: coords.y + verticalSpacing,
            };

            nodes.push({
                id: nextNode?.id,
                data: {
                    label: nextNode?.name,
                    description: nextNode?.output,
                },
                position: newCoords,
                draggable: false,
                connectable: false,
            });

            // Добавляем связь
            edges.push({
                id: `${node?.id} -> ${nextNode?.id}`,
                source: node?.id,
                target: nextNode?.id,
            });

            // Рекурсивно обрабатываем дочерние узлы
            recursive(nextNode, newCoords, level + 1);

            // Сдвигаем позицию для следующего дочернего узла
            childX += horizontalSpacing;
        }
    };

    // Добавляем уникальные id всем узлам
    addUniqueIds(data);

    // корневой узел
    const root = {
        id: data?.id,
        data: {
            label: data?.name,
            description: data?.output,
        },
        position: {
            x: 0,
            y: 0,
        },
    };
    nodes.push(root);

    recursive(data, root.position, 0);

    return {
        nodes,
        edges,
    };
}
