import React from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import downloadTSParser from '@/shared/actions/downloadTSParser';
import { handleDownload } from '@/shared/utils/download';

const DownloadTSParser = () => {
    const filename = 'ts_parser.ts';

    return (
        <Button
            variant={'default'}
            onClick={() => handleDownload(filename, filename, downloadTSParser)}
        >
            <ArrowDownToLine />
            Download TypeScript parser
        </Button>
    );
};

export default DownloadTSParser;
