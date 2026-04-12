import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTasks } from "../lib/task-context";
import { useSimpleToast } from "./SimpleToast";
import type { Task } from "../lib/types";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskToEdit?: Task | null;
}

export function TaskFormDialog({ open, onOpenChange, taskToEdit }: TaskFormDialogProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useSimpleToast();
  const { addTask, updateTask } = useTasks();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority || "medium");
    } else {
      setTitle("");
      setPriority("medium");
    }
  }, [taskToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const taskData = {
        title,
        priority,
        completed: false,
        xp: 10,
      };

      if (taskToEdit) {
        await updateTask(taskToEdit.id, taskData);
        toast({ title: "Task Updated!", description: "Keep up the good work!" });
      } else {
        await addTask(taskData);
        toast({ title: "New Task Added!", description: "Let's do this!" });
      }
      onOpenChange(false);
    } catch (error) {
      toast({ 
        title: "Oh no!", 
        description: "Something went wrong. Try again!", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-[#FFF8F0] border-4 border-[#8B6F47] rounded-none shadow-[8px_8px_0_0_rgba(139,111,71,0.2)] font-pixel sm:max-w-[425px]"
        aria-describedby="task-form-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-[#8B6F47] text-center pt-4">
            {taskToEdit ? "Edit Quest" : "New Quest"}
          </DialogTitle>
          <DialogDescription id="task-form-description" className="text-center text-[#8B6F47]/60 text-xs">
            {taskToEdit ? "Update your quest details below." : "Create a new quest to track."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#8B6F47] font-bold uppercase text-xs tracking-wider">
              Quest Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Buy almond milk..."
              className="bg-white border-2 border-[#8B6F47] rounded-none focus:ring-0 focus:border-[#FFC4DD] text-[#8B6F47] font-pixel h-12"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#8B6F47] font-bold uppercase text-xs tracking-wider">Priority Level</Label>
            <RadioGroup value={priority} onValueChange={(value) => setPriority(value as any)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" className="border-2 border-[#8B6F47] text-[#B4FFE6]" />
                <Label htmlFor="low" className="text-xs uppercase text-[#8B6F47] cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" className="border-2 border-[#8B6F47] text-[#FFF4B4]" />
                <Label htmlFor="medium" className="text-xs uppercase text-[#8B6F47] cursor-pointer">Med</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" className="border-2 border-[#8B6F47] text-[#FFC4DD]" />
                <Label htmlFor="high" className="text-xs uppercase text-[#8B6F47] cursor-pointer">High</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="font-pixel text-[#8B6F47] hover:bg-[#D7C4FF]/20"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#B4FFE6] hover:bg-[#9AE6CC] text-[#8B6F47] font-bold border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] active:translate-y-1 active:shadow-none transition-all rounded-none font-pixel px-6"
            >
              {isSubmitting ? "Saving..." : taskToEdit ? "Update Quest" : "Start Quest"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
