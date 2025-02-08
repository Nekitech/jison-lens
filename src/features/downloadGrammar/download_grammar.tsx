import React from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import { handleDownload } from '@/shared/utils/download';
import downloadFile from '@/shared/actions/downloadFile';

const DownloadGrammar = () => {
    const filename = 'grammar.jison';
    const filepath = `src/shared/generated/${filename}`;

    return (
        <Button
            variant={'default'}
            onClick={() => handleDownload(filename, filepath, downloadFile)}
        >
            <ArrowDownToLine />
            Download grammar
        </Button>
    );
};

export default DownloadGrammar;
