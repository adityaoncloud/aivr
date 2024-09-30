"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast" // Changed import for toast

const formSchema = z.object({
  field1: z.string().min(1, "Field 1 is required"),
  field2: z.string().min(1, "Field 2 is required"),
  field3: z.string().min(1, "Field 3 is required"),
  field4: z.string().min(1, "Field 4 is required"),
  field5: z.string().min(1, "Field 5 is required"),
  field6: z.string().min(1, "Field 6 is required"),
  field7: z.string().min(1, "Field 7 is required"),
  field8: z.string().min(1, "Field 8 is required"),
  field9: z.string().min(1, "Field 9 is required"),
  field10: z.string().min(1, "Field 10 is required"),
  field11: z.string().min(1, "Field 11 is required"),
  field12: z.string().min(1, "Field 12 is required"),
  field13: z.string().min(1, "Field 13 is required"),
  field14: z.string().min(1, "Field 14 is required"),
  field15: z.string().min(1, "Field 15 is required"),
  field16: z.string().min(1, "Field 16 is required"),
  field17: z.string().min(1, "Field 17 is required"),
})

type FormData = z.infer<typeof formSchema>

export default function Component() {
  const [directInput, setDirectInput] = useState("")
  const [inputFormat, setInputFormat] = useState<"xml" | "json">("xml")
  const { toast } = useToast() // Use the useToast hook

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field1: "", field2: "", field3: "", field4: "", field5: "",
      field6: "", field7: "", field8: "", field9: "", field10: "",
      field11: "", field12: "", field13: "", field14: "", field15: "",
      field16: "", field17: "",
    },
  })

  const convertToXML = (data: FormData): string => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n'
    Object.entries(data).forEach(([key, value]) => {
      xml += `  <${key}>${value}</${key}>\n`
    })
    xml += '</data>'
    return xml
  }

  const onSubmit = async (data: FormData) => {
    let submissionData: string | FormData = data
    let contentType = 'application/xml'

    if (directInput) {
      if (inputFormat === "xml") {
        submissionData = directInput
      } else {
        // For JSON, we'll send it as-is
        submissionData = directInput
        contentType = 'application/json'
      }
    } else {
      // Convert form data to XML
      submissionData = convertToXML(data)
    }

    // Here you would typically send the data to your backend
    console.log("Submitting data:", submissionData)
    console.log("Content-Type:", contentType)

    // Simulating an API call
    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': contentType
      //   },
      //   body: submissionData
      // })
      // if (!response.ok) throw new Error('Submission failed')

      toast({
        title: "Success",
        description: "Data submitted successfully!",
      })
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to submit data. Please try again.",
        variant: "destructive",
      })
      console.error("Submission error:", error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setDirectInput(content)
        setInputFormat(file.name.endsWith('.json') ? 'json' : 'xml')
      }
      reader.readAsText(file)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Data Input Form</CardTitle>
        <CardDescription>Enter your data or upload an XML/JSON file</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Form Input</TabsTrigger>
            <TabsTrigger value="direct">Direct Input / File Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((i) => (
                    <FormField
                      key={`field${i}`}
                      control={form.control}
                      name={`field${i}` as keyof FormData}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field {i}</FormLabel>
                          <FormControl>
                            <Input placeholder={`Enter Field ${i}`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button type="submit">Submit Form</Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="direct">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  variant={inputFormat === "xml" ? "default" : "outline"}
                  onClick={() => setInputFormat("xml")}
                >
                  XML
                </Button>
                <Button
                  variant={inputFormat === "json" ? "default" : "outline"}
                  onClick={() => setInputFormat("json")}
                >
                  JSON
                </Button>
              </div>
              <Textarea
                placeholder={`Enter your ${inputFormat.toUpperCase()} data here`}
                value={directInput}
                onChange={(e) => setDirectInput(e.target.value)}
                className="h-64"
              />
              <div>
                <Input type="file" accept=".xml,.json" onChange={handleFileUpload} />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload an XML or JSON file
                </p>
              </div>
              <Button onClick={() => onSubmit({} as FormData)}>Submit {inputFormat.toUpperCase()}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}