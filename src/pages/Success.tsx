import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const applicationNumber = location.state?.applicationNumber;

  useEffect(() => {
    if (!applicationNumber) {
      navigate("/");
    }
  }, [applicationNumber, navigate]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="scholarship-container">
        <Card className="border-accent border-2">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-accent" />
            </div>
            <CardTitle className="text-3xl">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-base">
              Your payment has been processed and application has been registered
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Application Number</p>
              <p className="text-3xl font-bold text-primary tracking-wider">
                {applicationNumber}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Please save this number for future reference
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">What's Next?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>You will receive a confirmation email within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Roll numbers will be announced 7 days before the exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Exam centre details will be sent via email and SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Keep checking the tracking page for updates</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => navigate("/track")} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Track Application
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r text-sm">
              <p className="font-semibold mb-1">Important:</p>
              <p>
                Screenshot or note down your application number. You will need it to track your
                application status and download your admit card.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;
