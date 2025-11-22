// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Award, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  class: z.string().min(1, "Please select a class"),
  examLanguage: z.string().min(1, "Please select exam language"),
  previousResult: z.string().min(1, "Previous result is required"),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      fatherName: "",
      email: "",
      phone: "",
      class: "",
      examLanguage: "",
      previousResult: "",
    },
  });

  const selectedClass = form.watch("class");

  const getPreviousResultLabel = (currentClass: string) => {
    const classMap: { [key: string]: string } = {
      "5th": "4th Class Result (%)",
      "6th": "5th Class Result (%)",
      "7th": "6th Class Result (%)",
      "8th": "7th Class Result (%)",
      "9th": "8th Class Result (%)",
      "10th": "9th Class Result (%)",
      "11th": "10th Result (%)",
      "12th": "10th Result (%)",
    };
    return classMap[currentClass] || "Previous Class Result (%)";
  };

  const generateApplicationNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SCH-${year}-${random}`;
  };

  const initiateRazorpayPayment = (formData: FormData) => {
    const options = {
      key: "rpz_test_RiQbB3gt6WF2Wv",
      amount: 29900, // ₹299 in paise
      currency: "INR",
      name: "Scholarship Portal",
      description: "Application Fee - ₹51,00,000 Scholarship",
      image: "/placeholder.svg",
      handler: async function (response: any) {
        const applicationNumber = generateApplicationNumber();
        const submissionData = {
          applicationNumber,
          ...formData,
          paymentId: response.razorpay_payment_id,
          submissionTime: new Date().toISOString(),
          rollNumber: "Pending",
          examCentre: "Will be announced soon",
        };

        // Send to Google Sheets
        try {
          await fetch("https://script.google.com/macros/s/AKfycbziC0vGXDwff0PIswmRyjl17pIE8s5jhzGRTQdbKzKQzCJexFddJEQ53P90H1PCy-L1cw/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          });

          navigate("/success", { state: { applicationNumber } });
        } catch (error) {
          toast({
            title: "Submission Error",
            description: "Payment successful but data storage failed. Please contact support.",
            variant: "destructive",
          });
        }
        setIsPaymentProcessing(false);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#1d4ed8",
      },
      modal: {
        ondismiss: function () {
          setIsPaymentProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
            variant: "destructive",
          });
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const onSubmit = (data: FormData) => {
    setIsPaymentProcessing(true);
    initiateRazorpayPayment(data);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="scholarship-container">
        <div className="scholarship-header text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="h-10 w-10" />
            <h1 className="text-3xl md:text-4xl font-bold">Scholarship Application Portal</h1>
          </div>
          <p className="text-lg opacity-90">₹51,00,000 Scholarship Program</p>
        </div>

        <div className="info-box mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Scholarship Value</p>
              <p className="text-2xl font-bold text-accent flex items-center gap-1">
                <IndianRupee className="h-5 w-5" />
                51,00,000
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Application Fee</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                <IndianRupee className="h-5 w-5" />
                299
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your father's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="10-digit mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Class *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5th">5th</SelectItem>
                          <SelectItem value="6th">6th</SelectItem>
                          <SelectItem value="7th">7th</SelectItem>
                          <SelectItem value="8th">8th</SelectItem>
                          <SelectItem value="9th">9th</SelectItem>
                          <SelectItem value="10th">10th</SelectItem>
                          <SelectItem value="11th">11th</SelectItem>
                          <SelectItem value="12th">12th</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="examLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Language *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedClass && (
                <FormField
                  control={form.control}
                  name="previousResult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getPreviousResultLabel(selectedClass)} *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter percentage (0-100)"
                          min="0"
                          max="100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex gap-4 flex-wrap">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPaymentProcessing}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isPaymentProcessing ? "Processing..." : "Pay ₹299 & Submit"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/track")}
                  className="flex-1"
                >
                  Track Application
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>* All fields are mandatory. Payment is non-refundable.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
