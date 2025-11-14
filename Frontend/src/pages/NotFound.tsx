import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; // Importing an icon

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center items-center text-primary mb-4">
            <Frown className="w-20 h-20" /> {/* Large icon */}
          </div>
          <CardTitle className="text-6xl font-extrabold text-primary-foreground">
            404
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            We can't seem to find the page you're looking for.
          </p>
          <p className="text-md text-muted-foreground">
            It might have been moved or deleted.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <Button asChild size="lg">
            <Link to="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;