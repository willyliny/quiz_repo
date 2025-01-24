"use client"

import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';

interface CodeBlockProps {
  code?: string;  // 讓 code 變成可選的
  language?: string;  // 讓 language 變成可選的
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code = "", language = "", className = "" }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      Prism.highlightAll();
    }
  }, [isClient, code]);

  // 如果沒有程式碼，就不渲染任何內容
  if (!code) return null;
  
  // 在客戶端渲染之前，如果有程式碼才顯示
  if (!isClient) return <pre><code>{code}</code></pre>;

  return (
    <pre className={`rounded bg-gray-800 p-4 ${className}`}>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;