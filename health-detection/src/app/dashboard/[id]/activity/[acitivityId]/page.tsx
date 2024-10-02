"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const description = "A collection of health charts.";

export default function Charts() {
    const generatePDF = () => {
        const input = document.getElementsByClassName('chart-wrapper')[0] as HTMLElement;
        if (!input) return;
      
        // Load the uploaded image
        const uploadedImage = 'Chest_Cancer.jpeg'; // Path to the image in the public folder
        const imageUrl = `/${uploadedImage}`; // Complete URL to access the image
      
        html2canvas(input, { scale: 2 }) // Increase scale for better resolution
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Use 'mm' and 'a4' for better sizing
            const imgWidth = 210; // Set to A4 width (in mm)
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const heightLeft = imgHeight;
      
            let position = 0;
      
            // Add a header
            pdf.setFontSize(18);
            pdf.text('Chest Cancer Report', 10, 10);
            pdf.setFontSize(10);
            pdf.text('Date: ' + new Date().toLocaleDateString(), 10, 20);
      
            pdf.addImage(imgData, 'PNG', 0, position + 30, imgWidth, imgHeight); // Adjusted position for the header
            position -= heightLeft;
      
            // Add new page if necessary
            while (heightLeft >= pageHeight) {
              position = heightLeft - pageHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position + 30, imgWidth, imgHeight); // Adjusted position for the header
            }
      
            // Add the uploaded image section
            pdf.addPage(); // New page for the uploaded image
            const image = new Image();
            image.src = imageUrl; // Set image source
            image.onload = () => {
              const imageWidth = 130; // Adjust width for the uploaded image
              const imageHeight = (image.height * imageWidth) / image.width; // Maintain aspect ratio
              const imagePositionY = 30; // Position for the uploaded image
      
              // Add uploaded image to PDF
              pdf.addImage(image, 'JPEG', 10, imagePositionY, imageWidth, imageHeight);
              
              // Add description below the image
              pdf.setFontSize(12);
              pdf.text('Uploaded Image:', 10, imagePositionY + imageHeight + 10); // Add description
      
              // Add final report status note
              pdf.addPage(); // New page for the final status
              pdf.setFontSize(14);
              pdf.text('Final Report Status:', 10, 10);
              pdf.setFontSize(12);
              pdf.text('Note: The analysis indicates a moderate risk for chest cancer based on the available data.', 10, 20);
              pdf.text('It is recommended to undergo further diagnostic evaluations and regular monitoring.', 10, 30);
              pdf.text('Please consult your healthcare provider for personalized advice and a follow-up plan.', 10, 40);
              
              
              pdf.save('chest_cancer_report.pdf'); // Save the PDF
            };
          });
      };
      
      
      
      
    

  return (
    <>
      <div className="w-auto m-5 flex justify-center">
        <Button className="w-auto" size={"sm"} onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
  <Card className="lg:max-w-md" x-chunk="charts-02-chunk-0">
    <CardHeader className="space-y-0 pb-2">
      <CardDescription>Latest Diagnosis</CardDescription>
      <CardTitle className="text-4xl tabular-nums">
        Positive{" "}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          result
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          diagnosis: {
            label: "Diagnosis Over Time",
            color: "hsl(var(--chart-1))"
          }
        }}
      >
        <BarChart
          accessibilityLayer
          margin={{
            left: -4,
            right: -4
          }}
          data={[
            {
              date: "2024-01-01",
              cases: 0
            },
            {
              date: "2024-01-02",
              cases: 1
            },
            {
              date: "2024-01-03",
              cases: 2
            },
            {
              date: "2024-01-04",
              cases: 1
            },
            {
              date: "2024-01-05",
              cases: 1
            },
            {
              date: "2024-01-06",
              cases: 2
            },
            {
              date: "2024-01-07",
              cases: 3
            }
          ]}
        >
          <Bar
            dataKey="cases"
            fill="var(--color-diagnosis)"
            radius={5}
            fillOpacity={0.6}
            activeBar={<Rectangle fillOpacity={0.8} />}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString("en-US", {
                weekday: "short"
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideIndicator
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  });
                }}
              />
            }
            cursor={false}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-1">
      <CardDescription>
        Over the past week, the cases have increased by{" "}
        <span className="font-medium text-foreground">+2 cases</span>.
      </CardDescription>
      <CardDescription>
        The average diagnosis rate over this period is{" "}
        <span className="font-medium text-foreground">1 case/day</span>.
      </CardDescription>
    </CardFooter>
  </Card>
  <Card className="flex flex-col lg:max-w-md" x-chunk="charts-02-chunk-1">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
      <div>
        <CardDescription>Latest Scan Results</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          Clear
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
            results
          </span>
        </CardTitle>
      </div>
      <div>
        <CardDescription>Next Follow-up</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          30
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
            days
          </span>
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex flex-1 items-center">
      <ChartContainer
        config={{
          scans: {
            label: "Scans",
            color: "hsl(var(--chart-1))"
          }
        }}
        className="w-full"
      >
        <LineChart
          accessibilityLayer
          margin={{
            left: 14,
            right: 14,
            top: 10
          }}
          data={[
            {
              date: "2024-01-01",
              scans: 1
            },
            {
              date: "2024-01-02",
              scans: 1
            },
            {
              date: "2024-01-03",
              scans: 2
            },
            {
              date: "2024-01-04",
              scans: 1
            },
            {
              date: "2024-01-05",
              scans: 3
            },
            {
              date: "2024-01-06",
              scans: 2
            },
            {
              date: "2024-01-07",
              scans: 5
            }
          ]}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="hsl(var(--muted-foreground))"
            strokeOpacity={0.5}
          />
          <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString("en-US", {
                weekday: "short"
              });
            }}
          />
          <Line
            dataKey="scans"
            type="natural"
            fill="var(--color-scans)"
            stroke="var(--color-scans)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              fill: "var(--color-scans)",
              stroke: "var(--color-scans)",
              r: 4
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  });
                }}
              />
            }
            cursor={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
</div>



<div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
  {/* Chest Cancer Detection Report Card */}
  <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
    <CardHeader>
      <CardTitle>Chest Cancer Detection Progress</CardTitle>
      <CardDescription>
        Scans indicate recent findings related to chest cancer diagnosis.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          10
          <span className="text-sm font-normal text-muted-foreground">
            Positive Scans
          </span>
        </div>
        <ChartContainer
          config={{
            diagnosis: {
              label: "Positive Diagnoses",
              color: "hsl(var(--chart-1))"
            }
          }}
          className="aspect-auto h-[32px] w-full"
        >
          <BarChart
            accessibilityLayer
            layout="vertical"
            margin={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }}
            data={[{ date: "2024", positiveDiagnoses: 10 }]}
          >
            <Bar
              dataKey="positiveDiagnoses"
              fill="var(--color-diagnosis)"
              radius={4}
              barSize={32}
            >
              <LabelList
                position="insideLeft"
                dataKey="date"
                offset={8}
                fontSize={12}
                fill="white"
              />
            </Bar>
            <YAxis dataKey="date" type="category" tickCount={1} hide />
            <XAxis dataKey="positiveDiagnoses" type="number" hide />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          5
          <span className="text-sm font-normal text-muted-foreground">
            Negative Scans
          </span>
        </div>
        <ChartContainer
          config={{
            diagnosis: {
              label: "Negative Diagnoses",
              color: "hsl(var(--muted))"
            }
          }}
          className="aspect-auto h-[32px] w-full"
        >
          <BarChart
            accessibilityLayer
            layout="vertical"
            margin={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }}
            data={[{ date: "2024", negativeDiagnoses: 5 }]}
          >
            <Bar
              dataKey="negativeDiagnoses"
              fill="var(--color-negative)"
              radius={4}
              barSize={32}
            >
              <LabelList
                position="insideLeft"
                dataKey="date"
                offset={8}
                fontSize={12}
                fill="hsl(var(--muted-foreground))"
              />
            </Bar>
            <YAxis dataKey="date" type="category" tickCount={1} hide />
            <XAxis dataKey="negativeDiagnoses" type="number" hide />
          </BarChart>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>

  {/* Scans Performed Over the Last 7 Days */}
  <Card className="max-w-xs" x-chunk="charts-01-chunk-3">
    <CardHeader className="p-4 pb-0">
      <CardTitle>Scans Performed</CardTitle>
      <CardDescription>
        The number of scans performed over the last 7 days for chest cancer diagnosis.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
      <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
        6
        <span className="text-sm font-normal text-muted-foreground">
          scans/day
        </span>
      </div>
      <ChartContainer
        config={{
          scans: {
            label: "Scans",
            color: "hsl(var(--chart-1))"
          }
        }}
        className="ml-auto w-[72px]"
      >
        <BarChart
          accessibilityLayer
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
          data={[
            { date: "2024-01-01", scans: 6 },
            { date: "2024-01-02", scans: 4 },
            { date: "2024-01-03", scans: 5 },
            { date: "2024-01-04", scans: 3 },
            { date: "2024-01-05", scans: 6 },
            { date: "2024-01-06", scans: 5 },
            { date: "2024-01-07", scans: 7 }
          ]}
        >
          <Bar
            dataKey="scans"
            fill="var(--color-scans)"
            radius={2}
            fillOpacity={0.2}
            activeIndex={6}
            activeBar={<Rectangle fillOpacity={0.8} />}
          />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={4} hide />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>

  {/* Health and Exercise Summary */}
  <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
    <CardContent className="flex gap-4 p-4 pb-2">
      <ChartContainer
        config={{
          diagnosis: {
            label: "Diagnosis Status",
            color: "hsl(var(--chart-1))"
          },
          scans: {
            label: "Total Scans",
            color: "hsl(var(--chart-2))"
          },
        }}
        className="h-[140px] w-full"
      >
        <BarChart
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 10
          }}
          data={[
            {
              activity: "diagnosis",
              value: (10 / 15) * 100,
              label: "10/15 diagnosed",
              fill: "var(--color-diagnosis)"
            },
            {
              activity: "scan",
              value: (25 / 40) * 100,
              label: "25/40 scans",
              fill: "var(--color-scan)"
            }
          ]}
          layout="vertical"
          barSize={32}
          barGap={2}
        >
          <XAxis type="number" dataKey="value" hide />
          <YAxis
            dataKey="activity"
            type="category"
            tickLine={false}
            tickMargin={4}
            axisLine={false}
            className="capitalize"
          />
          <Bar dataKey="value" radius={5}>
            <LabelList
              position="insideLeft"
              dataKey="label"
              fill="white"
              offset={8}
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex flex-row border-t p-4">
      <div className="flex w-full items-center gap-2">
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-xs text-muted-foreground">Diagnosis Status</div>
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            67%
            <span className="text-sm font-normal text-muted-foreground">
              Diagnosed
            </span>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-2 h-10 w-px" />
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-xs text-muted-foreground">Total Scans</div>
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            40
            <span className="text-sm font-normal text-muted-foreground">
              Total Scans
            </span>
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</div>



