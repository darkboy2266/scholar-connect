import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TrackApplication = () => {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!applicationNumber.trim()) return;

    // Placeholder - Will fetch from Google Sheets in future
    setTrackingData({
      applicationNumber,
      rollNumber: "Pending",
      examCentre: "Will be announced soon",
      status: "Application Received",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="scholarship-container">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Application
        </Button>

        <div className="scholarship-header text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Track Your Application</h1>
          <p className="text-lg opacity-90 mt-2">
            Enter your application number to check status
          </p>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Application Tracking</CardTitle>
            <CardDescription>
              Enter the application number you received after payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="SCH-2025-XXXXXX"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={!applicationNumber.trim()}>
                <Search className="mr-2 h-4 w-4" />
                Track
              </Button>
            </div>

            {trackingData && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Application Number</p>
                      <p className="font-semibold">{trackingData.applicationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold text-primary">{trackingData.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Roll Number</p>
                      <p className="font-semibold">{trackingData.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Exam Centre</p>
                      <p className="font-semibold">{trackingData.examCentre}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r">
                  <p className="text-sm">
                    <strong>Note:</strong> Roll numbers and exam centres will be announced 7 days before the exam date.
                    You will be notified via email and SMS.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackApplication;
