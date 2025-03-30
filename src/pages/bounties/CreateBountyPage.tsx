"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, UploadCloud, Plus, X, AlertCircle, ArrowRight, FileText, CheckCircle } from "lucide-react"
import { cn } from "@/utils/cn"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

const legalCategories = [
  { value: "human-rights", label: "Human Rights" },
  { value: "land-rights", label: "Land Rights" },
  { value: "environmental", label: "Environmental Law" },
  { value: "immigration", label: "Immigration" },
  { value: "housing", label: "Housing Law" },
  { value: "family", label: "Family Law" },
  { value: "employment", label: "Employment Law" },
  { value: "criminal", label: "Criminal Defense" },
  { value: "civil-rights", label: "Civil Rights" },
  { value: "consumer", label: "Consumer Protection" },
  { value: "education", label: "Education Law" },
  { value: "healthcare", label: "Healthcare Law" },
]

export default function CreateBountyPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    category: "",
    fundingGoal: "",
    deadline: undefined as Date | undefined,
  })

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number }[]>([])
  const [milestones, setMilestones] = useState<
    { title: string; description: string; amount: string; date: Date | undefined }[]
  >([{ title: "", description: "", amount: "", date: undefined }])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, deadline: date }))

    // Clear error when field is edited
    if (errors.deadline) {
      setErrors((prev) => ({ ...prev, deadline: "" }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMilestoneChange = (index: number, field: string, value: string | Date | undefined) => {
    setMilestones((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addMilestone = () => {
    setMilestones((prev) => [...prev, { title: "", description: "", amount: "", date: undefined }])
  }

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Detailed description is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.fundingGoal) {
      newErrors.fundingGoal = "Funding goal is required"
    } else if (isNaN(Number.parseFloat(formData.fundingGoal)) || Number.parseFloat(formData.fundingGoal) <= 0) {
      newErrors.fundingGoal = "Funding goal must be a positive number"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required"
    } else if (formData.deadline < new Date()) {
      newErrors.deadline = "Deadline must be in the future"
    }

    // Validate milestones
    let totalMilestoneAmount = 0
    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone_${index}_title`] = "Milestone title is required"
      }

      if (!milestone.amount) {
        newErrors[`milestone_${index}_amount`] = "Milestone amount is required"
      } else if (isNaN(Number.parseFloat(milestone.amount)) || Number.parseFloat(milestone.amount) <= 0) {
        newErrors[`milestone_${index}_amount`] = "Amount must be a positive number"
      } else {
        totalMilestoneAmount += Number.parseFloat(milestone.amount)
      }

      if (!milestone.date) {
        newErrors[`milestone_${index}_date`] = "Milestone date is required"
      } else if (formData.deadline && milestone.date > formData.deadline) {
        newErrors[`milestone_${index}_date`] = "Milestone date cannot be after the deadline"
      }
    })

    const fundingGoal = Number.parseFloat(formData.fundingGoal)
    if (!isNaN(fundingGoal) && totalMilestoneAmount !== fundingGoal) {
      newErrors.milestones_total = `Milestone amounts total (${totalMilestoneAmount}) must equal the funding goal (${fundingGoal})`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 1500)
  }

  // Redirect to login if not authenticated or not an NGO
  if (!user || (user.role !== "ngo" && user.role !== "admin")) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Only NGOs and legal aid organizations can create bounties.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please log in with an NGO account to create a bounty.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Legal Bounty</h1>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Before You Begin</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Please ensure your bounty complies with our guidelines and ethical standards. All bounties undergo a
              review process before being published.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide the essential details about your legal bounty</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Bounty Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Legal representation for housing discrimination case"
                value={formData.title}
                onChange={handleInputChange}
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Brief Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="A concise summary of the legal case (100-150 words)"
                value={formData.summary}
                onChange={handleInputChange}
                className={cn(errors.summary && "border-red-500")}
                rows={2}
              />
              {errors.summary && <p className="text-sm text-red-500">{errors.summary}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a comprehensive description of the legal case, its background, challenges, and objectives"
                value={formData.description}
                onChange={handleInputChange}
                className={cn(errors.description && "border-red-500")}
                rows={6}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Legal Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className={cn(errors.category && "border-red-500")}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {legalCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funding Details</CardTitle>
            <CardDescription>Set your funding goal and deadline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fundingGoal">Funding Goal (USD)</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input
                  id="fundingGoal"
                  name="fundingGoal"
                  type="number"
                  placeholder="5000"
                  value={formData.fundingGoal}
                  onChange={handleInputChange}
                  className={cn("pl-7", errors.fundingGoal && "border-red-500")}
                  min={1}
                  step={100}
                />
              </div>
              {errors.fundingGoal && <p className="text-sm text-red-500">{errors.fundingGoal}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Campaign Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deadline && "text-muted-foreground",
                      errors.deadline && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? format(formData.deadline, "PPP") : <span>Select deadline</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>
              Break down your funding goal into specific milestones for better transparency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.milestones_total && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.milestones_total}</AlertDescription>
              </Alert>
            )}

            {milestones.map((milestone, index) => (
              <div key={index} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Milestone {index + 1}</h3>
                  {milestones.length > 1 && (
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeMilestone(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                    <Input
                      id={`milestone-title-${index}`}
                      placeholder="e.g., Initial consultation and case assessment"
                      value={milestone.title}
                      onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                      className={cn(errors[`milestone_${index}_title`] && "border-red-500")}
                    />
                    {errors[`milestone_${index}_title`] && (
                      <p className="text-sm text-red-500">{errors[`milestone_${index}_title`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`milestone-description-${index}`}>Description</Label>
                    <Textarea
                      id={`milestone-description-${index}`}
                      placeholder="Describe what will be accomplished in this milestone"
                      value={milestone.description}
                      onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-amount-${index}`}>Amount (USD)</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id={`milestone-amount-${index}`}
                          type="number"
                          placeholder="1000"
                          value={milestone.amount}
                          onChange={(e) => handleMilestoneChange(index, "amount", e.target.value)}
                          className={cn("pl-7", errors[`milestone_${index}_amount`] && "border-red-500")}
                          min={1}
                          step={100}
                        />
                      </div>
                      {errors[`milestone_${index}_amount`] && (
                        <p className="text-sm text-red-500">{errors[`milestone_${index}_amount`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`milestone-date-${index}`}>Expected Completion</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !milestone.date && "text-muted-foreground",
                              errors[`milestone_${index}_date`] && "border-red-500",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {milestone.date ? format(milestone.date, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={milestone.date}
                            onSelect={(date) => handleMilestoneChange(index, "date", date)}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors[`milestone_${index}_date`] && (
                        <p className="text-sm text-red-500">{errors[`milestone_${index}_date`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" className="w-full" onClick={addMilestone}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Milestone
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>Upload any relevant documents to support your bounty</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-dashed border-2 border-muted rounded-md p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">Drag and drop files or</h3>
                <p className="text-sm text-muted-foreground mb-4">PDF, DOC, DOCX, JPG, PNG up to 10MB each</p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="cursor-pointer" type="button">
                    Browse files
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </Label>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Uploaded files</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
            <CardDescription>Please review all information before submitting your bounty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                By submitting this bounty, you confirm that all information provided is accurate and truthful. Your
                bounty will undergo a review process before being published publicly. This typically takes 1-2 business
                days.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => navigate("/bounties")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Bounty"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bounty Successfully Created!</DialogTitle>
            <DialogDescription>Your bounty has been submitted and is pending review by our team.</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Thank you for creating a bounty!</h3>
            <p className="text-muted-foreground">
              You'll receive a notification once your bounty is approved and published.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => navigate("/bounties")}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Go to Bounties
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

