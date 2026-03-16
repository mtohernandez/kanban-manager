import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <Card className="overflow-hidden p-0 w-full max-w-4xl">
      <CardContent className="grid p-0 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to your Kanban Manager account
            </p>
          </div>
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "shadow-none w-full",
                card: "shadow-none w-full p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-input bg-background hover:bg-accent",
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                footerAction: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/80",
              },
            }}
          />
        </div>
        <div className="bg-muted relative hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80"
            alt="Abstract art"
            fill
            className="object-cover"
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
