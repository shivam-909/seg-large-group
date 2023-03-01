import React, { useState } from 'react';
import { MultilineInput } from 'react-input-multiline';
  
  export default function MultiLineTextBox() {
    const [inputValue, setInputValue] = useState('');
  
    return (
      <div className="p-2 border-2 rounded-md border-dark-theme-grey bg-white">
        <MultilineInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Maximum 100 characters."/>
      </div>
    );
  }