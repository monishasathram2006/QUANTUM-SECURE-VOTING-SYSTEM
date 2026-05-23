"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/services/candidates";

export function CandidateCard({
  candidate,
  onVote,
  disabled,
}: {
  candidate: Candidate;
  onVote: (candidateId: string) => void;
  disabled?: boolean;
}) {
  const initials = candidate.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          {candidate.image ? <AvatarImage src={candidate.image} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-white">{candidate.name}</p>
          <Badge variant="info">{candidate.party}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/60">{candidate.description}</p>
        <Button
          className="mt-6 w-full"
          variant={disabled ? "outline" : "primary"}
          onClick={() => onVote(candidate.id)}
          disabled={disabled}
        >
          {disabled ? "Vote Locked" : "Cast Vote"}
        </Button>
      </CardContent>
    </Card>
  );
}