<div className="grid w-full flex-1 gap-6">
  {/* Chest Cancer Detection Card */}
  <Card className="max-w-xs" x-chunk="cancer-02-chunk-1">
    <CardContent className="flex gap-4 p-4">
      <div className="grid items-center gap-2">
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Risk Level</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            Moderate
            <span className="text-sm font-normal text-muted-foreground">risk</span>
          </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Screenings</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            4
            <span className="text-sm font-normal text-muted-foreground">scans</span>
          </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Detected Conditions</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            2
            <span className="text-sm font-normal text-muted-foreground">conditions</span>
          </div>
        </div>
      </div>
      <ChartContainer
        config={{
          risk: {
            label: "Risk Level",
            color: "hsl(var(--chart-1))"
          },
          screenings: {
            label: "Screenings",
            color: "hsl(var(--chart-2))"
          },
          conditions: {
            label: "Conditions Detected",
            color: "hsl(var(--chart-3))"
          }
        }}
        className="mx-auto aspect-square w-full max-w-[80%]"
      >
        <RadialBarChart
          margin={{
            left: -10,
            right: -10,
            top: -10,
            bottom: -10
          }}
          data={[
            {
              activity: "screenings",
              value: (4 / 5) * 100,
              fill: "var(--color-screenings)"
            },
            {
              activity: "risk",
              value: 60, // Assuming moderate risk reflects 60% severity
              fill: "var(--color-risk)"
            },
            {
              activity: "conditions",
              value: (2 / 5) * 100, // Conditions detected comparison
              fill: "var(--color-conditions)"
            }
          ]}
          innerRadius="20%"
          barSize={24}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            dataKey="value"
            tick={false}
          />
          <RadialBar dataKey="value" background cornerRadius={5} />
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
  </Card>

  {/* Daily Screening History Card */}
  <Card className="max-w-xs" x-chunk="cancer-02-chunk-2">
    <CardHeader className="p-4 pb-0">
      <CardTitle>Screening History</CardTitle>
      <CardDescription>
        Average number of screenings per week: 4. Keep up the regular checks.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
      <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
        4
        <span className="text-sm font-normal text-muted-foreground">
          scans/week
        </span>
      </div>
      <ChartContainer
        config={{
          scans: {
            label: "Scans",
            color: "hsl(var(--chart-1))"
          }
        }}
        className="ml-auto w-[64px]"
      >
        <BarChart accessibilityLayer margin={{ left: 0, right: 0, top: 0, bottom: 0 }} data={[
          { date: "2024-01-01", scans: 4 },
          { date: "2024-01-02", scans: 5 },
          { date: "2024-01-03", scans: 4 },
          { date: "2024-01-04", scans: 3 },
          { date: "2024-01-05", scans: 6 },
          { date: "2024-01-06", scans: 5 },
          { date: "2024-01-07", scans: 4 }
        ]}>
          <Bar dataKey="scans" fill="var(--color-scans)" radius={2} fillOpacity={0.2} activeIndex={6} activeBar={<Rectangle fillOpacity={0.8} />} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={4} hide />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>

  {/* Time Spent in Screening */}
  <Card className="max-w-xs" x-chunk="cancer-02-chunk-3">
    <CardHeader className="space-y-0 pb-0">
      <CardDescription>Time in Screening</CardDescription>
      <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
        40
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          min
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ChartContainer config={{ time: { label: "Time", color: "hsl(var(--chart-2))" } }} >
        <AreaChart accessibilityLayer data={[
          { date: "2024-01-01", time: 40 },
          { date: "2024-01-02", time: 30 },
          { date: "2024-01-03", time: 45 },
          { date: "2024-01-04", time: 35 },
          { date: "2024-01-05", time: 50 },
          { date: "2024-01-06", time: 55 },
          { date: "2024-01-07", time: 45 }
        ]} margin={{ left: 0, right: 0, top: 0, bottom: 0 }} >
          <XAxis dataKey="date" hide />
          <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
          <defs>
            <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-time)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-time)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area dataKey="time" type="natural" fill="url(#fillTime)" fillOpacity={0.4} stroke="var(--color-time)" />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} formatter={(value) => (
            <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
              Time in screening
              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                {value} <span className="font-normal text-muted-foreground">min</span>
              </div>
            </div>
          )} />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
</div>



      </div>
    </>
  );
}
