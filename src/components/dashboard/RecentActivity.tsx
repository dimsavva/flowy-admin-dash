
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  date: string;
  status?: "success" | "pending" | "error";
}

const activities: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      initials: "JD",
    },
    action: "created",
    target: "a new product",
    date: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      initials: "JS",
    },
    action: "updated",
    target: "product inventory",
    date: "10 minutes ago",
    status: "success",
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      initials: "RJ",
    },
    action: "deleted",
    target: "a user account",
    date: "45 minutes ago",
    status: "error",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      initials: "ED",
    },
    action: "updated",
    target: "the pricing structure",
    date: "1 hour ago",
    status: "pending",
  },
  {
    id: 5,
    user: {
      name: "Michael Brown",
      initials: "MB",
    },
    action: "invited",
    target: "a new team member",
    date: "3 hours ago",
    status: "success",
  },
];

const getStatusBadge = (status: string | undefined) => {
  if (!status) return null;

  const variants = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const labels = {
    success: "Success",
    pending: "Pending",
    error: "Error",
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs ${status in variants ? variants[status as keyof typeof variants] : ""}`}
    >
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[380px] overflow-y-auto">
        <div className="space-y-5">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={item.user.avatar} alt={item.user.name} />
                <AvatarFallback className="bg-admin-secondary text-white">
                  {item.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    <span>{item.user.name}</span>{" "}
                    <span className="text-gray-500">{item.action}</span>{" "}
                    <span>{item.target}</span>
                  </p>
                  {item.status && getStatusBadge(item.status)}
                </div>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
