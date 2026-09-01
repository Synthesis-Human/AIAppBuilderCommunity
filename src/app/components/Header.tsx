import React from 'react';
import { Button } from './ui/button';
import { Play, Save, Download, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onPreview: () => void;
  onSave: () => void;
  onExport: () => void;
}

export function Header({ onPreview, onSave, onExport }: HeaderProps) {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl">AI App Builder</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onPreview}>
          <Play className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}