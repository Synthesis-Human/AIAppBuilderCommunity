import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { X, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DroppedComponentProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function DroppedComponent({ 
  id, 
  type, 
  position, 
  onRemove, 
  onSelect, 
  isSelected 
}: DroppedComponentProps) {
  const [componentProps, setComponentProps] = useState<any>({
    text: 'Sample Text',
    placeholder: 'Enter text...',
    label: 'Sample Label',
    src: 'https://via.placeholder.com/200x150'
  });

  const renderComponent = () => {
    switch (type) {
      case 'text':
        return <p>{componentProps.text}</p>;
      case 'button':
        return <Button variant="default">{componentProps.text || 'Button'}</Button>;
      case 'input':
        return <Input placeholder={componentProps.placeholder} />;
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={id} />
            <label htmlFor={id}>{componentProps.label}</label>
          </div>
        );
      case 'slider':
        return <Slider defaultValue={[50]} max={100} step={1} className="w-32" />;
      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Switch id={id} />
            <label htmlFor={id}>{componentProps.label}</label>
          </div>
        );
      case 'image':
        return (
          <ImageWithFallback
            src={componentProps.src}
            alt="Component image"
            className="w-48 h-32 object-cover rounded border"
          />
        );
      case 'container':
        return (
          <Card className="w-48 h-32 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <p className="text-muted-foreground">Container</p>
          </Card>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-2 w-48">
            <div className="h-16 bg-muted rounded border"></div>
            <div className="h-16 bg-muted rounded border"></div>
            <div className="h-16 bg-muted rounded border"></div>
            <div className="h-16 bg-muted rounded border"></div>
          </div>
        );
      case 'navigation':
        return (
          <nav className="flex space-x-4 p-2 bg-muted rounded border">
            <a href="#" className="text-sm">Home</a>
            <a href="#" className="text-sm">About</a>
            <a href="#" className="text-sm">Contact</a>
          </nav>
        );
      case 'calendar':
        return (
          <div className="border rounded p-2">
            <Calendar mode="single" className="rounded-md" />
          </div>
        );
      case 'chart':
        return (
          <div className="w-48 h-32 bg-muted rounded border flex items-center justify-center">
            <p className="text-muted-foreground">Chart Component</p>
          </div>
        );
      default:
        return <div className="p-4 border rounded">Unknown Component</div>;
    }
  };

  return (
    <div
      className={`absolute cursor-pointer group ${isSelected ? 'ring-2 ring-primary' : ''}`}
      style={{ left: position.x, top: position.y }}
      onClick={() => onSelect(id)}
    >
      {renderComponent()}
      
      {/* Component controls */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}