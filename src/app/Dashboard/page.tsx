"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Users } from "lucide-react";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { statisticsUrl, yearlyTransactionUrl } from "@/backend/backend";
import { IStatistics } from "@/types/statisticsTypes/statistics";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { generateYears } from "@/lib/utils";

export default function App() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const { data, isLoading: isStatisticsLoading } = useGetData(
    statisticsUrl,
    "countStatistics"
  );

  const {
    data: yearlyTransactionsRes,
    isLoading: isYearlyTransactionsLoading,
    isError,
  } = useGetData(
    yearlyTransactionUrl,
    "yearlyTransaction",
    [],
    undefined,
    undefined,
    undefined,
    "year",
    selectedYear
  );

  const statisticsData: IStatistics = data?.data.data || {};
  const yearlyTransactions = yearlyTransactionsRes?.data || {};
  const years = generateYears(2021, currentYear);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Clinic Dashboard</h1>
      {isStatisticsLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(statisticsData).map(([key, value]) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total {key.split("_").join("  ").replace("count", "")}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Yearly Transactions</CardTitle>
          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
            defaultValue={currentYear.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>{selectedYear}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {isYearlyTransactionsLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center text-red-500 font-semibold">
              No data available for the selected year.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyTransactions[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
