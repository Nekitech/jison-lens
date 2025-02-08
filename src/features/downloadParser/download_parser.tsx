import React from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import { handleDownload } from '@/shared/utils/download';
import downloadFile from '@/shared/actions/downloadFile';

const DownloadParser = () => {
    const filepath = 'src/shared/generated/grammar.js';

    return (
        <Button
            variant={'default'}
            onClick={() => handleDownload('grammar.js', filepath, downloadFile)}
        >
            <ArrowDownToLine />
            Download parser
        </Button>
    );
};

export default DownloadParser;
