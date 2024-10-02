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

export const description = "A collection of health charts.";

export default function Charts() {
  return (
    <>
      <div className="w-auto m-5 flex justify-center">
        <Button className="w-auto" size={"sm"}>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
  <Card className="lg:max-w-md" x-chunk="charts-02-chunk-0">
    <CardHeader className="space-y-0 pb-2">
      <CardDescription>Today's Tumor Size</CardDescription>
      <CardTitle className="text-4xl tabular-nums">
        5.2{" "}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          cm
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          tumorSize: {
            label: "Tumor Size",
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
              size: 4.5
            },
            {
              date: "2024-01-02",
              size: 4.7
            },
            {
              date: "2024-01-03",
              size: 5.0
            },
            {
              date: "2024-01-04",
              size: 5.1
            },
            {
              date: "2024-01-05",
              size: 5.2
            },
            {
              date: "2024-01-06",
              size: 5.3
            },
            {
              date: "2024-01-07",
              size: 5.4
            }
          ]}
        >
          <Bar
            dataKey="size"
            fill="var(--color-tumor-size)"
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
            defaultIndex={4}
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
          <ReferenceLine
            y={5.0}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="3 3"
            strokeWidth={1}
          >
            <Label
              position="insideBottomLeft"
              value="Average Tumor Size"
              offset={10}
              fill="hsl(var(--foreground))"
            />
            <Label
              position="insideTopLeft"
              value="5.0 cm"
              className="text-lg"
              fill="hsl(var(--foreground))"
              offset={10}
              startOffset={100}
            />
          </ReferenceLine>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-1">
      <CardDescription>
        Over the past week, the tumor size has changed by{" "}
        <span className="font-medium text-foreground">+0.5 cm</span>.
      </CardDescription>
      <CardDescription>
        The average tumor size over this period is{" "}
        <span className="font-medium text-foreground">5.0 cm</span>.
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
              scans: 2
            },
            {
              date: "2024-01-06",
              scans: 1
            },
            {
              date: "2024-01-07",
              scans: 3
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
  {/* Cancer Detection Report Card */}
  <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
    <CardHeader>
      <CardTitle>Cancer Detection Progress</CardTitle>
      <CardDescription>
        Scans indicate recent findings on tumor size over this year.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          2.1 cm
          <span className="text-sm font-normal text-muted-foreground">
            Tumor Size
          </span>
        </div>
        <ChartContainer
          config={{
            tumor: {
              label: "Tumor Size",
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
            data={[
              {
                date: "2024",
                tumorSize: 2.1
              }
            ]}
          >
            <Bar
              dataKey="tumorSize"
              fill="var(--color-tumor)"
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
            <XAxis dataKey="tumorSize" type="number" hide />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          1.5 cm
          <span className="text-sm font-normal text-muted-foreground">
            Tumor Size
          </span>
        </div>
        <ChartContainer
          config={{
            tumor: {
              label: "Tumor Size",
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
            data={[
              {
                date: "2023",
                tumorSize: 1.5
              }
            ]}
          >
            <Bar
              dataKey="tumorSize"
              fill="var(--color-tumor)"
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
            <XAxis dataKey="tumorSize" type="number" hide />
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
        The number of scans performed over the last 7 days for tumor diagnosis.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
      <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
        5
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
            {
              date: "2024-01-01",
              scans: 5
            },
            {
              date: "2024-01-02",
              scans: 3
            },
            {
              date: "2024-01-03",
              scans: 4
            },
            {
              date: "2024-01-04",
              scans: 2
            },
            {
              date: "2024-01-05",
              scans: 5
            },
            {
              date: "2024-01-06",
              scans: 4
            },
            {
              date: "2024-01-07",
              scans: 6
            }
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
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            hide
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>

  {/* Health and Exercise Summary */}
  <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
    <CardContent className="flex gap-4 p-4 pb-2">
      <ChartContainer
        config={{
          tumor: {
            label: "Tumor Activity",
            color: "hsl(var(--chart-1))"
          },
          scan: {
            label: "Scans",
            color: "hsl(var(--chart-2))"
          },
          diagnosis: {
            label: "Diagnosis",
            color: "hsl(var(--chart-3))"
          }
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
              value: (12 / 12) * 100,
              label: "12/12 diagnosed",
              fill: "var(--color-diagnosis)"
            },
            {
              activity: "tumor",
              value: (7 / 10) * 100,
              label: "7/10 cm",
              fill: "var(--color-tumor)"
            },
            {
              activity: "scan",
              value: (20 / 30) * 100,
              label: "20/30 scans",
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
          <div className="text-xs text-muted-foreground">Tumor Activity</div>
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            80%
            <span className="text-sm font-normal text-muted-foreground">
              Active
            </span>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-2 h-10 w-px" />
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-xs text-muted-foreground">Scans</div>
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            22
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
  {/* Tumor Detection Card */}
  <Card className="max-w-xs" x-chunk="cancer-01-chunk-1">
    <CardContent className="flex gap-4 p-4">
      <div className="grid items-center gap-2">
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Tumor Size</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            2.3 cm
            <span className="text-sm font-normal text-muted-foreground">
              average
            </span>
          </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Risk Level</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            High
            <span className="text-sm font-normal text-muted-foreground">risk</span>
          </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-0.5">
          <div className="text-sm text-muted-foreground">Screenings</div>
          <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
            3
            <span className="text-sm font-normal text-muted-foreground">scans</span>
          </div>
        </div>
      </div>
      <ChartContainer
        config={{
          tumor: {
            label: "Tumor Size",
            color: "hsl(var(--chart-1))"
          },
          risk: {
            label: "Risk Level",
            color: "hsl(var(--chart-2))"
          },
          screenings: {
            label: "Screenings",
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
              value: (3 / 5) * 100,
              fill: "var(--color-screenings)"
            },
            {
              activity: "risk",
              value: 75, // Assuming high risk reflects 75% severity
              fill: "var(--color-risk)"
            },
            {
              activity: "tumor",
              value: (2.3 / 3.0) * 100, // Tumor size comparison with max size
              fill: "var(--color-tumor)"
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
  <Card className="max-w-xs" x-chunk="cancer-01-chunk-2">
    <CardHeader className="p-4 pb-0">
      <CardTitle>Screening History</CardTitle>
      <CardDescription>
        Average number of screenings per week: 4. Keep up the regular checks.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
      <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
        5
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
          { date: "2024-01-01", scans: 3 },
          { date: "2024-01-02", scans: 4 },
          { date: "2024-01-03", scans: 5 },
          { date: "2024-01-04", scans: 5 },
          { date: "2024-01-05", scans: 6 },
          { date: "2024-01-06", scans: 4 },
          { date: "2024-01-07", scans: 5 }
        ]} >
          <Bar dataKey="scans" fill="var(--color-scans)" radius={2} fillOpacity={0.2} activeIndex={6} activeBar={<Rectangle fillOpacity={0.8} />} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={4} hide />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>

  {/* Time Spent in Screening */}
  <Card className="max-w-xs" x-chunk="cancer-01-chunk-3">
    <CardHeader className="space-y-0 pb-0">
      <CardDescription>Time in Screening</CardDescription>
      <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
        45
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          min
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ChartContainer config={{ time: { label: "Time", color: "hsl(var(--chart-2))" } }} >
        <AreaChart accessibilityLayer data={[
          { date: "2024-01-01", time: 45 },
          { date: "2024-01-02", time: 35 },
          { date: "2024-01-03", time: 40 },
          { date: "2024-01-04", time: 50 },
          { date: "2024-01-05", time: 60 },
          { date: "2024-01-06", time: 55 },
          { date: "2024-01-07", time: 40 }
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
