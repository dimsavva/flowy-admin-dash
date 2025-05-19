
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Performer {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  sales: number;
  target: number;
  percentage: number;
}

const performers: Performer[] = [
  {
    id: 1,
    name: "Alex Johnson",
    initials: "AJ",
    sales: 45600,
    target: 50000,
    percentage: 91,
  },
  {
    id: 2,
    name: "Sarah Williams",
    initials: "SW",
    sales: 39800,
    target: 45000,
    percentage: 88,
  },
  {
    id: 3,
    name: "David Miller",
    initials: "DM",
    sales: 32500,
    target: 40000,
    percentage: 81,
  },
  {
    id: 4,
    name: "Rachel Green",
    initials: "RG",
    sales: 28900,
    target: 40000,
    percentage: 72,
  },
  {
    id: 5,
    name: "Thomas Brown",
    initials: "TB",
    sales: 24500,
    target: 35000,
    percentage: 70,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

const TopPerformers = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {performers.map((person) => (
            <div key={person.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-admin-secondary text-white">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(person.sales)} / {formatCurrency(person.target)}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{person.percentage}%</span>
              </div>
              <Progress value={person.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
