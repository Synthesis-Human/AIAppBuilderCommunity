import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DroppedComponent } from './DroppedComponent';
import { Plus } from 'lucide-react';

interface CanvasComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
}

interface CanvasProps {
  onComponentSelect: (componentId: string | null) => void;
  selectedComponentId: string | null;
}

export function Canvas({ onComponentSelect, selectedComponentId }: CanvasProps) {
  const [components, setComponents] = useState<CanvasComponent[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item: { type: string; label: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = (monitor.getDropResult() as any)?.getBoundingClientRect?.() || 
                         document.querySelector('[data-canvas]')?.getBoundingClientRect();
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        
        const newComponent: CanvasComponent = {
          id: `${item.type}-${Date.now()}`,
          type: item.type,
          position: { x: Math.max(0, x - 50), y: Math.max(0, y - 25) },
        };
        
        setComponents(prev => [...prev, newComponent]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleRemoveComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponentId === id) {
      onComponentSelect(null);
    }
  };

  const handleSelectComponent = (id: string) => {
    onComponentSelect(id);
  };

  return (
    <div className="flex-1 relative overflow-hidden bg-background">
      <div
        ref={drop}
        data-canvas
        className={`w-full h-full relative ${isOver ? 'bg-primary/5' : ''} transition-colors`}
        onClick={() => onComponentSelect(null)}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Drop zone message */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Start Building</h3>
              <p className="text-muted-foreground">
                Drag components from the palette to begin creating your app
              </p>
            </div>
          </div>
        )}
        
        {/* Render components */}
        {components.map((component) => (
          <DroppedComponent
            key={component.id}
            id={component.id}
            type={component.type}
            position={component.position}
            onRemove={handleRemoveComponent}
            onSelect={handleSelectComponent}
            isSelected={selectedComponentId === component.id}
          />
        ))}
        
        {/* Drop overlay */}
        {isOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
            <p className="text-primary">Drop component here</p>
          </div>
        )}
      </div>
    </div>
  );
}