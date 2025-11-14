import { Rocket, FileText, Plus, Settings, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  onNewChat: () => void;
}

export const Header = ({ onNewChat }: HeaderProps) => {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl shadow-glow">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Textify
          </h1>
          <p className="text-xs text-muted-foreground -mt-1">
            Your intelligent research assistant
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Ready to analyze your documents</span>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={onNewChat}>
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};