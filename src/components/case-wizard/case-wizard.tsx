"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { caseWizardService } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const CaseWizard: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [step, setStep] = useState(0)
  const [wizardId, setWizardId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1: Client Information
  const [clientInfo, setClientInfo] = useState({
    client_name: "",
    client_contact: "",
    client_location: "",
  })

  // Step 2: Case Details
  const [caseDetails, setCaseDetails] = useState({
    title: "",
    description: "",
    case_type: "",
    priority: "medium",
    incident_date: "",
  })

  // Step 3: Funding Information
  const [fundingInfo, setFundingInfo] = useState({
    funding_required: 0,
  })

  // Start the wizard
  const startWizard = async () => {
    try {
      setIsLoading(true)
      const response = await caseWizardService.startWizard()
      setWizardId(response.data.wizard_id)
      setStep(1)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the case creation process. Please try again.",
        variant: "destructive",
      })
      console.error("Error starting wizard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle client info submission
  const handleClientInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!wizardId) return

    try {
      setIsLoading(true)
      const response = await caseWizardService.submitStep1(wizardId, clientInfo)
      console.log("Step 1 response:", response.data)
      setStep(2)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save client information. Please check your inputs and try again.",
        variant: "destructive",
      })
      console.error("Error submitting step 1:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle case details submission
  const handleCaseDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!wizardId) return

    try {
      setIsLoading(true)
      const response = await caseWizardService.submitStep2(wizardId, caseDetails)
      console.log("Step 2 response:", response.data)
      setStep(3)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save case details. Please check your inputs and try again.",
        variant: "destructive",
      })
      console.error("Error submitting step 2:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle funding info submission
  const handleFundingInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!wizardId) return

    try {
      setIsLoading(true)
      const response = await caseWizardService.submitStep3(wizardId, fundingInfo)
      console.log("Step 3 response:", response.data)
      setStep(4)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save funding information. Please check your inputs and try again.",
        variant: "destructive",
      })
      console.error("Error submitting step 3:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Complete the wizard
  const completeWizard = async () => {
    if (!wizardId) return

    try {
      setIsLoading(true)
      const response = await caseWizardService.completeWizard(wizardId)
      console.log("Complete wizard response:", response.data)

      toast({
        title: "Success",
        description: "Case created successfully!",
      })

      // Navigate to the case details page
      navigate(`/cases/${response.data.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the case. Please try again.",
        variant: "destructive",
      })
      console.error("Error completing wizard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create a New Case</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                This wizard will guide you through the process of creating a new case. You'll need to provide
                information about the client, case details, and funding requirements.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={startWizard} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  "Start"
                )}
              </Button>
            </CardFooter>
          </Card>
        )

      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Step 1: Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="clientInfoForm" onSubmit={handleClientInfoSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={clientInfo.client_name}
                      onChange={(e) => setClientInfo({ ...clientInfo, client_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client_contact">Client Contact</Label>
                    <Input
                      id="client_contact"
                      value={clientInfo.client_contact}
                      onChange={(e) => setClientInfo({ ...clientInfo, client_contact: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client_location">Client Location</Label>
                    <Input
                      id="client_location"
                      value={clientInfo.client_location}
                      onChange={(e) => setClientInfo({ ...clientInfo, client_location: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)} disabled={isLoading}>
                Back
              </Button>
              <Button type="submit" form="clientInfoForm" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </CardFooter>
          </Card>
        )

      case 2:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Step 2: Case Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="caseDetailsForm" onSubmit={handleCaseDetailsSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Case Title</Label>
                    <Input
                      id="title"
                      value={caseDetails.title}
                      onChange={(e) => setCaseDetails({ ...caseDetails, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Case Description</Label>
                    <Textarea
                      id="description"
                      value={caseDetails.description}
                      onChange={(e) => setCaseDetails({ ...caseDetails, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case_type">Case Type</Label>
                    <Select
                      value={caseDetails.case_type}
                      onValueChange={(value) => setCaseDetails({ ...caseDetails, case_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="human_rights">Human Rights</SelectItem>
                        <SelectItem value="land_dispute">Land Dispute</SelectItem>
                        <SelectItem value="domestic_violence">Domestic Violence</SelectItem>
                        <SelectItem value="child_rights">Child Rights</SelectItem>
                        <SelectItem value="labor_dispute">Labor Dispute</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={caseDetails.priority}
                      onValueChange={(value) => setCaseDetails({ ...caseDetails, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident_date">Incident Date</Label>
                    <Input
                      id="incident_date"
                      type="date"
                      value={caseDetails.incident_date}
                      onChange={(e) => setCaseDetails({ ...caseDetails, incident_date: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading}>
                Back
              </Button>
              <Button type="submit" form="caseDetailsForm" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </CardFooter>
          </Card>
        )

      case 3:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Step 3: Funding Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="fundingInfoForm" onSubmit={handleFundingInfoSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="funding_required">Funding Required (KES)</Label>
                    <Input
                      id="funding_required"
                      type="number"
                      min="0"
                      step="100"
                      value={fundingInfo.funding_required}
                      onChange={(e) =>
                        setFundingInfo({ ...fundingInfo, funding_required: Number.parseFloat(e.target.value) })
                      }
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Enter the amount of funding required for this case in Kenyan Shillings.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} disabled={isLoading}>
                Back
              </Button>
              <Button type="submit" form="fundingInfoForm" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </CardFooter>
          </Card>
        )

      case 4:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Client Information</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Name:</span> {clientInfo.client_name}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span> {clientInfo.client_contact}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {clientInfo.client_location}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Case Details</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Title:</span> {caseDetails.title}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {caseDetails.case_type}
                    </p>
                    <p>
                      <span className="font-medium">Priority:</span> {caseDetails.priority}
                    </p>
                    <p>
                      <span className="font-medium">Incident Date:</span> {caseDetails.incident_date}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span> {caseDetails.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Funding Information</h3>
                  <div className="mt-2">
                    <p>
                      <span className="font-medium">Funding Required:</span> KES{" "}
                      {fundingInfo.funding_required.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)} disabled={isLoading}>
                Back
              </Button>
              <Button onClick={completeWizard} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Case"
                )}
              </Button>
            </CardFooter>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Create New Case</h1>
        <div className="flex justify-center mt-4">
          <ul className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i}
                </div>
                {i < 4 && <div className={`w-8 h-1 ${step > i ? "bg-primary" : "bg-gray-200"}`} />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {renderStep()}
    </div>
  )
}

export default CaseWizard

