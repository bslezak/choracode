import React from 'react';
import { createRoot } from 'react-dom/client';
import { getLogger } from './application/logger';
import './index.css'; 

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);
root.render(<div className="flex h-screen items-center justify-center bg-blue-500">
      <h1 className="text-3xl font-bold text-white">
        Tailwind v4 in Electron!
      </h1>
    </div>);

const logger = getLogger();
logger.info('Renderer process started');
