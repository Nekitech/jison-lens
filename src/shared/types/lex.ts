export type ParserDebuggerType = {
    action: string;
    nonterminal: string;
    terminal?: string;
    prereduce: string[];
    result?: string;
    productions: string[];
    text: string | number | object;
};

export type LexNodeType = {
    id?: string;
    name: string;
    output: any;
    children: LexNodeType[];
};
