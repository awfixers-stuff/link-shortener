"use client";

import { useState } from "react";
import { trpc } from "@/app/server/trpc/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface LinkRow {
  key: string;
  destination: string;
  createdAt: string | null;
}

const PAGE_SIZE = 10;

export default function AllLinksPage() {
  const [page, setPage] = useState(0);
  const { data = [], isFetching } = trpc.links.getAllLinks.useQuery({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });
  const hasMore = data.length === PAGE_SIZE;

  return (
    <main className="mx-auto mt-12 max-w-3xl px-2 py-8 flex-1">
      <section>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            All Shortened Links on AWFixer Links
          </h1>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Slug</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (
                data.map((row: LinkRow) => (
                  <TableRow key={row.key}>
                    <TableCell>
                      <span className="font-mono">{row.key}</span>
                    </TableCell>
                    <TableCell>
                      <a
                        href={row.destination}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {row.destination}
                      </a>
                    </TableCell>
                    <TableCell>
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleDateString("en-US", {
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No Results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || isFetching}
          >
            Previous
          </Button>
          <span>Page {page + 1}</span>
          <Button
            variant="secondary"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore || isFetching}
          >
            Next
          </Button>
        </div>
      </section>
    </main>
  );
}
