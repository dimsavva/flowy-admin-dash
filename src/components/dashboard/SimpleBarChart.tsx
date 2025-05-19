
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  revenue: number;
  profit: number;
}

const data: ChartData[] = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    profit: 1398,
  },
  {
    name: "Mar",
    revenue: 2000,
    profit: 9800,
  },
  {
    name: "Apr",
    revenue: 2780,
    profit: 3908,
  },
  {
    name: "May",
    revenue: 1890,
    profit: 4800,
  },
  {
    name: "Jun",
    revenue: 2390,
    profit: 3800,
  },
  {
    name: "Jul",
    revenue: 3490,
    profit: 4300,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(value);
};

const SimpleBarChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Monthly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Profit Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((month) => (
              <TableRow key={month.name}>
                <TableCell className="font-medium">{month.name}</TableCell>
                <TableCell>{formatCurrency(month.revenue)}</TableCell>
                <TableCell>{formatCurrency(month.profit)}</TableCell>
                <TableCell>
                  {Math.round((month.profit / month.revenue) * 100)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SimpleBarChart;
