import React from 'react';
import { ComponentItem } from './ComponentItem';
import { 
  Type, 
  Mouse, 
  Square, 
  Image, 
  BarChart3, 
  Calendar, 
  CheckSquare, 
  Slider,
  ToggleLeft,
  FileText,
  Grid,
  Navigation
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const componentCategories = [
  {
    title: 'Layout',
    components: [
      { type: 'container', label: 'Container', icon: Square, description: 'Flexible container' },
      { type: 'grid', label: 'Grid', icon: Grid, description: 'Responsive grid layout' },
      { type: 'navigation', label: 'Navigation', icon: Navigation, description: 'Navigation bar' },
    ]
  },
  {
    title: 'Content',
    components: [
      { type: 'text', label: 'Text', icon: Type, description: 'Text content' },
      { type: 'image', label: 'Image', icon: Image, description: 'Image component' },
      { type: 'chart', label: 'Chart', icon: BarChart3, description: 'Data visualization' },
    ]
  },
  {
    title: 'Forms',
    components: [
      { type: 'button', label: 'Button', icon: Mouse, description: 'Interactive button' },
      { type: 'input', label: 'Input', icon: FileText, description: 'Text input field' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Checkbox input' },
      { type: 'slider', label: 'Slider', icon: Slider, description: 'Range slider' },
      { type: 'toggle', label: 'Toggle', icon: ToggleLeft, description: 'Toggle switch' },
      { type: 'calendar', label: 'Calendar', icon: Calendar, description: 'Date picker' },
    ]
  },
];

export function ComponentPalette() {
  return (
    <div className="w-80 border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="font-medium">Components</h2>
        <p className="text-sm text-muted-foreground">Drag components to canvas</p>
      </div>
      
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {componentCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">{category.title}</h3>
              <div className="space-y-2">
                {category.components.map((component) => (
                  <ComponentItem
                    key={component.type}
                    type={component.type}
                    label={component.label}
                    icon={component.icon}
                    description={component.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}